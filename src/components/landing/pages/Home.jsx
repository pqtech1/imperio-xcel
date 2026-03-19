import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ArrowRightIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
  SwatchIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

import {
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  ShoppingBagIcon,
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

// Hero slides (keep static as they're brand messaging)
const heroSlides = [
  {
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    title: "Crafting Excellence in Interior Design",
    subtitle: "Transforming spaces into masterpieces since 2017",
    accent: "Premium Furnishing Contracting",
  },
  {
    image: "https://images.pexels.com/photos/276514/pexels-photo-276514.jpeg",
    title: "Where Vision Meets Precision",
    subtitle: "Comprehensive furnishing contracting solutions",
    accent: "Architecture & Design Excellence",
  },
  {
    image: "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg",
    title: "Architecture That Inspires",
    subtitle: "Creating divine abodes with dedication and perfection",
    accent: "Luxury Interior Solutions",
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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Fetch all dynamic data
  const { data: services, loading: servicesLoading } = useServices();
  const { data: areas, loading: areasLoading } = useAreas();
  const { data: projects, loading: projectsLoading } = useProjects();
  const { data: teams, loading: teamsLoading } = useTeams();
  const { data: achievements, loading: achievementsLoading } =
    useAchievements();
  const { data: blogs, loading: blogsLoading } = useBlogs();

  const loading =
    servicesLoading ||
    areasLoading ||
    projectsLoading ||
    teamsLoading ||
    achievementsLoading ||
    blogsLoading;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Transform services for display (take first 3)
  const displayedServices =
    services?.slice(0, 3).map((service, index) => ({
      icon: [SwatchIcon, Squares2X2Icon, CubeIcon][index % 3],
      title: service.service_title || service.title || "Service",
      description:
        service.service_short_description ||
        stripHtml(service.description || "").substring(0, 100) ||
        "Comprehensive interior solutions",
      features: service.what_we_do?.slice(0, 3).map((item) => item.title) || [
        "Interior Detailing",
        "Space Planning",
        "Material Selection",
      ],
      slug: service.slug || service.id,
    })) || [];

  // Transform stats from achievements (take first 4)
  const stats = achievements?.slice(0, 4).map((achievement) => ({
    icon: TrophyIcon,
    value: `${achievement.count}+`,
    label: achievement.title,
  })) || [
    { icon: TrophyIcon, value: "7+", label: "Years of Excellence" },
    { icon: BriefcaseIcon, value: "50+", label: "Major Projects" },
    { icon: BuildingOfficeIcon, value: "40+", label: "Bank Models" },
    { icon: StarIcon, value: "100%", label: "Client Satisfaction" },
  ];

  // Transform areas of operation
  const displayedAreas =
    areas?.slice(0, 4).map((area) => ({
      icon: [
        BuildingStorefrontIcon,
        BuildingLibraryIcon,
        BuildingOffice2Icon,
        HomeModernIcon,
      ][Math.floor(Math.random() * 4)],
      title: area.title || "Area",
      description: area.description || "Specialized interior solutions",
      projects: `${area.projects_done || 0}+ Projects`,
    })) || [];

  // Transform projects for display (take first 6 for major projects)
  const displayedProjects =
    projects?.slice(0, 6).map((project) => ({
      name: project.name || "Project",
      locations:
        [project.district, project.state, project.country]
          .filter(Boolean)
          .join(", ") || "Location",
      icon: [
        BuildingLibraryIcon,
        BuildingOffice2Icon,
        ShoppingBagIcon,
        BuildingStorefrontIcon,
      ][Math.floor(Math.random() * 4)],
      image: project.images?.[0]?.image_path
        ? getImageUrl(project.images[0].image_path)
        : "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      ongoing: project.ongoing,
    })) || [];

  // Transform work in progress (ongoing projects)
  const workInProgress =
    projects
      ?.filter((p) => p.ongoing === 1)
      .slice(0, 2)
      .map((project) => ({
        project: project.name || "Project",
        location:
          [project.district, project.state, project.country]
            .filter(Boolean)
            .join(", ") || "Location",
        image: project.images?.[0]?.image_path
          ? getImageUrl(project.images[0].image_path)
          : "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      })) || [];

  // Transform team members (take first 3)
  const displayedTeam =
    teams?.map((member) => ({
      name: member.name || "Team Member",
      role: member.designation || "Professional",
      desc: member.bio
        ? stripHtml(member.bio).substring(0, 60)
        : "Dedicated professional",
      image:
        getImageUrl(member.image) ||
        "https://via.placeholder.com/300x400?text=Team+Member",
    })) || [];

  // Transform blogs for display (take first 3)
  const displayedBlogs =
    blogs
      ?.filter((b) => b.is_published === 1)
      .slice(0, 3)
      .map((blog) => ({
        title: blog.title,
        excerpt: stripHtml(blog.content || "").substring(0, 120) + "...",
        image:
          getImageUrl(blog.image) ||
          "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
        slug: blog.slug || blog.id,
        date: new Date(blog.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })) || [];

  // Calculate totals
  const totalProjects = projects?.length || 50;
  const totalBankModels =
    projects?.filter(
      (p) =>
        p.name?.toLowerCase().includes("bank") ||
        p.name?.toLowerCase().includes("finance"),
    ).length || 40;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      {/* HERO SECTION - Static */}
      <section className="relative h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <AnimatePresence>
            <motion.img
              key={heroSlides[currentSlide].image}
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23b88a44' fill-opacity='0.1'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto section-px">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="w-12 h-[2px] bg-brand-gold"></span>
                <h6 className="text-brand-gold !mb-0">
                  {heroSlides[currentSlide].accent}
                </h6>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-gray-200 !mb-0"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex gap-4 mt-6"
              >
                <Link to="/portfolio" className="btn-primary group">
                  Explore Our Work
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)}>
              <div
                className={`w-12 h-[2px] transition-all ${
                  currentSlide === index ? "bg-brand-gold" : "bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 right-8 text-white/60 text-base tracking-widest rotate-90 origin-bottom-right"
        >
          SCROLL
        </motion.div>
      </section>

      {/* HONEYBEE PHILOSOPHY - Static */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto section-px max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-[1px] bg-brand-gold"></div>
            <h6 className="!mb-0">The Honeybee Ethos</h6>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="!text-4xl md:!text-5xl font-light !mb-0"
            >
              Engineering <br />
              <span className="font-serif italic">Natural Efficiency.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pt-2"
            >
              <p>
                We translate the biological brilliance of the hive into a
                blueprint for modern excellence. Hard work is expected;
                perfection is the baseline.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-100">
            {principles.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="pt-10 pb-12 md:pr-8 border-b border-gray-100 lg:border-b-0 lg:border-r last:border-r-0 group cursor-default"
              >
                <h6 className="!text-brand-gold !mb-6 !text-[11px]">
                  [{item.id}]
                </h6>
                <h3 className="text-xl font-medium mb-4 transition-colors duration-300 group-hover:text-brand-gold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed font-light transition-colors duration-500 group-hover:text-gray-900">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRODUCTION SECTION - Static with dynamic stats */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto section-px">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h6 className="!text-brand-gold-light">EST. 2017</h6>
              <h2>
                Crafting Excellence{" "}
                <span className="text-brand-gold-light">Since a Decade</span>
              </h2>
              <div className="w-16 h-[2px] bg-brand-gold-light mb-6"></div>
              <p>
                InterioXcel, established by Mrs. Meera Ramesh Vishwakarma, is
                dedicated to creating comprehensive furnishing contracting
                solutions within the interior design industry. Our founders
                bring extensive wealth of experience, spanning decades, in the
                interior solutions sector.
              </p>
              <p className="!mb-6">
                Having collaborated with esteemed architects and PMC companies,
                we've successfully delivered numerous interior projects
                encompassing thousands of square feet. Today, under the
                leadership of Abhishek Vishwakarma, we continue our commitment
                to excellence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-4 border-brand-gold-light pl-4">
                  <p className="text-2xl font-bold">{totalProjects}+</p>
                  <p className="text-base">Projects Completed</p>
                </div>
                <div className="border-l-4 border-brand-gold-light pl-4">
                  <p className="text-2xl font-bold">{totalBankModels}+</p>
                  <p className="text-base">Bank Models</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative">
                <img
                  src={
                    projects?.[0]?.images?.[0]?.image_path
                      ? getImageUrl(projects[0].images[0].image_path)
                      : "https://images.pexels.com/photos/5379178/pexels-photo-5379178.jpeg"
                  }
                  alt="Interior Design"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-brand-charcoal text-white p-6 rounded-xl max-w-sm shadow-2xl">
                  <CheckCircleIcon className="w-8 h-8 text-brand-gold-light mb-3" />
                  <p className="text-white text-base font-light italic">
                    "Adherence to values and principles of honesty and
                    transparency"
                  </p>
                  <p className="mt-3 text-brand-gold-light text-sm">
                    — Our Philosophy
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      {displayedServices.length > 0 && (
        <section className="pt-16 pb-12 bg-white">
          <div className="container mx-auto section-px max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h6 className="!text-brand-gold">What We Offer</h6>
              <h2>Our Comprehensive Services</h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-6"></div>
              <p className="!mb-0">
                Your ultimate one-stop solution provider for all interior
                furnishing contracting needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
              {displayedServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group pt-10 pb-12 px-6 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0"
                  >
                    <Link to={`/${service.slug}`}>
                      <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center mb-6 group-hover:border-brand-gold transition-colors duration-300">
                        <Icon className="w-5 h-5 group-hover:text-brand-gold transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-medium mb-3 group-hover:text-brand-gold transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-base"
                          >
                            <CheckCircleIcon className="w-3 h-3 text-brand-gold" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* View All Services Link */}
            <div className="text-center mt-8">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-brand-gold-light hover:text-brand-gold transition-colors font-semibold"
              >
                View All Services
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* STATS SECTION */}
      <section className="py-12 bg-brand-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          {" "}
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23b88a44'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto section-px max-w-7xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="pt-8 pb-10 px-4 text-center border-b md:border-b-0 md:border-r border-white/10 last:border-r-0 group"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-gold-light opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="text-3xl md:text-4xl font-light text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-base text-white uppercase tracking-widest group-hover:text-gray-400 transition-colors duration-300">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View All Achievements Link */}
        <div className="text-center mt-4">
          <Link
            to="/achievement"
            className="inline-flex items-center gap-2 text-brand-gold-light hover:text-brand-gold transition-colors text-sm font-semibold"
          >
            View All Achievements
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* AREAS OF OPERATION */}
      {displayedAreas.length > 0 && (
        <section className="pt-16 pb-12 bg-white">
          <div className="container mx-auto section-px max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h6 className="!text-brand-gold">Where We Excel</h6>
              <h2>Areas of Operation</h2>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-gray-100">
              {displayedAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group pt-8 pb-10 px-6 border-b lg:border-b-0 lg:border-r border-gray-100 last:border-r-0 text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-brand-gold transition-colors duration-300">
                        <Icon className="w-5 h-5 group-hover:text-brand-gold transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-brand-gold transition-colors duration-300">
                      {area.title}
                    </h3>
                    <p className="text-base leading-relaxed mb-3">
                      {area.description}
                    </p>
                    <h6 className="!text-brand-gold !text-base !mb-0">
                      {area.projects}
                    </h6>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/areas-we-serve"
                className="inline-flex items-center gap-2 text-brand-gold-light hover:text-brand-gold transition-colors font-semibold"
              >
                View All Areas
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* MAJOR PROJECTS SHOWCASE */}
      {displayedProjects.length > 0 && (
        <section className="pt-16 pb-12 bg-gradient-to-b from-amber-50/30 to-white">
          <div className="container mx-auto section-px">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h6 className="!text-brand-gold-light">OUR PORTFOLIO</h6>
              <h2>Major Projects</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mb-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedProjects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredProject(index)}
                    onHoverEnd={() => setHoveredProject(null)}
                    className="group relative h-72 rounded-xl overflow-hidden cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5 text-brand-gold-light" />
                        <h3 className="text-white font-bold text-lg">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-brand-gold-light text-base mb-2">
                        {project.locations}
                      </p>
                      <div className="flex items-center gap-2 text-white/80 text-base">
                        <MapPinIcon className="w-3 h-3" />
                        <span>{project.locations}</span>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 bg-brand-gold-light text-white px-3 py-1 rounded-full text-base font-medium">
                      {project.ongoing ? "Ongoing" : "Completed"}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* View All Projects Link */}
            <div className="text-center mt-8">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-brand-gold-light hover:text-brand-gold transition-colors font-semibold"
              >
                View All Projects
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* WORK IN PROGRESS */}
      {workInProgress.length > 0 && (
        <section className="pt-16 pb-12 bg-brand-charcoal text-white">
          <div className="container mx-auto section-px max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h6 className="!text-brand-gold-light !mb-2">
                CURRENTLY WORKING ON
              </h6>
              <h2 className="text-white">Work in Progress</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workInProgress.map((work, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-lg"
                >
                  <img
                    src={work.image}
                    alt={work.project}
                    className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-semibold mb-1 text-white">
                      {work.project}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-300 text-base">
                      <MapPinIcon className="w-3 h-3" />
                      <span>{work.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUR PROCESS - Static */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto section-px max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h6 className="!text-brand-gold-light">HOW WE WORK</h6>
            <h2>Our Execution Strategy</h2>
            <div className="w-12 h-[1px] bg-brand-gold-light mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-10 relative">
              <div className="absolute left-0 right-0 h-[1px] bg-gray-200 top-1/2 -translate-y-1/2"></div>

              {["Planning & Design", "Documentation", "Execution"].map(
                (step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative z-10 text-center"
                  >
                    <div
                      onClick={() => setActiveStep(index)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full text-sm font-semibold cursor-pointer transition-all duration-300
                        ${
                          activeStep === index
                            ? "bg-brand-gold-light text-white shadow-md"
                            : "bg-gray-100 hover:bg-gray-200"
                        }
                      `}
                    >
                      {index + 1}
                    </div>
                    <p
                      className={`mt-3 text-base font-medium transition-colors ${
                        activeStep === index ? "text-brand-gold-light" : ""
                      }`}
                    >
                      {step}
                    </p>
                  </motion.div>
                ),
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 p-8 rounded-lg border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {
                    [
                      "Planning and Design",
                      "Construction Documentation",
                      "Project Completion",
                    ][activeStep]
                  }
                </h3>

                <p className="text-gray-600 leading-relaxed text-base">
                  {activeStep === 0 &&
                    "Understanding designs and drawings, allocating resources for optimal project execution. We collaborate closely with architects and designers to ensure every detail is precisely planned."}
                  {activeStep === 1 &&
                    "Detailed documentation, estimates, and technical drawings are prepared to ensure seamless implementation and efficient project management."}
                  {activeStep === 2 &&
                    "Final execution, quality checks, and project delivery with strict quality standards to ensure complete client satisfaction."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* QUALITY & SAFETY - Static */}
      <section className="pt-16 pb-12 bg-brand-charcoal text-white">
        <div className="container mx-auto section-px max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <h6 className="!text-brand-gold-light">Our Commitment</h6>
              <h2 className="text-white">
                Quality & Safety{" "}
                <span className="text-brand-gold-light">First</span>
              </h2>
              <div className="w-12 h-[1px] bg-brand-gold-light mb-6"></div>
              <p className="text-gray-300 !mb-4">
                At our construction sites, quality and safety remain the highest
                priority for every professional involved in interior execution.
                We strictly follow industry standards to ensure exceptional
                craftsmanship and a safe working environment.
              </p>
              <p className="text-white !mb-0">
                From providing protective equipment to regular safety
                inspections and continuous workforce training, every process is
                designed to protect our team and maintain the highest quality
                standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: WrenchIcon,
                  title: "PPE Equipment",
                  desc: "Full protective gear for all workers",
                },
                {
                  icon: ShieldCheckIcon,
                  title: "Safety Inspections",
                  desc: "Regular monitoring & site audits",
                },
                {
                  icon: WrenchScrewdriverIcon,
                  title: "Maintenance",
                  desc: "Routine equipment servicing",
                },
                {
                  icon: UsersIcon,
                  title: "Team Training",
                  desc: "Continuous skill development",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group border border-white/10 p-6 rounded-lg hover:border-brand-gold-light transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 text-brand-gold-light mb-3" />
                    <h4 className="font-semibold mb-1 text-sm">{item.title}</h4>
                    <p className="text-base text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              projects?.[1]?.images?.[0]?.image_path
                ? getImageUrl(projects[1].images[0].image_path)
                : "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
            }
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/95 to-brand-charcoal/90" />
        </div>

        <div className="container mx-auto section-px relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-white !mb-4">
              Ready to Transform{" "}
              <span className="text-brand-gold-light">Your Space?</span>
            </h2>
            <p className="text-gray-300 !mb-6">
              Let's bring your vision to life with our expertise and dedication
              to excellence
            </p>
            <Link
              to="/contact"
              className="btn-primary group bg-brand-gold-light hover:bg-brand-gold text-white !px-8 !py-3 mx-auto"
            >
              SCHEDULE A DESIGN CONSULTATION
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      {displayedTeam.length > 0 && (
        <section className="pt-16 pb-12 bg-white">
          <div className="container mx-auto section-px max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h6 className="!text-brand-gold-light">Our Leadership</h6>
              <h2>Meet the Team</h2>
              <div className="w-12 h-[1px] bg-brand-gold-light mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {displayedTeam.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center group"
                >
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border border-transparent group-hover:border-brand-gold-light transition-all duration-500"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <h6 className="!text-brand-gold-light !text-base !mb-2">
                    {member.role}
                  </h6>
                  <p className="text-base">{member.desc}</p>
                </motion.div>
              ))}
            </div>

            
          </div>
        </section>
      )}

      {/* BLOG PREVIEW SECTION */}
      {displayedBlogs.length > 0 && (
        <section className="pt-16 pb-12 bg-gradient-to-b from-amber-50/30 to-white">
          <div className="container mx-auto section-px">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h6 className="!text-brand-gold-light">INSIGHTS</h6>
              <h2>Latest from Our Blog</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto mb-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedBlogs.map((blog, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/blog/${blog.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-brand-gold-light mb-2">
                        {blog.date}
                      </p>
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-brand-gold-light hover:text-brand-gold transition-colors text-sm font-semibold">
                        Read More
                        <ArrowRightIcon className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Blog Link */}
            <div className="text-center mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-brand-gold-light hover:text-brand-gold transition-colors font-semibold"
              >
                View All Articles
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIAL SECTION */}
      <Testimonial />

      {/* CONTACT SECTION */}
      <section className="py-8 bg-brand-charcoal text-white border-t border-white/10">
        <div className="container mx-auto section-px">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-1">
                Let's Create Something Amazing Together
              </h3>
              <p className="text-gray-300 text-base">
                Contact us today to discuss your project requirements
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-brand-gold-light/10 flex items-center justify-center group-hover:bg-brand-gold-light transition-colors duration-300">
                  <PhoneIcon className="w-4 h-4 text-brand-gold-light group-hover:text-white" />
                </div>
                <div>
                  <p className="text-base text-white">Call Us</p>
                  <p className="text-white text-sm font-medium">
                    +91-6393556220
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-brand-gold-light/10 flex items-center justify-center group-hover:bg-brand-gold-light transition-colors duration-300">
                  <EnvelopeIcon className="w-4 h-4 text-brand-gold-light group-hover:text-white" />
                </div>
                <div>
                  <p className="text-base text-white">Email Us</p>
                  <p className="text-white text-sm font-medium">
                    info@interioxcel.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-brand-gold-light/10 flex items-center justify-center group-hover:bg-brand-gold-light transition-colors duration-300">
                  <MapPinIcon className="w-4 h-4 text-brand-gold-light group-hover:text-white" />
                </div>
                <div>
                  <p className="text-base text-white">Visit Us</p>
                  <p className="text-white text-sm font-medium">Varanasi, UP</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
