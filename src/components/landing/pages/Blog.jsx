import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  UserIcon,
  ArrowRightIcon,
  SparklesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useBlogs } from "@/hooks/useApiData";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";

const BlogCard = ({ post }) => {
  const [hovered, setHovered] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  // Estimate read time
  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const wordCount = stripHtml(content).split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-500 border border-gray-100 h-full"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={
            getImageUrl(post.image) ||
            "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg"
          }
          alt={post.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            hovered ? "scale-105" : "scale-100"
          }`}
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg";
          }}
        />
        {post.is_published === 1 && (
          <div className="absolute top-2 left-2 bg-brand-gold-light text-white px-2 py-0.5 rounded-full font-semibold text-[10px]">
            Published
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-[9px] text-gray-500 tracking-widest uppercase font-medium flex-wrap">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-2.5 h-2.5" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <UserIcon className="w-2.5 h-2.5" />
            <span>InterioXcel</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-2.5 h-2.5" />
            <span>{getReadTime(post.content)}</span>
          </div>
        </div>

        <h3 className="font-bold leading-snug hover:text-brand-gold-light cursor-pointer transition-colors line-clamp-2">
          <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
        </h3>

        <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">
          {stripHtml(post.content || "").substring(0, 150)}...
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-[9px] text-brand-gold-light font-semibold uppercase">
            Article
          </span>
          <Link
            to={`/blog/${post.slug || post.id}`}
            className="flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-brand-charcoal hover:text-brand-gold-light transition-all duration-300 group"
          >
            READ MORE
            <ArrowRightIcon
              className={`w-2.5 h-2.5 transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
  <div className="flex items-center justify-center gap-2 mt-8">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className={`w-7 h-7 font-medium transition-all duration-300 rounded flex items-center justify-center ${
        currentPage === 1
          ? "text-gray-300 cursor-not-allowed"
          : "text-gray-600 hover:text-brand-gold-light hover:bg-gray-100"
      }`}
    >
      ←
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-7 h-7 font-medium transition-all duration-300 rounded ${
          currentPage === page
            ? "bg-brand-gold-light text-white"
            : "text-gray-600 hover:text-brand-gold-light hover:bg-gray-100"
        }`}
      >
        {page}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`w-7 h-7 font-medium transition-all duration-300 rounded flex items-center justify-center ${
        currentPage === totalPages
          ? "text-gray-300 cursor-not-allowed"
          : "text-gray-600 hover:text-brand-gold-light hover:bg-gray-100"
      }`}
    >
      →
    </button>
  </div>
);

const Blog = () => {
  const { data: blogs, loading } = useBlogs();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const postsPerPage = 6;

  // Filter only published posts and apply search
  const filteredPosts =
    blogs?.filter((post) => {
      if (post.is_published !== 1) return false;

      const matchesSearch =
        searchQuery === "" ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stripHtml(post.content || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesSearch;
    }) || [];

  // Sort by date (newest first)
  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  // Get featured post (latest published post)
  const featuredPost = sortedPosts.length > 0 ? sortedPosts[0] : null;

  if (loading) {
    return (
      <>
        {/* Hero Section */}
        <div className="w-full relative">
          <img
            src="https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg"
            alt="Blog Hero"
            className="w-full object-cover h-64 sm:h-72 md:h-120"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
            <div className="container mx-auto section-px">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-[2px] bg-brand-gold-light" />
                  <h6 className="!text-brand-gold-light !mb-0">
                    INSIGHTS & IDEAS
                  </h6>
                </div>
                <h1 className="text-white !mb-2">Our Blog</h1>
                <p className="text-gray-200 !mb-0">
                  Industry insights, project case studies, and design
                  inspiration from the InterioXcel team
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="section-px pt-10 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-brand-gold border-t-transparent rounded-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="w-full relative">
        <img
          src="https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg"
          alt="Blog Hero"
          className="w-full object-cover h-64 sm:h-72 md:h-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mx-auto section-px">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">
                  INSIGHTS & IDEAS
                </h6>
              </div>
              <h1 className="text-white !mb-2">Our Blog</h1>
              <p className="text-gray-200 !mb-0">
                Industry insights, project case studies, and design inspiration
                from the InterioXcel team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="section-px pt-10 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Bar */}
          <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-brand-gold-light" />
                <span className="text-gray-600">
                  <strong className="text-brand-charcoal">
                    {sortedPosts.length} articles
                  </strong>{" "}
                  published
                </span>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-56">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-brand-gold-light"
                />
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {currentPage === 1 && searchQuery === "" && featuredPost && (
            <div className="mb-8">
              <div className="relative bg-gradient-to-r from-brand-charcoal to-black text-white rounded-lg overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23b88a44'/%3E%3C/svg%3E")`,
                      backgroundSize: "60px 60px",
                    }}
                  />
                </div>
                <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/3">
                    <img
                      src={
                        getImageUrl(featuredPost.image) ||
                        "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg"
                      }
                      alt={featuredPost.title}
                      className="w-full h-36 object-cover rounded shadow-xl"
                      onError={(e) => {
                        e.target.src =
                          "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg";
                      }}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-brand-gold-light text-white px-2 py-0.5 rounded-full text-xs">
                        FEATURED
                      </span>
                      <span className="text-gray-300 text-sm">
                        Latest Article
                      </span>
                    </div>
                    <h2 className="text-white text-base md:text-lg font-bold mb-2">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {stripHtml(featuredPost.content || "").substring(0, 120)}
                      ...
                    </p>
                    <Link
                      to={`/blog/${featuredPost.slug || featuredPost.id}`}
                      className="flex items-center gap-1 text-brand-gold-light hover:text-white transition-colors duration-300 text-sm font-medium"
                    >
                      Read Full Article <ArrowRightIcon className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          {currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No articles found matching your criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          {sortedPosts.length > postsPerPage && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
