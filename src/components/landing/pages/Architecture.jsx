import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  FAQ,
  GetAQuote,
  OurProcess,
  OurServices,
  WhyChooseUs,
} from "./Interior";
import { VideoSection } from "./Achievement";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  BuildingLibraryIcon,
  HomeModernIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  SwatchIcon,
  CubeIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  TrophyIcon,
  BriefcaseIcon,
  StarIcon,
  EyeIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    id: 1,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <circle cx="32" cy="36" r="14" />
        <path d="M32 22V14" />
        <path d="M20 26l-6-6" />
        <path d="M44 26l6-6" />
        <path d="M26 10h12" />
        <circle
          cx="32"
          cy="36"
          r="4"
          fill="currentColor"
          stroke="none"
          opacity="0.4"
        />
        <path d="M18 8l4 4-4 4" />
        <path d="M46 8l-4 4 4 4" />
        <circle cx="20" cy="8" r="2" fill="currentColor" stroke="none" />
        <circle cx="44" cy="8" r="2" fill="currentColor" stroke="none" />
        <circle cx="32" cy="6" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "7+ years of excellence",
    description: "in architecture, interiors and turnkey projects",
  },
  {
    id: 2,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <rect x="8" y="32" width="12" height="24" />
        <rect x="26" y="20" width="12" height="36" />
        <rect x="44" y="12" width="12" height="44" />
        <path d="M4 56h56" />
        <path d="M14 28l12-10 12 6 14-16" strokeWidth="2" />
        <circle cx="14" cy="28" r="2" fill="currentColor" stroke="none" />
        <circle cx="26" cy="18" r="2" fill="currentColor" stroke="none" />
        <circle cx="38" cy="24" r="2" fill="currentColor" stroke="none" />
        <circle cx="52" cy="8" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "50+ successful projects",
    description: "across Uttar Pradesh and India",
  },
  {
    id: 3,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <rect x="8" y="28" width="20" height="28" />
        <rect x="36" y="18" width="20" height="38" />
        <path d="M8 28h20" />
        <path d="M12 34h8M12 40h8M12 46h8" strokeWidth="1" />
        <path d="M40 24h8M40 30h8M40 36h8M40 42h8" strokeWidth="1" />
        <path d="M4 56h56" />
        <path d="M18 28V20l8-6 8 6v8" />
        <circle
          cx="22"
          cy="22"
          r="2"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
      </svg>
    ),
    title: "40+ bank models",
    description: "across 8 districts for Kashi Gomati Grameen Bank",
  },
  {
    id: 4,
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <rect x="8" y="8" width="28" height="20" rx="2" />
        <rect x="14" y="36" width="36" height="20" rx="2" />
        <path d="M22 28v8" />
        <path d="M22 18h10M22 22h6" strokeWidth="1" />
        <path d="M40 14h8M40 18h8M40 22h8" strokeWidth="1" />
        <rect x="36" y="8" width="20" height="20" rx="2" />
        <path d="M20 46h20M20 50h14" strokeWidth="1" />
        <circle cx="48" cy="44" r="6" />
        <path d="M44 44l3 3 6-6" strokeWidth="1.5" />
      </svg>
    ),
    title: "End-to-end solutions",
    description: "from concept design to turnkey project execution",
  },
];

const projectCategories = [
  { name: "Retail Industry", count: "15+", icon: BuildingStorefrontIcon },
  { name: "Insurance & Finance", count: "40+", icon: BuildingLibraryIcon },
  { name: "Corporate Industry", count: "20+", icon: BuildingOfficeIcon },
  { name: "Hospitality Industry", count: "10+", icon: HomeModernIcon },
];

