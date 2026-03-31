import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import {
  useAchievements,
  useBlogs,
  useProjects,
  useClients,
} from "@/hooks/useApiData";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";
import { PageLoader } from "../Layouts/Header";
import SEO from "./SEO";

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -20% 0px",
      },
    );

    if (ref.current) {
      obs.observe(ref.current);
    }

    return () => obs.disconnect();
  }, []);

  return [ref, visible];
};

const getIconComponent = (iconName) => {
  if (iconName?.toLowerCase().includes("trophy")) return TrophyIcon;
  if (iconName?.toLowerCase().includes("bank")) return BuildingOfficeIcon;
  if (iconName?.toLowerCase().includes("retail")) return BuildingStorefrontIcon;
  if (iconName?.toLowerCase().includes("district")) return MapPinIcon;
  if (iconName?.toLowerCase().includes("project")) return TrophyIcon;
  return TrophyIcon;
};

const AchievementCard = ({ item, delay, index }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get icon image from achievement API for background
  const backgroundImage = item.icon ? getImageUrl(item.icon) : null;

  const getGradientBackground = () => {
    const gradients = [
      "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
      "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
      "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
      "linear-gradient(135deg, #4568dc 0%, #b06ab3 100%)",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden cursor-pointer rounded-lg shadow-md group min-h-[280px]"
    >
      {/* Dynamic Background using achievement icon */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage:
            !imageError && backgroundImage
              ? `url(${backgroundImage})`
              : getGradientBackground(),
        }}
        onError={() => setImageError(true)}
      />

      {/* Dark overlay */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          hovered ? "bg-black/50" : "bg-black/60"
        }`}
      />

      <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between min-h-[280px]">
        <div>
          {/* Removed the small icon image - now only background */}
          <div className="text-3xl md:text-4xl font-heading font-bold mb-1">
            {item.count}+
          </div>
          <h4 className="font-heading font-semibold mb-1 text-white">
            {item.title}
          </h4>
          <p className="text-white/80 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
        <div
          className={`w-full h-0.5 bg-white transition-transform duration-500 origin-left ${
            hovered ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>
    </div>
  );
};

const BlogCard = ({ post, delay }) => {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white border border-brand-gold/10 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            getImageUrl(post.image) ||
            "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg"
          }
          alt={post.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg";
          }}
        />
      </div>

      <div className="p-5">
        <div className="flex gap-2 mb-3">
          <h6 className="mb-0">Article</h6>
          <span className="text-brand-charcoal/30">/</span>
          <p className="text-sm text-brand-charcoal/50 mb-0">
            {new Date(post.created_at).getFullYear()}
          </p>
        </div>
        <h4 className="mb-2 line-clamp-2">{post.title}</h4>
        <p className="text-brand-charcoal/60 text-sm leading-relaxed mb-4 line-clamp-3">
          {stripHtml(post.content || "").substring(0, 100)}...
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className={`inline-flex items-center gap-2 text-brand-gold font-medium text-sm transition-all duration-300 ${
            hovered ? "gap-3" : "gap-2"
          }`}
        >
          Read More <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

