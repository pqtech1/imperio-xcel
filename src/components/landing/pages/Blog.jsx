import React, { useState } from "react";
import {
  CalendarIcon,
  UserIcon,
  TagIcon,
  ArrowRightIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const blogPosts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
    tags: ["BANKING", "INTERIOR DESIGN"],
    date: "MARCH 15, 2024",
    author: "ABHISHEK VISHWAKARMA",
    title: "How We Delivered 40+ Bank Models Across 8 Districts: A Case Study",
    excerpt:
      "A comprehensive look at our execution strategy for Kashi Gomati Samyukt Grameen Bank projects, showcasing standardized design, quality control, and timely delivery across multiple locations in Uttar Pradesh.",
    grayscale: false,
    featured: true,
    category: "Banking",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    tags: ["RETAIL", "FITOUT"],
    date: "FEBRUARY 28, 2024",
    author: "KAJAL VISHWAKARMA",
    title:
      "Transforming Retail: Allen Solly, Peter England & U.S. Polo Store Designs",
    excerpt:
      "Our approach to creating brand-aligned retail spaces in Rourkela, Darbhanga, and Bettiah. How we maintain brand consistency while adapting to local requirements and maximizing customer experience.",
    grayscale: true,
    featured: false,
    category: "Retail",
    readTime: "4 min read",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg",
    tags: ["JEWELRY", "LUXURY"],
    date: "FEBRUARY 10, 2024",
    author: "RAMESH VISHWAKARMA",
    title: "Tanishq & Mia by Tanishq: Designing Premium Jewelry Showrooms",
    excerpt:
      "The art of luxury retail design - how we created elegant, secure, and inviting spaces for Tanishq in Varanasi, Deoria, and Roorkee. Exploring lighting, security, and customer flow in jewelry retail.",
    grayscale: false,
    highlighted: true,
    category: "Luxury Retail",
    readTime: "6 min read",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    tags: ["CORPORATE", "OFFICE"],
    date: "JANUARY 22, 2024",
    author: "ABHISHEK VISHWAKARMA",
    title: "Modern Office Design: TATA AIG Life Insurance Office in Sonbhadra",
    excerpt:
      "Creating productive and inspiring workspaces for the insurance sector. A look at our current project in Robertsgang, focusing on employee wellness, brand identity, and functional layout.",
    grayscale: true,
    category: "Corporate",
    readTime: "3 min read",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    tags: ["HOSPITALITY", "HOTEL"],
    date: "JANUARY 5, 2024",
    author: "KAJAL VISHWAKARMA",
    title: "Hotel Shubhra Grand Ghazipur: Blending Comfort with Elegance",
    excerpt:
      "Designing hospitality spaces that leave a lasting impression. How we approached the interior design for Hotel Shubhra Grand, balancing luxury with functionality.",
    grayscale: false,
    category: "Hospitality",
    readTime: "4 min read",
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg",
    tags: ["TURNKEY", "PROJECT MANAGEMENT"],
    date: "DECEMBER 18, 2023",
    author: "RAMESH VISHWAKARMA",
    title: "The Benefits of Turnkey Interior Solutions for Commercial Spaces",
    excerpt:
      "Why more businesses are choosing turnkey solutions. Exploring time management, budget control, and single-point contact benefits through our experience with 50+ projects.",
    grayscale: true,
    category: "Project Management",
    readTime: "5 min read",
  },
  {
    id: 7,
    image: "https://images.pexels.com/photos/1631049/pexels-photo-1631049.jpeg",
    tags: ["BANKING", "FINANCE"],
    date: "DECEMBER 2, 2023",
    author: "ABHISHEK VISHWAKARMA",
    title: "Union Bank of India: 8 Branches, One Vision",
    excerpt:
      "Standardizing bank branch design across Jaunpur, Varanasi, Sakaldiha, and more. How we maintained consistency while adapting to different site conditions and requirements.",
    grayscale: false,
    category: "Banking",
    readTime: "4 min read",
  },
  {
    id: 8,
    image: "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg",
    tags: ["RETAIL", "BRANDING"],
    date: "NOVEMBER 15, 2023",
    author: "KAJAL VISHWAKARMA",
    title: "Louis Philippe Store Design: Creating Premium Retail Experiences",
    excerpt:
      "Our work on Louis Philippe stores in Bettiah, Rourkela, and Patna. Exploring how we translate brand identity into physical spaces that drive sales and customer loyalty.",
    grayscale: true,
    category: "Retail",
    readTime: "5 min read",
  },
  {
    id: 9,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    tags: ["MATERIALS", "FINISHING"],
    date: "OCTOBER 28, 2023",
    author: "RAMESH VISHWAKARMA",
    title: "Material Selection Guide for Commercial Interiors",
    excerpt:
      "Expert insights on choosing the right materials for different project types. From bank branches to retail stores, how we select durable, aesthetic, and cost-effective materials.",
    grayscale: false,
    category: "Materials",
    readTime: "3 min read",
  },
];

