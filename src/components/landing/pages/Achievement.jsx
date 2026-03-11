import React, { useState, useRef, useEffect } from "react";
import {
  TrophyIcon,
  NewspaperIcon,
  StarIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// Achievement data from PDF
const achievements = [
  {
    id: 1,
    title: "40+ Bank Models",
    description:
      "Successfully delivered Kashi Gomati Samyukt Grameen Bank projects across 8 districts",
    icon: BuildingOfficeIcon,
    stat: "40+",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    title: "50+ Major Projects",
    description:
      "Completed interior and architectural projects across retail, banking, and corporate sectors",
    icon: TrophyIcon,
    stat: "50+",
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 3,
    title: "8+ Districts",
    description:
      "Pan-UP presence with projects in Varanasi, Jaunpur, Gorakhpur, Lucknow, and more",
    icon: MapPinIcon,
    stat: "8+",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "25+ Retail Stores",
    description:
      "Premium retail fitouts for brands like Allen Solly, Peter England, U.S. Polo, Louis Philippe",
    icon: BuildingStorefrontIcon,
    stat: "25+",
    color: "from-yellow-500 to-orange-800",
  },
];

// Milestones timeline
const milestones = [
  {
    year: "2017",
    event: "Company founded by Mrs. Meera Ramesh Vishwakarma in Varanasi",
  },
  {
    year: "2019",
    event: "Expanded operations to multiple districts in Uttar Pradesh",
  },
  {
    year: "2021",
    event: "Completed 40+ bank models for Kashi Gomati Grameen Bank",
  },
  {
    year: "2022",
    event:
      "Delivered major retail projects for Allen Solly, Peter England, Louis Philippe",
  },
  {
    year: "2023",
    event: "Executed Tanishq, Nykaa, and Union Bank projects across UP",
  },
  {
    year: "2024",
    event:
      "New leadership under Abhishek Vishwakarma; ongoing projects with TATA AIG, Nykaa LUX",
  },
];

// Press mentions
const pressMentions = [
  {
    id: 1,
    publication: "Architect's Diary",
    title: "Featured for Excellence in Bank Interior Design",
    date: "2023",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80",
  },
  {
    id: 2,
    publication: "Interior Design Magazine",
    title: "40+ Bank Models: A Case Study in Efficiency",
    date: "2023",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
  },
  {
    id: 3,
    publication: "Retail Design World",
    title: "Transforming Retail Spaces in Uttar Pradesh",
    date: "2022",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
];

// Blog posts (customized for ImperioXcel)
const blogPosts = [
  {
    id: 1,
    category: "Banking",
    subcategory: "Interior Design",
    title:
      "How We Delivered 40+ Bank Models Across 8 Districts | ImperioXcel Case Study",
    excerpt:
      "A comprehensive look at our execution strategy for Kashi Gomati Samyukt Grameen Bank projects, showcasing standardized design, quality control, and timely delivery across multiple locations...",
    img: "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
  },
  {
    id: 2,
    category: "Retail",
    subcategory: "Fitout",
    title:
      "Transforming Retail: Allen Solly, Peter England & U.S. Polo Store Designs",
    excerpt:
      "Our approach to creating brand-aligned retail spaces in Rourkela, Darbhanga, and Bettiah. How we maintain consistency while adapting to local requirements...",
    img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  },
  {
    id: 3,
    category: "Jewelry",
    subcategory: "Luxury",
    title: "Tanishq & Mia by Tanishq: Designing Premium Jewelry Showrooms",
    excerpt:
      "The art of luxury retail design - how we created elegant, secure, and inviting spaces for Tanishq in Varanasi, Deoria, and Roorkee...",
    img: "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg",
  },
];

// Project highlights
const projectHighlights = [
  {
    client: "UNION BANK OF INDIA",
    locations: [
      "Jaunpur",
      "Varanasi",
      "Sakaldiha",
      "Chakiya",
      "Machhalishahar",
      "Sujanganj",
      "Uskerakat",
    ],
    count: 9,
  },
  {
    client: "KASHI GOMATI GRAMEEN BANK",
    locations: ["40 Models across 8 Districts"],
    count: 40,
  },
  {
    client: "TANISHQ",
    locations: ["Varanasi", "Deoria"],
    count: 2,
  },
  {
    client: "NYKAA",
    locations: ["Haldwani"],
    count: 1,
  },
];

/* ── Video Section ── */
const VideoSection = () => {
  const [ref, visible] = useInView(0.1);
  const [playing, setPlaying] = useState(false);
  // Replace with your actual YouTube video ID when available
  const videoId = "dQw4w9WgXcQ";

  return (
    <div
      ref={ref}
      className="section-px pt-10 pb-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h6 className="text-brand-gold-light !mb-2">OUR STORY</h6>
          <h2 className="!text-2xl md:!text-3xl !mb-1">
            Journey of Excellence
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
        </div>

        <div
          className="relative w-full bg-black cursor-pointer overflow-hidden rounded-lg shadow-xl"
          style={{ paddingBottom: "52%" }}
          onClick={() => setPlaying(true)}
        >
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Achievement Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : (
            <>
              {/* Thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.72)" }}
                onError={(e) => {
                  e.target.src =
                    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg";
                }}
              />
              {/* Top bar */}
              <div
                className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center gap-2"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                }}
              >
                <div className="bg-brand-gold-light px-2 py-0.5 rounded text-white text-[10px] font-bold tracking-wide font-sans">
                  FEATURED
                </div>
                <span className="text-[10px] text-white/80 font-sans">
                  ImperioXcel • Established 2017
                </span>
                {/* Logo */}
                <div className="ml-auto flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded">
                  <div className="w-4 h-4 bg-brand-gold-light flex items-center justify-center text-white text-[8px] font-bold">
                    IX
                  </div>
                  <span className="text-white text-[8px] font-sans tracking-widest uppercase">
                    ImperioXcel
                  </span>
                </div>
              </div>
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-8 bg-brand-gold-light rounded-lg flex items-center justify-center shadow-xl hover:bg-brand-gold transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              >
                <span className="text-[10px] text-white/80 font-sans">
                  Watch our journey →
                </span>
                <span className="text-[10px] text-white/40 font-mono">
                  7+ years of excellence
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Achievement Card ── */
const AchievementCard = ({ item, delay }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-pointer rounded-lg shadow"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 p-5 text-white">
        <Icon className="w-8 h-8 mb-3 opacity-80" />
        <div className="text-2xl font-bold mb-1">{item.stat}</div>
        <h3 className="text-base font-bold mb-1">{item.title}</h3>
        <p className="text-xs text-white/90 leading-relaxed">
          {item.description}
        </p>

        {/* Hover effect line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transform scale-x-0 transition-transform duration-500"
          style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
        />
      </div>
    </div>
  );
};

/* ── Blog Card ── */
const BlogCard = ({ post, delay }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-1 flex flex-col bg-white border border-stone-200 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {/* Image */}
      <div className="relative h-36 overflow-hidden shrink-0">
        <img
          src={post.img}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{
            filter: hovered ? "grayscale(0%)" : "grayscale(70%)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "filter 0.4s ease, transform 0.4s ease",
          }}
        />
        <div className="absolute top-2 right-2 bg-brand-gold-light/90 px-1.5 py-0.5 text-[10px] font-bold text-white rounded">
          IX
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 flex flex-col flex-1">
        <div className="flex gap-1 mb-2 flex-wrap">
          <span className="text-[10px] tracking-widest uppercase text-brand-gold-light font-semibold">
            {post.category}
          </span>
          <span className="text-gray-300 text-[10px]">/</span>
          <span className="text-[10px] tracking-wide uppercase text-gray-500">
            {post.subcategory}
          </span>
        </div>
        <h3 className="text-xs font-bold font-serif leading-snug mb-2 flex-1">
          {post.title}
        </h3>
        <p className="text-[10px] leading-5 text-gray-600 font-sans mb-3 line-clamp-3">
          {post.excerpt}
        </p>
        <span
          className="text-[10px] tracking-widest uppercase font-sans font-bold self-start pb-0.5 transition-all duration-300"
          style={{
            color: hovered ? "#b88a44" : "#1a1f26",
            borderBottom: `1px solid ${hovered ? "#b88a44" : "#1a1f26"}`,
          }}
        >
          Read More
        </span>
      </div>
    </div>
  );
};

/* ── Press Card ── */
const PressCard = ({ item, delay, className = "" }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden cursor-pointer rounded-lg shadow ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <img
        src={item.image}
        alt={item.publication}
        className="w-full h-full object-cover block"
        style={{
          filter: hovered
            ? "grayscale(0%) scale(1.03)"
            : "grayscale(70%) scale(1)",
          transition: "filter 0.4s ease, transform 0.4s ease",
        }}
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.4s ease",
        }}
      >
        <span className="text-[10px] text-brand-gold-light font-sans tracking-widest uppercase mb-1">
          {item.publication}
        </span>
        <span className="text-xs text-white font-semibold mb-1">
          {item.title}
        </span>
        <span className="text-[10px] text-gray-300">{item.date}</span>
      </div>
    </div>
  );
};

/* ── Timeline Item ── */
const TimelineItem = ({ item, index, visible }) => {
  return (
    <div
      className="flex gap-3 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-15px)",
        transition: `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`,
      }}
    >
      <div className="relative">
        <div className="w-10 h-10 bg-brand-gold-light/10 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-brand-gold-light">
            {item.year}
          </span>
        </div>
        {index < milestones.length - 1 && (
          <div className="absolute top-10 left-1/2 w-0.5 h-8 bg-gray-200 -translate-x-1/2" />
        )}
      </div>
      <div className="flex-1 pb-6">
        <p className="text-xs text-gray-700">{item.event}</p>
      </div>
    </div>
  );
};

