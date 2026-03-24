import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  UsersIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import {
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import {
  useServices,
  useAreas,
  useProjects,
  useTeams,
  useAchievements,
  useBlogs,
} from "@/hooks/useApiData";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";
import Testimonial from "./Testimonial";
import { PageLoader } from "../Layouts/Header";
import SEO from "./SEO";

/* ─────── HERO SLIDES ─────── */
const heroSlides = [
  {
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    line1: "Crafting",
    line2: "Excellence.",
    sub: "Premium Furnishing Contracting · Est. 2017",
  },
  {
    image: "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg",
    line1: "Where Vision",
    line2: "Meets Precision.",
    sub: "Architecture & Design Excellence",
  },
  {
    image: "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg",
    line1: "Architecture",
    line2: "That Inspires.",
    sub: "Luxury Interior Solutions",
  },
];

const principles = [
  {
    id: "01",
    title: "Radical Focus",
    desc: "Like the singular flight path of a worker bee, we eliminate noise to protect the core objective.",
  },
  {
    id: "02",
    title: "Hexagonal Structuralism",
    desc: "Nature's most efficient shape. We build systems where every unit supports the integrity of the whole.",
  },
  {
    id: "03",
    title: "Synchronized Agility",
    desc: "Instantaneous communication across the hive. We pivot without friction when the environment shifts.",
  },
  {
    id: "04",
    title: "Compounded Effort",
    desc: "The smallest actions, executed with perfect consistency, create the most substantial yields.",
  },
];

/* ─────── TINY HELPERS ─────── */
const Cap = ({ children, className = "" }) => (
  <h6 className={className}>{children}</h6>
);

const HR = ({ w = 40, className = "" }) => (
  <div className={`w-[${w}px] h-px bg-brand-gold opacity-65 ${className}`} />
);

/* ─────── SECTION WRAPPER ─────── */
const Inner = ({ children, className = "" }) => (
  <div className={`container mx-auto section-px relative z-10 ${className}`}>
    {children}
  </div>
);

/* ─────── ANIMATED TEXT REVEAL ─────── */
const Reveal = ({ children, delay = 0, y = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
  >
    {children}
  </motion.div>
);

/* ─────── PARALLAX IMAGE ─────── */
const ParallaxImg = ({ src, alt, speed = 0.15, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[115%] object-cover block top-[-7.5%]"
      />
    </div>
  );
};

/* ─────── STAT COUNTER ─────── */
const StatItem = ({ value, label, bordered }) => {
  const [ref, setVis] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.3 },
    );
    if (containerRef.current) o.observe(containerRef.current);
    return () => o.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`py-8 text-center ${bordered ? "border-r border-brand-charcoal/10" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: ref ? 1 : 0, y: ref ? 0 : 20 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-brand-gold leading-none mb-2">
          {value}
        </div>
        <h6 className="mb-0">{label}</h6>
      </motion.div>
    </div>
  );
};

/* ─────── SERVICE CARD ─────── */
const ServiceCard = ({ service, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`relative cursor-default transition-all duration-500 border-t border-brand-charcoal/10 p-6 md:p-8 ${
        hov ? "bg-bg-soft" : "bg-transparent"
      }`}
    >
      <div
        className={`absolute top-0 left-0 h-px bg-gradient-to-r from-brand-gold to-transparent transition-all duration-600 ${
          hov ? "w-full" : "w-0"
        }`}
      />
      <h6 className="mb-4">0{index + 1}</h6>
      <h3 className="mb-3">{service.title}</h3>
      <p className="mb-5">{service.description}</p>
      {service.features?.length > 0 && (
        <ul className="list-none p-0 m-0 mb-6 flex flex-col gap-2">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2.5 list-none">
              <div className="w-1 h-1 rounded-full bg-brand-gold flex-shrink-0" />
              <span className="text-base text-brand-charcoal/60">{f}</span>
            </li>
          ))}
        </ul>
      )}
      <Link
        to={`/${service.slug}`}
        className="inline-flex items-center gap-2 text-brand-gold font-medium no-underline transition-all duration-300 hover:gap-3.5 hover:text-brand-gold-light"
      >
        Explore <ArrowRightIcon className="w-3 h-3" />
      </Link>
    </motion.div>
  );
};

/* ─────── PROJECT CARD ─────── */
const ProjectCard = ({ project, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden cursor-pointer bg-bg-soft"
    >
      <div className="h-72 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className={`w-full h-full object-cover block transition-transform duration-1000 ${
            hov ? "scale-105" : "scale-100"
          }`}
          onError={(e) => {
            e.target.src = "/img/services/1.webp";
          }}
        />
      </div>
      <div
        className={`absolute inset-0 transition-all duration-600 ${
          hov
            ? "bg-gradient-to-t from-white/95 via-white/30 to-transparent"
            : "bg-gradient-to-t from-white/70 to-transparent"
        }`}
      />
      <div
        className={`absolute top-4 right-4 px-3 py-1 border text-xs uppercase tracking-wider ${
          project.ongoing
            ? "border-brand-gold text-brand-gold"
            : "border-brand-charcoal/25 text-brand-charcoal/60"
        }`}
      >
        {project.ongoing ? "Ongoing" : "Completed"}
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
          hov ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"
        }`}
      >
        <h4 className="mb-1.5">{project.name}</h4>
        <div className="flex items-center gap-1.5 text-sm text-brand-gold font-medium">
          <MapPinIcon className="w-2.5 h-2.5" />
          <span>{project.locations}</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────── BLOG CARD ─────── */