const majorProjects = [
  {
    name: "UNION BANK OF INDIA",
    locations: "8 Branches across UP",
    year: "2023",
  },
  {
    name: "KASHI GOMATI GRAMEEN BANK",
    locations: "40 Models in 8 Districts",
    year: "2022-23",
  },
  {
    name: "TANISHQ SHOWROOM",
    locations: "Varanasi - Swastic City",
    year: "2023",
  },
  { name: "NYKAA", locations: "Haldwani, Uttarakhand", year: "2023" },
  { name: "ALLEN SOLLY", locations: "Rourkela - 2 Locations", year: "2022" },
  { name: "PETER ENGLAND", locations: "Darbhanga, Bihar", year: "2022" },
  { name: "U.S. POLO ASSN.", locations: "Bettiah, Bihar", year: "2022" },
  { name: "Mia By Tanishq", locations: "Roorkee", year: "2023" },
];

const teamMembers = [
  {
    name: "Abhishek Vishwakarma",
    role: "Principal Architect & Owner",
    desc: "Leading with vision and dedication since 2024",
    icon: UserGroupIcon,
  },
  {
    name: "Kajal Vishwakarma",
    role: "Senior Architect",
    desc: "Creative excellence in architectural design",
    icon: SwatchIcon,
  },
  {
    name: "Ramesh Prasad Vishwakarma",
    role: "Project Advisor",
    desc: "Decades of expertise in construction",
    icon: AcademicCapIcon,
  },
];

