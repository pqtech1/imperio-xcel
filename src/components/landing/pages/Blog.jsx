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
import { PageLoader } from "../Layouts/Header";
import SEO from "./SEO";

const BlogCard = ({ post }) => {
  const [hovered, setHovered] = useState(false);

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
      className="flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 border border-brand-gold/10 h-full group"
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
          <div className="absolute top-2 left-2 bg-brand-gold text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
            Published
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-xs text-brand-charcoal/50 uppercase font-medium flex-wrap">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <span className="text-brand-charcoal/20">|</span>
          <div className="flex items-center gap-1">
            <UserIcon className="w-3 h-3" />
            <span>InterioXcel</span>
          </div>
          <span className="text-brand-charcoal/20">|</span>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            <span>{getReadTime(post.content)}</span>
          </div>
        </div>

        <h4 className="leading-snug hover:text-brand-gold transition-colors cursor-pointer line-clamp-2">
          <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
        </h4>

        <p className="text-brand-charcoal/60 text-sm leading-relaxed line-clamp-3">
          {stripHtml(post.content || "").substring(0, 150)}...
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <h6 className="mb-0">Article</h6>
          <Link
            to={`/blog/${post.slug || post.id}`}
            className="flex items-center gap-1 text-xs font-medium uppercase text-brand-charcoal hover:text-brand-gold transition-all duration-300 group"
          >
            READ MORE
            <ArrowRightIcon
              className={`w-3 h-3 transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
  <div className="flex items-center justify-center gap-2 mt-12">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className={`w-8 h-8 font-medium transition-all duration-300 rounded flex items-center justify-center ${
        currentPage === 1
          ? "text-brand-charcoal/30 cursor-not-allowed"
          : "text-brand-charcoal/60 hover:text-brand-gold hover:bg-bg-soft"
      }`}
    >
      ←
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-8 h-8 font-medium transition-all duration-300 rounded ${
          currentPage === page
            ? "bg-brand-gold text-white"
            : "text-brand-charcoal/60 hover:text-brand-gold hover:bg-bg-soft"
        }`}
      >
        {page}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`w-8 h-8 font-medium transition-all duration-300 rounded flex items-center justify-center ${
        currentPage === totalPages
          ? "text-brand-charcoal/30 cursor-not-allowed"
          : "text-brand-charcoal/60 hover:text-brand-gold hover:bg-bg-soft"
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

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const featuredPost = sortedPosts.length > 0 ? sortedPosts[0] : null;

  if (loading) {
    return (
      <>
        <SEO
          title="Blog - Interior Design Insights & Ideas | InterioXcel"
          description="Explore industry insights, project case studies, and design inspiration from the InterioXcel team. Expert interior design tips and trends."
          keywords="blog, interior design, design inspiration, case studies, Varanasi"
          image="https://interioxcel.com/blog-og-image.jpg"
          url="https://interioxcel.com/blog"
        />
        <div className="bg-white">
          <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg"
                alt="Blog Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto section-px">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-px bg-brand-gold-light" />
                    <h6 className="text-brand-gold-light mb-0">
                      INSIGHTS & IDEAS
                    </h6>
                  </div>
                  <h1 className="text-white mb-2">Our Blog</h1>
                  <p className="text-white/80 mb-0">
                    Industry insights, project case studies, and design
                    inspiration
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="container mx-auto section-px py-16">
            <div className="flex justify-center">
              <PageLoader />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Blog - ${sortedPosts.length} Articles on Interior Design | InterioXcel`}
        description={`Explore ${sortedPosts.length} articles on interior design, industry insights, and project case studies from the InterioXcel team.`}
        keywords="blog, interior design, design inspiration, case studies, Varanasi, home decor, commercial interiors"
        image="https://interioxcel.com/blog-og-image.jpg"
        url="https://interioxcel.com/blog"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg"
              alt="Blog Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          </div>
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto section-px">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-px bg-brand-gold-light" />
                  <h6 className="text-brand-gold-light mb-0">
                    INSIGHTS & IDEAS
                  </h6>
                </div>
                <h1 className="text-white mb-3">Our Blog</h1>
                <p className="text-white/80 mb-0">
                  Industry insights, project case studies, and design
                  inspiration from the InterioXcel team
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <div className="container mx-auto section-px pt-12 pb-16">
          {/* Stats Bar */}
          <div className="bg-bg-soft rounded-lg p-4 mb-8 border border-brand-gold/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-brand-gold" />
                <p className="text-brand-charcoal/60 mb-0">
                  <strong className="text-brand-charcoal">
                    {sortedPosts.length} articles
                  </strong>{" "}
                  published
                </p>
              </div>

              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-brand-gold/20 rounded focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-brand-charcoal text-sm"
                />
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {currentPage === 1 && searchQuery === "" && featuredPost && (
            <div className="mb-10">
              <div className="relative bg-brand-charcoal text-white rounded-lg overflow-hidden">
                <div className="absolute inset-0 opacity-5">
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
                      className="w-full h-40 object-cover rounded shadow-xl"
                      onError={(e) => {
                        e.target.src =
                          "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg";
                      }}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brand-gold text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                        FEATURED
                      </span>
                      <span className="text-white/60 text-sm">
                        Latest Article
                      </span>
                    </div>
                    <h3 className="text-white mb-2">{featuredPost.title}</h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {stripHtml(featuredPost.content || "").substring(0, 120)}
                      ...
                    </p>
                    <Link
                      to={`/blog/${featuredPost.slug || featuredPost.id}`}
                      className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-gold-light transition-colors duration-300 text-sm font-medium"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-brand-charcoal/60">
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
