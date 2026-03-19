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
import {
  useAchievements,
  useBlogs,
  useProjects,
  useClients,
} from "@/hooks/useApiData";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        console.log("Observer triggered:", e.isIntersecting); // Debug
        setVisible(e.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -20% 0px", // Trigger earlier
      },
    );

    if (ref.current) {
      obs.observe(ref.current);
    }

    return () => obs.disconnect();
  }, []);

  return [ref, visible];
};

// Map icon names to components (unchanged)
const getIconComponent = (iconName) => {
  const iconMap = {
    trophy: TrophyIcon,
    newspaper: NewspaperIcon,
    star: StarIcon,
    sparkles: SparklesIcon,
    buildingoffice: BuildingOfficeIcon,
    buildingstorefront: BuildingStorefrontIcon,
    mappin: MapPinIcon,
    calendar: CalendarIcon,
    usergroup: UserGroupIcon,
    checkcircle: CheckCircleIcon,
  };

  if (iconName?.toLowerCase().includes("trophy")) return TrophyIcon;
  if (iconName?.toLowerCase().includes("bank")) return BuildingOfficeIcon;
  if (iconName?.toLowerCase().includes("retail")) return BuildingStorefrontIcon;
  if (iconName?.toLowerCase().includes("district")) return MapPinIcon;
  if (iconName?.toLowerCase().includes("project")) return TrophyIcon;

  return TrophyIcon;
};

const getGradientColor = (index) => {
  const gradients = [
    "from-blue-500 to-indigo-500",
    "from-amber-500 to-yellow-500",
    "from-emerald-500 to-teal-500",
    "from-yellow-500 to-orange-800",
    "from-purple-500 to-pink-500",
    "from-red-500 to-orange-500",
  ];
  return gradients[index % gradients.length];
};

/* ── Video Section ── (unchanged) */
const VideoSection = () => {
  const [ref, visible] = useInView(0.1);
  const [playing, setPlaying] = useState(false);
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
      {/* Video content unchanged */}
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
              <div
                className="absolute top-0 left-0 right-0 px-3 py-2 flex items-center gap-2"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
                }}
              >
                <div className="bg-brand-gold-light px-2 py-0.5 rounded text-white text-base font-bold tracking-wide font-sans">
                  FEATURED
                </div>
                <span className="text-base text-white/80 font-sans">
                  InterioXcel • Established 2017
                </span>
                <div className="ml-auto flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded">
                  <div className="w-4 h-4 bg-brand-gold-light flex items-center justify-center text-white text-[8px] font-bold">
                    IX
                  </div>
                  <span className="text-white text-[8px] font-sans tracking-widest uppercase">
                    InterioXcel
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-8 bg-brand-gold-light rounded-lg flex items-center justify-center shadow-xl hover:bg-brand-gold transition-colors duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                }}
              >
                <span className="text-base text-white/80 font-sans">
                  Watch our journey →
                </span>
                <span className="text-base text-white/40 font-mono">
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