const Architecture = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeProject, setActiveProject] = useState(0);

  return (
    <>
      {/* Hero Image */}
      <div className="w-full relative">
        <img
          src="https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg"
          alt="Architecture"
          className="w-full h-64 sm:h-72 md:h-80 lg:h-120 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
          <div className="container mx-auto section-px">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">EST. 2017</h6>
              </div>
              <h1 className="text-white !mb-2">
                Architectural{" "}
                <span className="text-brand-gold-light">Excellence</span>
              </h1>
              <p className="text-gray-200 !mb-0">
                Creating divine spaces with dedication, perfection, and teamwork
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="section-px mt-10 md:mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h6 className="text-brand-gold-light !mb-3">OUR APPROACH</h6>
              <h1 className="!text-2xl sm:!text-3xl md:!text-4xl !pb-2">
                Leading Architects in{" "}
                <span className="text-brand-gold-light">Varanasi</span>
              </h1>
              <div className="w-16 h-[2px] bg-brand-gold-light mb-4" />
              <p className="text-gray-600 !mb-0">
                <strong>At ImperioXcel Architects & Interior Designers,</strong>{" "}
                we bring together creativity, functionality, and precision to
                design spaces that inspire. Recognized among the{" "}
                <strong>leading architects in Varanasi</strong>, our studio
                offers complete{" "}
                <strong>architecture and interior design solutions –</strong>{" "}
                from retail spaces to bank branches, corporate offices, and
                commercial interiors.
                <br />
                <br />
                With more than{" "}
                <strong>
                  7+ years of experience and 50+ completed projects,
                </strong>{" "}
                including <strong>40+ bank models across 8 districts</strong>,
                we are known for delivering spaces that reflect functionality
                while maintaining timeless elegance. Our approach combines
                innovative design, strict quality standards, and turnkey
                execution, ensuring every project is completed on time and
                beyond expectations.
              </p>
            </div>
            <div className="lg:w-1/3 bg-amber-50/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-3 text-brand-charcoal">
                Our Philosophy
              </h3>
              <p className="text-gray-600 italic mb-4">
                "Honeybees are a symbol of hard work, dedication, perfection,
                focus, and teamwork. They work tirelessly towards achieving
                their desired goal."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-gold-light/10 flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-brand-gold-light" />
                </div>
                <div>
                  <p className="text-xs font-semibold">
                    Mrs. Meera Ramesh Vishwakarma
                  </p>
                  <p className="text-xs text-gray-500">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mt-10">
        <OurServices />
      </div>

      {/* Video Section */}
      <div className="mt-6">
        <VideoSection />
      </div>

      {/* Why Work With Us Section */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          background: "#1a1a1a",
        }}
      >
        {/* Blueprint background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#b88a44"
                  strokeWidth="0.5"
                />
              </pattern>
              <pattern
                id="bigGrid"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <rect width="200" height="200" fill="url(#grid)" />
                <path
                  d="M 200 0 L 0 0 0 200"
                  fill="none"
                  stroke="#b88a44"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bigGrid)" />
          </svg>
        </div>

        <div className="relative z-10 section-px pt-12 pb-14 md:pt-14 md:pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="mb-10">
              <h6 className="text-brand-gold-light !mb-3">WHY CHOOSE US</h6>
              <h2 className="text-white !mb-2">Why Work With Us</h2>
              <p className="text-gray-400 text-sm max-w-2xl">
                Clients trust us because we consistently deliver more than just
                design — we deliver{" "}
                <strong className="text-white font-semibold">
                  excellence and reliability
                </strong>
                .
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  onMouseEnter={() => setHoveredId(feature.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="relative cursor-pointer"
                  style={{
                    transition: "transform 0.3s ease",
                    transform:
                      hoveredId === feature.id
                        ? "translateY(-4px)"
                        : "translateY(0)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-sm"
                    style={{
                      background:
                        hoveredId === feature.id
                          ? "rgba(184, 138, 68, 0.1)"
                          : "transparent",
                      border:
                        hoveredId === feature.id
                          ? "1px solid rgba(184, 138, 68, 0.3)"
                          : "1px solid transparent",
                      transition: "all 0.3s ease",
                    }}
                  />
                  <div className="relative p-3">
                    <div
                      className="mb-3"
                      style={{
                        color: hoveredId === feature.id ? "#b88a44" : "#cccccc",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      className="text-base sm:text-lg font-semibold mb-1 leading-tight text-white"
                      style={{ letterSpacing: "0.01em" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-xs font-light leading-relaxed"
                      style={{
                        color: hoveredId === feature.id ? "#dddddd" : "#888888",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {feature.description}
                    </p>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "0.75rem",
                        height: "2px",
                        background: "#b88a44",
                        width: hoveredId === feature.id ? "30px" : "0px",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 font-light">
              When you choose ImperioXcel, you choose{" "}
              <strong className="text-brand-gold-light font-semibold">
                innovation, quality, and timeless design
              </strong>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Project Categories */}
      <div className="bg-white pt-12 pb-14 md:pt-14 md:pb-16 section-px">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h6 className="text-brand-gold-light !mb-3">AREAS OF EXPERTISE</h6>
            <h2 className="!mb-2">Industries We Serve</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {projectCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="bg-amber-50/50 p-4 rounded-lg text-center border border-gray-100 hover:border-brand-gold-light transition-all duration-300 hover:shadow"
                >
                  <Icon className="w-8 h-8 mx-auto text-brand-gold-light mb-2" />
                  <h3 className="font-bold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-brand-gold-light">
                    {category.count} Projects
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Major Projects Showcase */}
      <div className="bg-gradient-to-b from-amber-50/30 to-white pt-12 pb-14 md:pt-14 md:pb-16 section-px">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h6 className="text-brand-gold-light !mb-3">OUR PORTFOLIO</h6>
            <h2 className="!mb-2">Major Architectural Projects</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {majorProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-all duration-500 group"
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(0)}
              >
                <div className="flex items-start justify-between mb-2">
                  <BuildingOfficeIcon className="w-6 h-6 text-brand-gold-light group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs bg-brand-gold-light/10 text-brand-gold-light px-2 py-0.5 rounded-full">
                    {project.year}
                  </span>
                </div>
                <h3 className="font-bold text-xs mb-1">{project.name}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {project.locations}
                </p>
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-gold-light h-full transition-all duration-500"
                    style={{ width: activeProject === index ? "100%" : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bank Project Highlight */}
          <div className="mt-8 bg-gradient-to-r from-brand-charcoal to-black text-white p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  KASHI GOMATI SAMYUKT GRAMEEN BANK
                </h3>
                <p className="text-xs text-gray-300">
                  Successfully delivered 40+ bank models across 8 districts in
                  Uttar Pradesh
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-gold-light">
                    40+
                  </p>
                  <p className="text-xs text-gray-400">Bank Models</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-gold-light">8</p>
                  <p className="text-xs text-gray-400">Districts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-brand-gold-light">
                    2023
                  </p>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process */}
      <div>
        <OurProcess />
      </div>

      {/* Team Section */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto section-px max-w-7xl">
          {/* Header */}
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

          {/* Team */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Abhishek Vishwakarma",
                role: "Owner",
                desc: "Leading with vision",
                image:
                  "https://st5.depositphotos.com/4218696/72817/i/450/depositphotos_728179600-stock-photo-image-shows-smiling-man-standing.jpg",
              },
              {
                name: "Kajal Vishwakarma",
                role: "Architect",
                desc: "Creative excellence",
                image:
                  "https://img.freepik.com/premium-photo/happy-millennial-indian-business-lady-using-laptop-home-office_116547-79022.jpg",
              },
              {
                name: "Ramesh Prasad Vishwakarma",
                role: "Senior Advisor",
                desc: "Decades of expertise",
                image:
                  "https://img.freepik.com/free-photo/happy-indian-business-man-using-tablet-cafe_1262-3224.jpg?semt=ais_rp_50_assets&w=740&q=80",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center group"
              >
                {/* Image */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-transparent group-hover:border-brand-gold-light transition-all duration-500"></div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>

                {/* Role */}
                <h6 className="!text-brand-gold-light !text-xs !mb-2">
                  {member.role}
                </h6>

                {/* Description */}
                <p className="text-xs text-gray-500">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognized Work Section */}
      <div className="bg-bg-soft section-px pt-12 pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h6 className="text-brand-gold-light !mb-3">RECOGNITION</h6>
            <h2 className="!mb-2">Featured Work</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
            {/* Image 1 */}
            <div className="w-full lg:w-[340px] h-[220px] flex-shrink-0 overflow-hidden rounded-lg shadow">
              <img
                src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
                alt="Bank Interior"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
              />
            </div>
            {/* Image 2 */}
            <div className="w-full lg:w-[340px] h-[220px] flex-shrink-0 overflow-hidden rounded-lg shadow">
              <img
                src="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg"
                alt="Retail Store"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
              />
            </div>
            {/* Text */}
            <div className="w-full lg:w-[320px] flex-shrink-0 text-text-main text-xs leading-6 p-5 bg-white rounded-lg shadow">
              <TrophyIcon className="w-6 h-6 text-brand-gold-light mb-3" />
              <p className="mb-3">
                Our architectural designs and projects have been delivered for
                leading brands including:
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  "Union Bank",
                  "Tanishq",
                  "Nykaa",
                  "Allen Solly",
                  "Peter England",
                ].map((brand, i) => (
                  <span
                    key={i}
                    className="text-xs bg-amber-50 px-2 py-0.5 rounded-full text-brand-charcoal"
                  >
                    {brand}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-xs">
                We have successfully executed <strong>40+ bank models</strong>{" "}
                across Uttar Pradesh, establishing ImperioXcel as one of the
                most trusted architectural firms in the region.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Work in Progress */}
      <div className="bg-brand-charcoal text-white py-12 section-px">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h6 className="text-brand-gold-light !mb-1">CURRENT PROJECTS</h6>
              <h2 className="text-white !mb-0">Work in Progress</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <p className="text-white text-sm font-semibold">
                  TATA AIG LIFE INSURANCE
                </p>
                <p className="text-xs text-gray-300">Robertsgang, Sonbhadra</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <p className="text-white text-sm font-semibold">NYKAA LUX</p>
                <p className="text-xs text-gray-300">HLP Galleria, Mohali</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ & Get A Quote - Only GetAQuote has py (both) */}
      <div>
        <FAQ />
        <GetAQuote />
      </div>
    </>
  );
};

export default Architecture;
