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
import SEO from "./SEO";

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
        const allBlogsRes = await api.get("/blogs");
        const allBlogs = allBlogsRes.data.data || allBlogsRes.data || [];

        const foundBlog = allBlogs.find(
          (b) =>
            b.slug?.toLowerCase() === slug?.toLowerCase() ||
            b.id.toString() === slug,
        );

        if (foundBlog) {
          setBlog(foundBlog);

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadTime = (content) => {
    if (!content) return 1;
    const wordCount = stripHtml(content).split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <PageLoader />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-light text-brand-charcoal mb-4">
            Article Not Found
          </h1>
          <p className="text-brand-charcoal/65 mb-6">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <button onClick={() => navigate("/blog")} className="btn-outline">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const isPublished = blog.is_published === 1;

  return (
    <>
      <SEO
        title={`${blog.title} | InterioXcel Blog`}
        description={stripHtml(blog.content || "").substring(0, 160)}
        keywords={`${blog.title}, interior design, blog, design insights, Varanasi`}
        image={getImageUrl(blog.image)}
        url={`https://interioxcel.com/blog/${blog.slug || blog.id}`}
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
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

          <button
            onClick={() => navigate("/blog")}
            className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors z-10"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm">Back to Blog</span>
          </button>

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
                      isPublished ? "bg-green-600" : "bg-yellow-600"
                    }`}
                  >
                    {isPublished ? "Published" : "Draft"}
                  </span>
                  <p className="text-white/70 text-sm mb-0">
                    {formatDate(blog.created_at)}
                  </p>
                </div>
                <h1 className="text-white mb-4">{blog.title}</h1>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    <p className="text-sm mb-0">InterioXcel Team</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <p className="text-sm mb-0">
                      {getReadTime(blog.content)} min read
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto max-w-4xl px-6 md:px-8 lg:px-16 xl:px-24 py-16">
          {/* Action Bar */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-brand-gold/10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-gold transition-colors group"
              >
                {liked ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 group-hover:text-brand-gold" />
                )}
                <span className="text-sm">{liked ? "Liked" : "Like"}</span>
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-gold transition-colors group"
              >
                <BookmarkIcon
                  className={`w-5 h-5 ${bookmarked ? "text-brand-gold fill-current" : "group-hover:text-brand-gold"}`}
                />
                <span className="text-sm">{bookmarked ? "Saved" : "Save"}</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-gold transition-colors group">
                <ShareIcon className="w-5 h-5 group-hover:text-brand-gold" />
                <span className="text-sm">Share</span>
              </button>
              <button className="flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-gold transition-colors group">
                <PrinterIcon className="w-5 h-5 group-hover:text-brand-gold" />
                <span className="text-sm">Print</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="blog-content"
          >
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content || "<p>No content available.</p>",
              }}
              className="text-brand-charcoal/80 leading-relaxed space-y-4"
            />
          </motion.div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-bg-soft border border-brand-gold/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-brand-gold" />
              </div>
              <div>
                <h5 className="mb-1">InterioXcel Team</h5>
                <p className="text-brand-charcoal/60 text-sm mb-0">
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
              <h3 className="mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug || post.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-brand-gold/10">
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
                        <h5 className="mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
                          {post.title}
                        </h5>
                        <p className="text-xs text-brand-charcoal/50 mb-0">
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
          <div className="mt-12 flex justify-between items-center pt-6 border-t border-brand-gold/10">
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-gold transition-colors group"
            >
              <ChevronLeftIcon className="w-4 h-4 group-hover:text-brand-gold" />
              <span>Back to Blog</span>
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-brand-charcoal/60 hover:text-brand-gold transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