/* ── Achievement Card ── (unchanged) */
const AchievementCard = ({ item, delay, index }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = getIconComponent(item.title);
  const gradientColor = getGradientColor(index);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-pointer rounded-lg shadow z-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-90`}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-20 p-5 text-white">
        {" "}
        {/* Higher z-index */}
        {item.icon ? (
          <img
            src={getImageUrl(item.icon)}
            alt={item.title}
            className="w-8 h-8 mb-3 opacity-80 object-contain"
          />
        ) : (
          <Icon className="w-8 h-8 mb-3 opacity-80" />
        )}
        <div className="text-2xl font-bold mb-1">{item.count}+</div>
        <h3 className="text-base font-bold mb-1">{item.title}</h3>
        <p className="text-white/90 leading-relaxed text-sm">
          {item.description}
        </p>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transform scale-x-0 transition-transform duration-500 z-10"
          style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
        />
      </div>
    </div>
  );
};

/* ── Blog Card ── (unchanged) */
const BlogCard = ({ post, delay }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-1 flex flex-col bg-white border border-stone-200 cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow transition-all duration-300 z-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      <div className="relative h-36 overflow-hidden shrink-0">
        <img
          src={
            getImageUrl(post.image) ||
            "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg"
          }
          alt={post.title}
          className="w-full h-full object-cover"
          style={{
            filter: hovered ? "grayscale(0%)" : "grayscale(70%)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "filter 0.4s ease, transform 0.4s ease",
          }}
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg";
          }}
        />
        <div className="absolute top-2 right-2 bg-brand-gold-light/90 px-1.5 py-0.5 text-base font-bold text-white rounded">
          IX
        </div>
      </div>

      <div className="px-4 py-4 flex flex-col flex-1">
        <div className="flex gap-1 mb-2 flex-wrap">
          <span className="text-base tracking-widest uppercase text-brand-gold-light font-semibold">
            Article
          </span>
          <span className="text-gray-300 text-base">/</span>
          <span className="text-base tracking-wide uppercase text-gray-500">
            {new Date(post.created_at).getFullYear()}
          </span>
        </div>
        <h3 className="font-bold font-serif leading-snug mb-2 flex-1 text-sm line-clamp-3">
          {post.title}
        </h3>
        <p className="text-base leading-5 text-gray-600 font-sans mb-3 line-clamp-3">
          {stripHtml(post.content || "").substring(0, 100)}...
        </p>
        <span
          className="text-base tracking-widest uppercase font-sans font-bold self-start pb-0.5 transition-all duration-300 cursor-pointer"
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

/* ── FIXED Client Card ── */
const ClientCard = ({ client, index, visible = true }) => {
  // Default visible=true
  const [hovered, setHovered] = useState(false);

  console.log(`Client ${index} visible:`, visible, client); // Debug

  return (
    <div
      className="relative bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden z-20" // z-20
      style={{
        opacity: visible ? 1 : 0.3, // Fallback partial opacity
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-brand-gold-light/10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
          {client.logo ? (
            <img
              src={getImageUrl(client.logo)}
              alt={client.company || client.name}
              className="w-full h-full object-cover"
              style={{
                filter: hovered ? "grayscale(0%)" : "grayscale(50%)",
                transition: "filter 0.3s ease",
              }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/48?text=Logo";
              }}
            />
          ) : (
            <BuildingOfficeIcon className="w-6 h-6 text-brand-gold-light" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-brand-charcoal truncate">
            {client.company || client.name}
          </h3>
          {client.name && client.name !== (client.company || client.name) && (
            <p className="text-xs text-gray-500 truncate">{client.name}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        {client.email && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="font-medium w-16">Email:</span>
            <span className="truncate flex-1">{client.email}</span>
          </div>
        )}
        {client.phone && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="font-medium w-16">Phone:</span>
            <span className="flex-1">{client.phone}</span>
          </div>
        )}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold-light transform scale-x-0 transition-transform duration-500"
        style={{ transform: hovered ? "scaleX(1)" : "scaleX(0)" }}
      />
    </div>
  );
};

/* ── FIXED Timeline Item ── */
const TimelineItem = ({ item, index, visible = true }) => {
  // Default visible=true
  console.log(`Timeline ${index} visible:`, visible); // Debug

  return (
    <div
      className="flex gap-3 items-start z-10"
      style={{
        opacity: visible ? 1 : 0.5, // Fallback partial opacity
        transform: visible ? "translateX(0)" : "translateX(-10px)",
        transition: `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`,
      }}
    >
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 bg-brand-gold-light/10 rounded-full flex items-center justify-center">
          <span className="font-bold text-brand-gold-light text-sm">
            {item.year}
          </span>
        </div>
        {index < 5 && (
          <div className="absolute top-10 left-1/2 w-0.5 h-8 bg-gray-200 -translate-x-1/2" />
        )}
      </div>
      <div className="flex-1 pb-6">
        <p className="text-gray-700 text-sm">{item.event}</p>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const Achievement = () => {
  const { data: achievements, loading: achievementsLoading } =
    useAchievements();
  const { data: blogs, loading: blogsLoading } = useBlogs();
  const { data: projects, loading: projectsLoading } = useProjects();
  const { data: clients, loading: clientsLoading } = useClients();

  const [blogRef, blogVisible] = useInView(0.05);
  const [clientsRef, clientsVisible] = useInView(0.05);
  const [timelineRef, timelineVisible] = useInView(0.05);

  const loading =
    achievementsLoading || blogsLoading || projectsLoading || clientsLoading;

  console.log("Clients data:", clients);
  console.log("Timeline visible:", timelineVisible);
  console.log("Clients visible:", clientsVisible);

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
      event: "Completed major bank projects across multiple districts",
    },
    {
      year: "2022",
      event: "Delivered major retail projects for premium brands",
    },
    {
      year: "2023",
      event: "Executed Tanishq, Nykaa, and Union Bank projects across UP",
    },
    {
      year: "2024",
      event: "New leadership under Abhishek Vishwakarma; ongoing projects",
    },
  ];

  const totalProjects = projects?.length || 0;
  const bankProjects =
    projects?.filter(
      (p) =>
        p.name?.toLowerCase().includes("bank") ||
        p.name?.toLowerCase().includes("finance"),
    ).length || 0;

  const districts = new Set();
  projects?.forEach((p) => {
    if (p.district) districts.add(p.district);
    if (p.state) districts.add(p.state);
  });
  const totalDistricts = districts.size || 8;

  const retailProjects =
    projects?.filter(
      (p) =>
        p.name?.toLowerCase().includes("retail") ||
        p.name?.toLowerCase().includes("store") ||
        p.name?.toLowerCase().includes("showroom"),
    ).length || 0;

  const publishedBlogs = blogs?.filter((b) => b.is_published === 1) || [];

  if (loading) {
    return (
      <>
        <div className="w-full relative">
          <img
            src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
            alt="Achievement Hero"
            className="w-full object-cover sm:h-72 md:h-120"
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
                <p className="text-gray-200 !mb-0">Loading achievements...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-stone-50 min-h-screen">
          <div className="section-px pt-10 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-center py-12">
                <div className="animate-spin h-8 w-8 border-2 border-brand-gold border-t-transparent rounded-full" />
              </div>
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
          src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
          alt="Achievement Hero"
          className="w-full object-cover sm:h-72 md:h-120"
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
                {new Date().getFullYear() - 2017}+ years • {totalProjects}+
                projects • {bankProjects}+ bank projects • {totalDistricts}+
                locations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-stone-50 min-h-screen">
        {/* Achievement Stats Cards */}
        {achievements && achievements.length > 0 && (
          <div className="section-px pt-10 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h6 className="text-brand-gold-light !mb-2">BY THE NUMBERS</h6>
                <h2 className="!text-2xl md:!text-3xl !mb-1">
                  Our Achievements
                </h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((item, i) => (
                  <AchievementCard
                    key={item.id}
                    item={item}
                    delay={i * 0.08}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video Section */}
        <VideoSection />

        {/* FIXED Timeline Section - Force min-height and fallback */}
        <div className="section-px pt-10 pb-8 bg-white min-h-[500px]">
          {" "}
          {/* min-h for scroll */}
          <div
            ref={timelineRef}
            className="max-w-3xl mx-auto"
            style={{
              opacity: timelineVisible ? 1 : 0.7, // Always partially visible
              transition: "opacity 0.4s ease",
            }}
          >
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-2">OUR JOURNEY</h6>
              <h2 className="!text-2xl md:!text-3xl !mb-1">Key Milestones</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
            </div>
            <div className="space-y-4">
              {" "}
              {/* Increased spacing */}
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

        {/* FIXED Clients Section */}
        <div className="section-px pt-10 pb-8 bg-gradient-to-b from-amber-50/30 to-white min-h-[400px]">
          <div
            ref={clientsRef}
            className="max-w-6xl mx-auto"
            style={{
              opacity: clientsVisible ? 1 : 0.7, // Always partially visible
              transition: "opacity 0.4s ease",
            }}
          >
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-2">
                OUR VALUED CLIENTS
              </h6>
              <h2 className="!text-2xl md:!text-3xl !mb-1">
                Trusted By Industry Leaders
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {clients?.map((client, index) => (
                <ClientCard
                  key={client.id || index}
                  client={client}
                  index={index}
                  visible={clientsVisible}
                />
              )) || (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Loading clients or no data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        {publishedBlogs.length > 0 && (
          <div className="section-px pt-10 pb-8">
            <div ref={blogRef} className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h6 className="text-brand-gold-light !mb-2">INSIGHTS</h6>
                <h2 className="!text-2xl md:!text-3xl !mb-1">From Our Blog</h2>
                <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mt-3" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {publishedBlogs.slice(0, 3).map((post, i) => (
                  <BlogCard key={post.id} post={post} delay={i * 0.08} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="section-px py-8 bg-gradient-to-r from-brand-charcoal to-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <SparklesIcon className="w-12 h-12 mx-auto text-brand-gold-light mb-4" />
            <h2 className="text-white text-xl md:text-2xl font-bold mb-3">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-gray-300 mb-4 max-w-2xl mx-auto text-sm">
              Join our list of {clients?.length || 0}+ satisfied clients and let
              us transform your space.
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