// Updated ClientCard - Same as Home page with logo on top
const ClientCard = ({ client, index }) => {
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-lg p-5 border border-brand-gold/10 hover:shadow-md transition-all duration-300"
    >
      {/* Logo on top - centered */}
      <div className="flex justify-center mb-4">
        <div className=" bg-brand-gold/10 rounded-full flex items-center justify-center overflow-hidden">
          {client.logo && !imageError ? (
            <img
              src={getImageUrl(client.logo)}
              alt={client.company || client.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <BuildingOfficeIcon className="w-10 h-10 text-brand-gold" />
          )}
        </div>
      </div>

      {/* Company details below logo */}
      <div className="text-center">
        <h5 className="font-heading font-semibold text-brand-charcoal mb-1 line-clamp-1">
          {client.company || client.name}
        </h5>
        {client.name && client.company !== client.name && (
          <p className="text-xs text-brand-charcoal/50 mb-3 line-clamp-1">
            {client.name}
          </p>
        )}
      </div>

      {/* Contact info - if available */}
      {(client.email || client.phone) && (
        <div className="space-y-2 mt-3 pt-3 border-t border-brand-gold/10">
          {client.email && (
            <div className="flex items-center justify-center gap-2 text-xs text-brand-charcoal/60">
              <EnvelopeIcon className="w-3 h-3 text-brand-gold flex-shrink-0" />
              <span className="truncate">{client.email}</span>
            </div>
          )}
          {client.phone && (
            <div className="flex items-center justify-center gap-2 text-xs text-brand-charcoal/60">
              <PhoneIcon className="w-3 h-3 text-brand-gold flex-shrink-0" />
              <span>{client.phone}</span>
            </div>
          )}
        </div>
      )}

      {/* Hover effect line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold transition-transform duration-500 origin-left ${
          hovered ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center">
          <span className="font-bold text-brand-gold text-sm">{item.year}</span>
        </div>
        {index < 5 && (
          <div className="absolute top-10 left-1/2 w-px h-8 bg-brand-gold/20 -translate-x-1/2" />
        )}
      </div>
      <div className="flex-1 pb-6">
        <p className="text-brand-charcoal/70 text-sm">{item.event}</p>
      </div>
    </div>
  );
};

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

  const publishedBlogs = blogs?.filter((b) => b.is_published === 1) || [];

  if (loading) {
    return (
      <>
        <SEO
          title="Our Achievements - Awards & Milestones | InterioXcel"
          description="Discover InterioXcel's journey of excellence - over 500+ projects completed, 40+ bank models, and 8+ districts covered."
          keywords="achievements, awards, milestones, interior design awards, Varanasi"
          image="https://interioxcel.com/achievements-og-image.jpg"
          url="https://interioxcel.com/achievement"
        />
        <div className="bg-white">
          <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
                alt="Achievement Hero"
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
                      OUR ACHIEVEMENTS
                    </h6>
                  </div>
                  <h1 className="text-white mb-2">
                    Excellence in Every{" "}
                    <span className="text-brand-gold">Project</span>
                  </h1>
                  <p className="text-white/80 mb-0">Loading achievements...</p>
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
        title={`Achievements - ${totalProjects}+ Projects & ${bankProjects}+ Bank Models | InterioXcel`}
        description={`Explore InterioXcel's achievements: ${totalProjects}+ projects completed, ${bankProjects}+ bank models, serving across ${totalDistricts}+ locations. Excellence in interior design since 2017.`}
        keywords="achievements, awards, milestones, interior design, Varanasi, bank interiors, retail design"
        image="https://interioxcel.com/achievements-og-image.jpg"
        url="https://interioxcel.com/achievement"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg"
              alt="Achievement Hero"
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
                    OUR ACHIEVEMENTS
                  </h6>
                </div>
                <h1 className="text-white mb-3">
                  Excellence in Every{" "}
                  <span className="text-brand-gold">Project</span>
                </h1>
                <p className="text-white/80 mb-0">
                  {new Date().getFullYear() - 2017}+ years • {totalProjects}+
                  projects • {bankProjects}+ bank projects • {totalDistricts}+
                  locations
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-bg-soft">
          {/* Achievement Stats Cards */}
          {achievements && achievements.length > 0 && (
            <div className="container mx-auto section-px pt-16 pb-12">
              <div className="text-center mb-12">
                <h6 className="mb-2">BY THE NUMBERS</h6>
                <h2 className="mb-2">Our Achievements</h2>
                <div className="w-12 h-px bg-brand-gold opacity-70 mx-auto" />
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
          )}

          {/* Timeline Section */}
          <div className="bg-white">
            <div
              ref={timelineRef}
              className="container mx-auto section-px py-16"
            >
              <div className="text-center mb-12">
                <h6 className="mb-2">OUR JOURNEY</h6>
                <h2 className="mb-2">Key Milestones</h2>
                <div className="w-12 h-px bg-brand-gold opacity-70 mx-auto" />
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                {milestones.map((item, i) => (
                  <TimelineItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Clients Section - Updated to match Home page style */}
          <div ref={clientsRef} className="bg-bg-soft">
            <div className="container mx-auto section-px py-16">
              <div className="text-center mb-12">
                <h6 className="mb-2">OUR VALUED CLIENTS</h6>
                <h2 className="mb-2">Trusted By Industry Leaders</h2>
                <div className="w-12 h-px bg-brand-gold opacity-70 mx-auto" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {clients?.map((client, index) => (
                  <ClientCard
                    key={client.id || index}
                    client={client}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Blog Cards */}
          {publishedBlogs.length > 0 && (
            <div ref={blogRef} className="bg-white">
              <div className="container mx-auto section-px py-16">
                <div className="text-center mb-12">
                  <h6 className="mb-2">INSIGHTS</h6>
                  <h2 className="mb-2">From Our Blog</h2>
                  <div className="w-12 h-px bg-brand-gold opacity-70 mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {publishedBlogs.slice(0, 3).map((post, i) => (
                    <BlogCard key={post.id} post={post} delay={i * 0.08} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-brand-charcoal">
            <div className="container mx-auto section-px py-16 text-center">
              <SparklesIcon className="w-12 h-12 mx-auto text-brand-gold mb-4" />
              <h2 className="text-white mb-3">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Join our list of {clients?.length || 0}+ satisfied clients and
                let us transform your space.
              </p>
              <Link to="/contact" className="btn-primary inline-flex">
                Start Your Project
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Achievement;