const BlogCard = ({ blog, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${blog.slug}`}
        className="no-underline block group"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div className="h-60 overflow-hidden mb-4">
          <img
            src={blog.image}
            alt={blog.title}
            className={`w-full h-full object-cover block transition-transform duration-800 ${
              hov ? "scale-105" : "scale-100"
            }`}
          />
        </div>
        <h6 className="mb-2">{blog.date}</h6>
        <h4
          className={`transition-colors duration-300 group-hover:text-brand-gold`}
        >
          {blog.title}
        </h4>
        <p className="mb-4">{blog.excerpt}</p>
        <div className="inline-flex items-center gap-2 text-brand-gold font-medium uppercase tracking-wide transition-all duration-300 group-hover:gap-3.5 group-hover:text-brand-gold-light">
          Read More <ArrowRightIcon className="w-2.5 h-2.5" />
        </div>
      </Link>
    </motion.div>
  );
};

/* ─────── TEAM CARD ─────── */
const TeamCard = ({ member, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="relative overflow-hidden mb-4">
        <img
          src={member.image}
          alt={member.name}
          className={`w-full h-[340px] object-cover block transition-all duration-800 ${
            hov ? "scale-105 brightness-95" : "scale-100 brightness-100"
          }`}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x500/111/333?text=Team";
          }}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white/80 to-transparent transition-opacity duration-500 ${
            hov ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-4 left-4 transition-all duration-400 delay-100 ${
            hov ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5"
          }`}
        >
          <HR className="mb-2" />
        </div>
      </div>
      <h4 className="mb-1">{member.name}</h4>
      <h6 className="mb-2">{member.role}</h6>
      <p className="text-sm text-brand-charcoal/60 leading-relaxed m-0">
        {member.desc}
      </p>
    </motion.div>
  );
};

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
const Home = () => {
  const [slide, setSlide] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const { data: services, loading: sl } = useServices();
  const { data: areas, loading: al } = useAreas();
  const { data: projects, loading: pl } = useProjects();
  const { data: teams, loading: tl } = useTeams();
  const { data: achievements, loading: ahl } = useAchievements();
  const { data: blogs, loading: bl } = useBlogs();

  const loading = sl || al || pl || tl || ahl || bl;

  useEffect(() => {
    const t = setInterval(
      () => setSlide((p) => (p + 1) % heroSlides.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 3), 3000);
    return () => clearInterval(t);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <PageLoader />
      </div>
    );

  const displayedServices =
    services?.slice(0, 3).map((s, i) => ({
      icon: [SwatchIcon, Squares2X2Icon, CubeIcon][i % 3],
      title: s.service_title || s.title || "Service",
      description:
        s.service_short_description ||
        stripHtml(s.description || "").substring(0, 120) ||
        "Comprehensive interior solutions",
      features: s.what_we_do?.slice(0, 3).map((w) => w.title) || [
        "Interior Detailing",
        "Space Planning",
        "Material Selection",
      ],
      slug: s.slug || s.id,
    })) || [];

  const stats = achievements
    ?.slice(0, 4)
    .map((a) => ({ value: `${a.count}+`, label: a.title })) || [
    { value: "7+", label: "Years of Excellence" },
    { value: "50+", label: "Major Projects" },
    { value: "40+", label: "Bank Models" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  const displayedAreas =
    areas?.slice(0, 4).map((a, i) => ({
      icon: [
        BuildingStorefrontIcon,
        BuildingLibraryIcon,
        BuildingOffice2Icon,
        HomeModernIcon,
      ][i % 4],
      title: a.title || "Area",
      description: a.description || "Specialized solutions",
      projects: `${a.projects_done || 0}+`,
    })) || [];

  const displayedProjects =
    projects?.slice(0, 6).map((p) => ({
      name: p.name || "Project",
      locations:
        [p.district, p.state, p.country].filter(Boolean).join(", ") || "India",
      image: p.images?.[0]?.image_path
        ? getImageUrl(p.images[0].image_path)
        : "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      ongoing: p.ongoing,
    })) || [];

  const workInProgress =
    projects
      ?.filter((p) => p.ongoing === 1)
      .slice(0, 2)
      .map((p) => ({
        project: p.name || "Project",
        location:
          [p.district, p.state, p.country].filter(Boolean).join(", ") ||
          "India",
        image: p.images?.[0]?.image_path
          ? getImageUrl(p.images[0].image_path)
          : "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      })) || [];

  const displayedTeam =
    teams?.map((m) => ({
      name: m.name || "Team Member",
      role: m.designation || "Professional",
      desc: m.bio
        ? stripHtml(m.bio).substring(0, 80)
        : "Dedicated professional",
      image: getImageUrl(m.image) || "https://via.placeholder.com/400x500",
    })) || [];

  const displayedBlogs =
    blogs
      ?.filter((b) => b.is_published === 1)
      .slice(0, 3)
      .map((b) => ({
        title: b.title,
        excerpt: stripHtml(b.content || "").substring(0, 110) + "…",
        image:
          getImageUrl(b.image) ||
          "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
        slug: b.slug || b.id,
        date: new Date(b.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })) || [];

  const totalProjects = projects?.length || 50;
  const totalBankModels =
    projects?.filter((p) => p.name?.toLowerCase().includes("bank")).length ||
    40;

  return (
    <>
      <SEO
        title="InterioXcel - Premium Furnishing Contracting & Interior Design | Varanasi"
        description="InterioXcel is a premier furnishing contracting company specializing in luxury interior design, architecture, and turnkey solutions. With 7+ years of excellence, we transform spaces with precision and craftsmanship."
        keywords="interior design, furnishing contracting, luxury interiors, architecture, Varanasi, home renovation, office interior, commercial interiors, bank models, turnkey solutions"
        image="https://interioxcel.com/og-image.jpg"
        url="https://interioxcel.com"
      />
      <div className="bg-white">
        {/* ══════ HERO ══════ */}
        <section className="relative h-screen min-h-[640px] overflow-hidden">
          <AnimatePresence>
            <motion.img
              key={heroSlides[slide].image}
              src={heroSlides[slide].image}
              alt={heroSlides[slide].line1}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute top-1/2 right-10 -translate-y-1/2 [writing-mode:vertical-rl] text-xs tracking-wider text-brand-charcoal/60 flex flex-col items-center gap-3">
            <span>{String(slide + 1).padStart(2, "0")}</span>
            <div className="w-px h-10 bg-brand-gold opacity-40" />
            <span className="opacity-40">
              {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>

          <div className="absolute inset-0 flex items-end section-px pb-20">
            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="max-w-[820px]"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex items-center gap-4 mb-6"
              >
                <HR w={52} />
                <h6 className="mb-0">{heroSlides[slide].sub}</h6>
              </motion.div>
              <h1>
                <span className="block">{heroSlides[slide].line1}</span>
                <em className="italic text-brand-gold not-italic">
                  {heroSlides[slide].line2}
                </em>
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4 flex-wrap mt-8"
              >
                <Link to="/portfolio" className="btn-primary inline-flex">
                  Explore Our Work
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 section-px flex gap-2.5 z-10">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="bg-none border-none cursor-pointer py-1"
                aria-label={`Go to slide ${i + 1}`}
              >
                <div
                  className={`h-px transition-all duration-400 ${
                    i === slide
                      ? "w-10 bg-brand-gold"
                      : "w-4 bg-brand-charcoal/25"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="absolute bottom-11 right-20 flex flex-col items-center gap-2">
            <h6 className="[writing-mode:vertical-rl] tracking-[0.25em] mb-0">
              Scroll
            </h6>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent opacity-50"
            />
          </div>
        </section>

        {/* ══════ PHILOSOPHY ══════ */}
        <section>
          <div className="bg-bg-soft border-t border-brand-gold/15 border-b border-brand-gold/15 overflow-hidden py-3">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="flex gap-15 whitespace-nowrap"
            >
              {Array(6)
                .fill([
                  "Interior Excellence",
                  "Premium Craftsmanship",
                  "Est. 2017",
                  "Varanasi, India",
                  "Luxury Design",
                  "Space Transformation",
                ])
                .flat()
                .map((t, i) => (
                  <span
                    key={i}
                    className={`text-sm uppercase tracking-wider ${
                      i % 6 === 0 ? "text-brand-gold" : "text-brand-charcoal/60"
                    }`}
                  >
                    {t} <span className="text-brand-gold ml-[30px]">✦</span>
                  </span>
                ))}
            </motion.div>
          </div>

          <Inner className="pt-12 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-12">
              <Reveal>
                <h6 className="mb-4">The Honeybee Ethos</h6>
                <h2>
                  Engineering
                  <br />
                  <em className="italic text-brand-gold not-italic">
                    Natural Efficiency.
                  </em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-5">
                  We translate the biological brilliance of the hive into a
                  blueprint for modern excellence. Hard work is expected;
                  perfection is the baseline.
                </p>
                <HR />
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-brand-charcoal/10">
              {principles.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`py-8 px-6 pb-10 ${
                    i < 3 && "lg:border-r border-brand-charcoal/10"
                  }`}
                >
                  <h6 className="mb-4">[{p.id}]</h6>
                  <h5 className="mb-2">{p.title}</h5>
                  <p className="text-sm text-brand-charcoal/60 leading-relaxed m-0">
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </Inner>
        </section>

        {/* ══════ INTRODUCTION ══════ */}
        <section className="bg-bg-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="py-12 lg:py-16 section-px flex flex-col justify-center">
              <Reveal>
                <h6 className="mb-4">Est. 2017</h6>
                <h2 className="mb-4">
                  Crafting Excellence
                  <br />
                  <em className="italic text-brand-gold not-italic">
                    Since a Decade
                  </em>
                </h2>
                <HR className="mb-6" />
                <p className="mb-3">
                  InterioXcel, established by Mrs. Meera Ramesh Vishwakarma, is
                  dedicated to creating comprehensive furnishing contracting
                  solutions. Our founders bring decades of experience in the
                  interior solutions sector.
                </p>
                <p className="mb-8">
                  Having collaborated with esteemed architects and PMC
                  companies, we've successfully delivered numerous interior
                  projects. Under the leadership of Abhishek Vishwakarma, we
                  continue our commitment to excellence.
                </p>
                <div className="grid grid-cols-2 gap-5 mb-8">
                  {[
                    { v: `${totalProjects}+`, l: "Projects Completed" },
                    { v: `${totalBankModels}+`, l: "Bank Models" },
                  ].map((s, i) => (
                    <div key={i} className="border-l border-brand-gold pl-4">
                      <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-gold leading-none">
                        {s.v}
                      </div>
                      <h6 className="mb-0 mt-1">{s.l}</h6>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="btn-primary inline-flex w-fit">
                  Our Story
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </Reveal>
            </div>
            <div className="relative overflow-hidden h-[500px] lg:h-auto">
              <ParallaxImg
                src={
                  projects?.[0]?.images?.[0]?.image_path
                    ? getImageUrl(projects[0].images[0].image_path)
                    : "https://images.pexels.com/photos/5379178/pexels-photo-5379178.jpeg"
                }
                alt="Interior Design"
                className="h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-soft/30 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute bottom-10 -left-7 bg-white p-6 max-w-[300px] border-l-2 border-brand-gold shadow-md"
              >
                <p className="text-sm text-brand-charcoal italic leading-relaxed mb-2 font-serif">
                  "Adherence to values and principles of honesty and
                  transparency"
                </p>
                <h6 className="mb-0">— Our Philosophy</h6>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════ ACHIEVEMENTS / STATS ══════ */}
        <section className="bg-bg-soft">
          <Inner className="pt-12 pb-8">
            <div className="text-center mb-8">
              <Reveal>
                <h6 className="mb-3">Our Achievements</h6>
              </Reveal>
              <Reveal delay={0.1}>
                <h2>
                  Numbers That{" "}
                  <em className="italic text-brand-gold not-italic">Speak</em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <HR className="mx-auto mt-4" />
              </Reveal>
            </div>
          </Inner>
          <div className="border-t border-brand-gold/15 border-b border-brand-gold/15">
            <Inner className="py-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <StatItem
                    key={i}
                    value={s.value}
                    label={s.label}
                    bordered={i < 3}
                  />
                ))}
              </div>
            </Inner>
          </div>
          <Inner className="pt-4 pb-6 flex justify-end">
            <Link
              to="/achievement"
              className="inline-flex items-center gap-2 text-brand-gold font-medium no-underline uppercase tracking-wide transition-all duration-300 hover:gap-3 hover:text-brand-gold-light"
            >
              All Achievements <ArrowRightIcon className="w-2.5 h-2.5" />
            </Link>
          </Inner>
        </section>

        {/* ══════ SERVICES ══════ */}
        {displayedServices.length > 0 && (
          <section>
            <Inner className="pt-12 pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-15 items-end mb-12">
                <Reveal>
                  <h6 className="mb-4">What We Offer</h6>
                  <h2>
                    Our Comprehensive
                    <br />
                    <em className="italic text-brand-gold not-italic">
                      Services
                    </em>
                  </h2>
                </Reveal>
                <Reveal delay={0.2} y={15}>
                  <p className="mb-4">
                    Your ultimate one-stop solution for all interior furnishing
                    contracting needs — from conception to flawless completion.
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-brand-gold font-medium no-underline uppercase tracking-wide transition-all duration-300 hover:gap-3 hover:text-brand-gold-light"
                  >
                    View All Services <ArrowRightIcon className="w-2.5 h-2.5" />
                  </Link>
                </Reveal>
              </div>
            </Inner>
            <Inner className="pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
                {displayedServices.map((s, i) => (
                  <ServiceCard key={i} service={s} index={i} />
                ))}
              </div>
            </Inner>
          </section>
        )}

        {/* ══════ AREAS ══════ */}
        {displayedAreas.length > 0 && (
          <section className="bg-bg-soft">
            <Inner className="py-12">
              <div className="text-center mb-10">
                <Reveal>
                  <h6 className="mb-3">Where We Excel</h6>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2>
                    Areas of{" "}
                    <em className="italic text-brand-gold not-italic">
                      Operation
                    </em>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <HR className="mx-auto mt-4" />
                </Reveal>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-brand-charcoal/10">
                {displayedAreas.map((area, i) => {
                  const Icon = area.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`py-10 px-6 text-center ${
                        i < 3 && "lg:border-r border-brand-charcoal/10"
                      }`}
                    >
                      <div className="w-11 h-11 border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-4.5 h-4.5 text-brand-gold" />
                      </div>
                      <h4 className="mb-2">{area.title}</h4>
                      <p className="text-sm text-brand-charcoal/60 leading-relaxed mb-3">
                        {area.description}
                      </p>
                      <h6 className="mb-0">{area.projects} Projects</h6>
                    </motion.div>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/areas-we-serve"
                  className="inline-flex items-center gap-2 text-brand-gold font-medium no-underline uppercase tracking-wide transition-all duration-300 hover:gap-3 hover:text-brand-gold-light"
                >
                  All Areas <ArrowRightIcon className="w-2.5 h-2.5" />
                </Link>
              </div>
            </Inner>
          </section>
        )}

        {/* ══════ PROJECTS ══════ */}
        {displayedProjects.length > 0 && (
          <section>
            <Inner className="pt-12 pb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                <div>
                  <Reveal>
                    <h6 className="mb-3">Our Portfolio</h6>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2>
                      Major{" "}
                      <em className="italic text-brand-gold not-italic">
                        Projects
                      </em>
                    </h2>
                  </Reveal>
                </div>
                <Reveal delay={0.2}>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 text-brand-gold font-medium no-underline uppercase tracking-wide transition-all duration-300 hover:gap-3 hover:text-brand-gold-light"
                  >
                    View All <ArrowRightIcon className="w-2.5 h-2.5" />
                  </Link>
                </Reveal>
              </div>
            </Inner>
            <Inner className="pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
                {displayedProjects.map((p, i) => (
                  <ProjectCard key={i} project={p} index={i} />
                ))}
              </div>
            </Inner>
          </section>
        )}

        {/* ══════ WORK IN PROGRESS ══════ */}
        {workInProgress.length > 0 && (
          <section className="bg-bg-soft">
            <Inner className="py-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
                <div>
                  <Reveal>
                    <h6 className="mb-4">Currently Working On</h6>
                    <h2 className="mb-5">
                      Work in
                      <br />
                      <em className="italic text-brand-gold not-italic">
                        Progress
                      </em>
                    </h2>
                    <HR />
                    <p className="mt-4">
                      We take immense pride in our ongoing projects, each a
                      testament to our commitment to craft and precision.
                    </p>
                  </Reveal>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
                  {workInProgress.map((w, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="relative overflow-hidden h-[380px]"
                    >
                      <img
                        src={w.image}
                        alt={w.project}
                        className="w-full h-full object-cover block"
                        onError={(e) => {
                          e.target.src = "/img/services/1.webp";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="inline-block px-2.5 py-0.75 border border-brand-gold mb-2">
                          <h6 className="mb-0">Live Project</h6>
                        </div>
                        <h4 className="mb-1">{w.project}</h4>
                        <div className="flex items-center gap-1.5 text-sm text-brand-charcoal/60">
                          <MapPinIcon className="w-2.5 h-2.5 text-brand-gold" />
                          <span>{w.location}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Inner>
          </section>
        )}

        {/* ══════ PROCESS ══════ */}
        <section className="bg-bg-soft">
          <Inner className="py-12">
            <div className="text-center mb-10">
              <Reveal>
                <h6 className="mb-3">How We Work</h6>
              </Reveal>
              <Reveal delay={0.1}>
                <h2>
                  Our Execution{" "}
                  <em className="italic text-brand-gold not-italic">
                    Strategy
                  </em>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <HR className="mx-auto mt-4" />
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-brand-charcoal/10 mb-10">
              {["Planning & Design", "Documentation", "Execution"].map(
                (step, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`py-7 px-6 cursor-pointer transition-all duration-400 relative ${
                      i < 2 && "md:border-r border-brand-charcoal/10"
                    } ${activeStep === i ? "bg-white" : "bg-transparent"}`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-px transition-all duration-400 ${
                        activeStep === i ? "bg-brand-gold" : "bg-transparent"
                      }`}
                    />
                    <h6
                      className={`mb-2 ${
                        activeStep === i
                          ? "text-brand-gold"
                          : "text-brand-charcoal/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </h6>
                    <h5
                      className={`m-0 transition-colors duration-300 ${
                        activeStep === i
                          ? "text-brand-charcoal"
                          : "text-brand-charcoal/60"
                      }`}
                    >
                      {step}
                    </h5>
                  </div>
                ),
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="max-w-[640px] mx-auto text-center"
              >
                <p className="m-0">
                  {
                    [
                      "Understanding designs and drawings, allocating resources for optimal project execution. We collaborate closely with architects and designers to ensure every detail is precisely planned.",
                      "Detailed documentation, estimates, and technical drawings are prepared to ensure seamless implementation and efficient project management across all workstreams.",
                      "Final execution, quality checks, and project delivery with strict quality standards to ensure complete client satisfaction and zero compromise on craftsmanship.",
                    ][activeStep]
                  }
                </p>
              </motion.div>
            </AnimatePresence>
          </Inner>
        </section>

        {/* ══════ QUALITY & SAFETY ══════ */}
        <section>
          <Inner className="py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-25 items-center">
              <Reveal>
                <h6 className="mb-4">Our Commitment</h6>
                <h2 className="mb-4">
                  Quality & Safety
                  <br />
                  <em className="italic text-brand-gold not-italic">First</em>
                </h2>
                <HR className="mb-6" />
                <p className="mb-3">
                  At our construction sites, quality and safety remain the
                  highest priority for every professional involved in interior
                  execution. We strictly follow industry standards to ensure
                  exceptional craftsmanship.
                </p>
                <p className="m-0">
                  From providing protective equipment to regular safety
                  inspections and continuous workforce training, every process
                  protects our team and maintains the highest quality standards.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
                {[
                  {
                    Icon: WrenchIcon,
                    title: "PPE Equipment",
                    desc: "Full protective gear for all workers",
                  },
                  {
                    Icon: ShieldCheckIcon,
                    title: "Safety Inspections",
                    desc: "Regular monitoring & site audits",
                  },
                  {
                    Icon: WrenchScrewdriverIcon,
                    title: "Maintenance",
                    desc: "Routine equipment servicing",
                  },
                  {
                    Icon: UsersIcon,
                    title: "Team Training",
                    desc: "Continuous skill development",
                  },
                ].map(({ Icon, title, desc }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-bg-soft p-6 border-t border-brand-gold/10 transition-all duration-300 hover:bg-bg-soft/70"
                  >
                    <div className="w-9 h-9 border border-brand-gold/30 rounded-full flex items-center justify-center mb-3">
                      <Icon className="w-3.5 h-3.5 text-brand-gold" />
                    </div>
                    <h5 className="mb-2">{title}</h5>
                    <p className="text-sm text-brand-charcoal/60 leading-relaxed m-0">
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Inner>
        </section>

        {/* ══════ CTA BANNER ══════ */}
        <section className="relative min-h-[400px]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={
                projects?.[1]?.images?.[0]?.image_path
                  ? getImageUrl(projects[1].images[0].image_path)
                  : "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
              }
              alt=""
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/80" />
          </div>
          <div className="relative z-10 flex items-center min-h-[400px]">
            <Inner>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-[600px] text-center mx-auto"
              >
                <h6 className="mb-4 text-white">Ready to Begin?</h6>
                <h2 className="text-white mb-5">
                  Ready to Transform
                  <br />
                  <em className="italic text-brand-gold not-italic">
                    Your Space?
                  </em>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8 max-w-[440px] mx-auto">
                  Let's bring your vision to life with our expertise and
                  dedication to excellence. Every project begins with a
                  conversation.
                </p>
                <Link to="/contact" className="btn-primary inline-flex">
                  Schedule a Consultation
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </Inner>
          </div>
        </section>

        {/* ══════ TEAM ══════ */}
        {displayedTeam.length > 0 && (
          <section>
            <Inner className="py-12">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-end mb-10">
                <Reveal>
                  <h6 className="mb-4">Our Leadership</h6>
                  <h2>
                    Meet the{" "}
                    <em className="italic text-brand-gold not-italic">Team</em>
                  </h2>
                </Reveal>
                <Reveal delay={0.2} y={10}>
                  <p className="mb-3">
                    The minds and hands behind every space we transform — united
                    by a passion for craft and a relentless pursuit of
                    perfection.
                  </p>
                  <HR />
                </Reveal>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedTeam.map((m, i) => (
                  <TeamCard key={i} member={m} index={i} />
                ))}
              </div>
            </Inner>
          </section>
        )}

        {/* ══════ BLOG ══════ */}
        {displayedBlogs.length > 0 && (
          <section className="bg-bg-soft">
            <Inner className="py-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
                <div>
                  <Reveal>
                    <h6 className="mb-3">Insights</h6>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2>
                      Latest from{" "}
                      <em className="italic text-brand-gold not-italic">
                        Our Blog
                      </em>
                    </h2>
                  </Reveal>
                </div>
                <Reveal delay={0.2}>
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-brand-gold font-medium no-underline uppercase tracking-wide transition-all duration-300 hover:gap-3 hover:text-brand-gold-light"
                  >
                    All Articles <ArrowRightIcon className="w-2.5 h-2.5" />
                  </Link>
                </Reveal>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedBlogs.map((b, i) => (
                  <BlogCard key={i} blog={b} index={i} />
                ))}
              </div>
            </Inner>
          </section>
        )}

        {/* ══════ TESTIMONIAL ══════ */}
        <Testimonial />

        {/* ══════ CONTACT BAR ══════ */}
        <div className="bg-bg-soft border-t border-brand-gold/15">
          <Inner className="py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <h4 className="mb-1">
                  Let's Create Something Amazing Together
                </h4>
                <p className="text-sm text-brand-charcoal/60 m-0">
                  Contact us today to discuss your project requirements
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-5 sm:gap-6"
              >
                {[
                  {
                    Icon: PhoneIcon,
                    label: "Call Us",
                    value: "+91-6393556220",
                  },
                  {
                    Icon: EnvelopeIcon,
                    label: "Email Us",
                    value: "info@interioxcel.com",
                  },
                  {
                    Icon: MapPinIcon,
                    label: "Visit Us",
                    value: "Varanasi, UP",
                  },
                ].map(({ Icon, label, value }, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-[34px] h-[34px] rounded-full border border-brand-gold/25 flex items-center justify-center transition-colors duration-300 group-hover:border-brand-gold flex-shrink-0">
                      <Icon className="w-3 h-3 text-brand-gold" />
                    </div>
                    <div>
                      <h6 className="mb-0">{label}</h6>
                      <div className="text-sm text-brand-charcoal mt-0.5">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </Inner>
        </div>

       
      </div>
    </>
  );
};

export default Home;