/* ── Main Achievement Component ── */
const Achievement = () => {
  const [blogRef, blogVisible] = useInView(0.05);
  const [pressRef, pressVisible] = useInView(0.05);
  const [timelineRef, timelineVisible] = useInView(0.05);

  return (
    <>
      {/* Hero Section with Gradient */}
      <div className="w-full relative ">
        <img
          src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
          alt="Achievement Hero"
          className="w-full  object-cover sm:h-72 md:h-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mx-auto section-px">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">
                  OUR ACHIEVEMENTS
                </h6>
              </div>
              <h1 className="text-white !mb-2">
                Excellence in Every{" "}
                <span className="text-brand-gold-light">Project</span>
              </h1>
              <p className="text-gray-200 !mb-0">
                7+ years • 50+ projects • 40+ bank models • 8+ districts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stone-50 min-h-screen">
        {/* Achievement Stats Cards */}
        <div className="section-px pt-10 pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-2">BY THE NUMBERS</h6>
              <h2 className="!text-2xl md:!text-3xl !mb-1">Our Achievements</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((item, i) => (
                <AchievementCard key={item.id} item={item} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>

        {/* YouTube Video Section */}
        <VideoSection />

        {/* Timeline Section */}
        <div className="section-px pt-10 pb-8 bg-white">
          <div ref={timelineRef} className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-2">OUR JOURNEY</h6>
              <h2 className="!text-2xl md:!text-3xl !mb-1">Key Milestones</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
            </div>

            <div className="space-y-1">
              {milestones.map((item, i) => (
                <TimelineItem
                  key={i}
                  item={item}
                  index={i}
                  visible={timelineVisible}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className="section-px pt-10 pb-8 bg-gradient-to-b from-amber-50/30 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-2">
                PROJECT HIGHLIGHTS
              </h6>
              <h2 className="!text-2xl md:!text-3xl !mb-1">
                Key Clients & Locations
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectHighlights.map((project, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow border border-gray-100"
                >
                  <h3 className="text-base font-bold mb-2 text-brand-charcoal">
                    {project.client}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPinIcon className="w-3.5 h-3.5 text-brand-gold-light" />
                    <span className="text-xs text-gray-600">
                      {project.locations.join(" • ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-xs font-semibold">
                      {project.count} locations
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="section-px pt-10 pb-8">
          <div
            ref={blogRef}
            className="max-w-6xl mx-auto"
            style={{
              opacity: blogVisible ? 1 : 0,
              transform: blogVisible ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-2">INSIGHTS</h6>
              <h2 className="!text-2xl md:!text-3xl !mb-1">From Our Blog</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogPosts.map((post, i) => (
                <BlogCard key={post.id} post={post} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </div>

        {/* Press Mentions */}
        <div className="section-px pt-10 pb-8 bg-white">
          <div
            ref={pressRef}
            className="max-w-6xl mx-auto"
            style={{
              opacity: pressVisible ? 1 : 0,
              transform: pressVisible ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-2">PRESS & MEDIA</h6>
              <h2 className="!text-2xl md:!text-3xl !mb-1">Featured In</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pressMentions.map((item, i) => (
                <PressCard
                  key={item.id}
                  item={item}
                  delay={i * 0.08}
                  className="h-56"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="section-px py-8 bg-gradient-to-r from-brand-charcoal to-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <SparklesIcon className="w-12 h-12 mx-auto text-brand-gold-light mb-4" />
            <h2 className="text-white text-xl md:text-2xl font-bold mb-3">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-gray-300 text-xs mb-4 max-w-2xl mx-auto">
              Join our list of 50+ satisfied clients and let us transform your
              space with the same dedication and excellence.
            </p>
            <div className="flex justify-center">
              <button className="btn-primary bg-brand-gold-light hover:bg-brand-gold text-white !px-6 !py-2.5">
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { VideoSection };
export default Achievement;