const categories = [
  "All",
  "Banking",
  "Retail",
  "Luxury Retail",
  "Corporate",
  "Hospitality",
  "Project Management",
  "Materials",
];

const BlogCard = ({ post }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-all duration-500 ${
        post.highlighted
          ? "ring-1 ring-brand-gold-light"
          : "border border-gray-100"
      }`}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            post.grayscale
              ? "grayscale hover:grayscale-0"
              : "grayscale-0 hover:grayscale"
          } ${hovered ? "scale-105" : "scale-100"}`}
        />
        {post.featured && (
          <div className="absolute top-2 left-2 bg-brand-gold-light text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
            Featured
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-charcoal/90 text-white text-[8px] font-semibold px-1.5 py-0.5 tracking-wider uppercase rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-[9px] text-gray-500 tracking-widest uppercase font-medium flex-wrap">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-2.5 h-2.5" />
            <span>{post.date}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <UserIcon className="w-2.5 h-2.5" />
            <span>{post.author.split(" ")[0]}</span>
          </div>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-2.5 h-2.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="text-sm font-bold leading-snug hover:text-brand-gold-light cursor-pointer transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-[9px] text-brand-gold-light font-semibold uppercase">
            {post.category}
          </span>
          <button className="flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-brand-charcoal hover:text-brand-gold-light transition-all duration-300 group">
            READ MORE
            <ArrowRightIcon
              className={`w-2.5 h-2.5 transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}
            />
          </button>
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
      className={`w-7 h-7 text-xs font-medium transition-all duration-300 rounded flex items-center justify-center ${
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
        className={`w-7 h-7 text-xs font-medium transition-all duration-300 rounded ${
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
      className={`w-7 h-7 text-xs font-medium transition-all duration-300 rounded flex items-center justify-center ${
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const postsPerPage = 6;

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <>
      {/* Hero Section with Gradient */}
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
                from the ImperioXcel team
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
                <span className="text-xs text-gray-600">
                  <strong className="text-brand-charcoal">
                    {blogPosts.length} articles
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-brand-gold-light"
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-[10px] font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-brand-gold-light text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post (if on first page and no filters) */}
          {currentPage === 1 &&
            selectedCategory === "All" &&
            searchQuery === "" && (
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
                        src={blogPosts[0].image}
                        alt="Featured"
                        className="w-full h-36 object-cover rounded shadow-xl"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-brand-gold-light text-white text-[10px] px-2 py-0.5 rounded-full">
                          FEATURED
                        </span>
                        <span className="text-[10px] text-gray-300">
                          Latest Article
                        </span>
                      </div>
                      <h2 className="text-white text-base md:text-lg font-bold mb-2">
                        {blogPosts[0].title}
                      </h2>
                      <p className="text-gray-300 text-xs mb-3">
                        {blogPosts[0].excerpt}
                      </p>
                      <button className="flex items-center gap-1 text-brand-gold-light hover:text-white transition-colors duration-300 text-xs font-medium">
                        Read Full Article <ArrowRightIcon className="w-3 h-3" />
                      </button>
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
              <p className="text-xs text-gray-500">
                No articles found matching your criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredPosts.length > postsPerPage && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}

          {/* Topics Cloud */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-center mb-3">
              POPULAR TOPICS
            </h3>
            <div className="flex flex-wrap justify-center gap-1.5">
              {[
                "Banking Design",
                "Retail Fitouts",
                "Jewelry Showrooms",
                "Corporate Offices",
                "Turnkey Projects",
                "Material Selection",
                "Project Management",
                "Luxury Interiors",
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-full hover:bg-brand-gold-light hover:text-white cursor-pointer transition-colors duration-300"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
