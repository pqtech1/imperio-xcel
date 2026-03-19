import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  ArrowLeftIcon,
  ShareIcon,
  PrinterIcon,
  BookmarkIcon,
  ChevronLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import api from "@/lib/api";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";
import { PageLoader } from "../Layouts/Header";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        // First, try to fetch all blogs and find by slug
        const allBlogsRes = await api.get("/blogs");
        const allBlogs = allBlogsRes.data.data || allBlogsRes.data || [];

        // Find blog by slug (case-insensitive comparison)
        const foundBlog = allBlogs.find(
          (b) =>
            b.slug?.toLowerCase() === slug?.toLowerCase() ||
            b.id.toString() === slug,
        );

        if (foundBlog) {
          setBlog(foundBlog);

          // Get related posts (excluding current, limit to 3)
          const related = allBlogs
            .filter((b) => b.id !== foundBlog.id && b.is_published === 1)
            .slice(0, 3);
          setRelatedPosts(related);

          setError(null);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate read time
  const getReadTime = (content) => {
    if (!content) return 1;
    const wordCount = stripHtml(content).split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="px-6 py-2 bg-brand-gold text-white rounded-lg hover:bg-brand-gold-light transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Check if blog is published
  const isPublished = blog.is_published === 1;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={
            getImageUrl(blog.image) ||
            "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg"
          }
          alt={blog.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate("/blog")}
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors z-10"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm">Back to Blog</span>
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${
                    isPublished ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {isPublished ? "Published" : "Draft"}
                </span>
                <span className="text-white/80 text-sm">
                  {formatDate(blog.created_at)}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span className="text-sm">InterioXcel Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-sm">
                    {getReadTime(blog.content)} min read
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-gold-light transition-colors"
            >
              {liked ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm">{liked ? "Liked" : "Like"}</span>
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="flex items-center gap-2 text-gray-600 hover:text-brand-gold-light transition-colors"
            >
              <BookmarkIcon
                className={`w-5 h-5 ${bookmarked ? "text-brand-gold-light fill-current" : ""}`}
              />
              <span className="text-sm">{bookmarked ? "Saved" : "Save"}</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-brand-gold-light transition-colors">
              <ShareIcon className="w-5 h-5" />
              <span className="text-sm">Share</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-brand-gold-light transition-colors">
              <PrinterIcon className="w-5 h-5" />
              <span className="text-sm">Print</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: blog.content || "<p>No content available.</p>",
            }}
            className="blog-content"
          />
        </motion.div>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-gold-light/10 flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-brand-gold-light" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">InterioXcel Team</h4>
              <p className="text-sm text-gray-600 mt-1">
                We are a team of experienced interior designers and architects
                dedicated to transforming spaces into masterpieces. Follow our
                blog for insights, case studies, and design inspiration.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug || post.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-300">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={
                          getImageUrl(post.image) ||
                          "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 group-hover:text-brand-gold-light transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            onClick={() => navigate("/blog")}
            className="flex items-center gap-2 text-gray-600 hover:text-brand-gold-light transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Back to Blog</span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm text-gray-600 hover:text-brand-gold-light transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
