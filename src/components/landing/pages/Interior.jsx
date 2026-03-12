import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

import { ArrowLeft, ArrowRight } from "lucide-react";
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
} from "@heroicons/react/24/outline";

/* ─────────────────────────────────────────
   DATA (Updated with PDF content)
───────────────────────────────────────── */
const sliderImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    alt: "Modern office interior",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg",
    alt: "Luxury showroom",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    alt: "Retail store design",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
    alt: "Bank interior",
  },
];

const serviceData = [
  {
    id: 1,
    title: "Renovation & Interior Detailing",
    slideFrom: "left",
    accent: "#b88a44",
    desc: "Meticulous interior detailing and seamless renovation solutions for complete transformation of your space. We handle everything from concept to completion with precision.",
    features: [
      "Interior Detailing",
      "Space Planning",
      "Material Selection",
      "Finishing Works",
      "Renovation",
      "Custom Solutions",
      "Project Management",
    ],
    img: "https://images.pexels.com/photos/1631049/pexels-photo-1631049.jpeg",
  },
  {
    id: 2,
    title: "Furniture & Accessories Procurement",
    slideFrom: "right",
    accent: "#b88a44",
    desc: "Curated furniture and accessories sourcing for perfect harmony. We select premium pieces that complement your space and reflect your style.",
    features: [
      "Custom Furniture",
      "Accessories Curation",
      "Vendor Management",
      "Quality Assurance",
      "Timely Delivery",
      "Installation",
      "After-sales Support",
    ],
    img: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
  },
  {
    id: 3,
    title: "Commercial & Retail Interiors",
    slideFrom: "left",
    accent: "#b88a44",
    desc: "Comprehensive interior solutions for retail, corporate, and financial institutions. We create spaces that enhance brand identity and customer experience.",
    features: [
      "Retail Stores",
      "Bank Branches",
      "Corporate Offices",
      "Showrooms",
      "Insurance Offices",
      "Space Planning",
      "Brand Integration",
    ],
    img: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg",
  },
];

const whyData = [
  {
    id: 1,
    title: "Experience and Expertise",
    desc: "With 7+ years of experience, we have collaborated with esteemed architects and PMC companies to successfully deliver numerous interior projects encompassing thousands of square feet.",
  },
  {
    id: 2,
    title: "Personalized Approach",
    desc: "We understand that each client has unique requirements. Our team works closely with you to understand your vision and tailor our solutions to suit your individual needs and budget.",
  },
  {
    id: 3,
    title: "Skilled & Expert Team",
    desc: "Our founders bring extensive wealth of experience, spanning decades, in the interior solutions sector. We have worked on numerous projects from luxury homes to commercial spaces.",
  },
];

const processData = [
  {
    id: 1,
    title: "Planning and Design",
    desc: "Understanding designs and drawings, allocating resources for optimal project execution. We work closely with architects to ensure every detail is perfect, from conceptual development to space planning.",
  },
  {
    id: 2,
    title: "Construction Documentation & Estimates",
    desc: "Detailed documentation, estimates, and resource planning for seamless implementation. Comprehensive project planning and budgeting with transparent communication at every stage.",
  },
  {
    id: 3,
    title: "Project Completion & Evaluation",
    desc: "Final execution, quality checks, and project delivery with client satisfaction. We ensure every aspect meets our premium standards with vigilant supervision throughout.",
  },
];

const faqData = [
  {
    q: "What types of projects do you specialize in?",
    a: "We specialize in comprehensive furnishing contracting solutions including retail stores, bank branches (40+ completed), corporate offices, insurance offices, and hospitality spaces.",
  },
  {
    q: "What is your approach to project execution?",
    a: "Our execution strategy includes understanding designs and drawings, allocating resources, meticulous material selection, procurement, and seamless execution under vigilant supervision.",
  },
  {
    q: "How do you ensure quality and safety?",
    a: "We maintain strict adherence to industry standards, provide comprehensive training and PPE to all laborers, and regularly inspect equipment to ensure highest quality and safety.",
  },
  {
    q: "What is your experience with bank projects?",
    a: "We have successfully delivered 40+ bank models for Kashi Gomati Samyukt Grameen Bank across 8 districts, plus multiple branches for Union Bank of India.",
  },
  {
    q: "Do you handle both residential and commercial projects?",
    a: "Yes, we offer complete interior solutions across retail, insurance & finance, corporate, and hospitality industries, as well as residential spaces.",
  },
  {
    q: "Who leads the team at InterioXcel?",
    a: "Our team is led by Abhishek Vishwakarma (Owner), with Kajal Vishwakarma as Architect and Ramesh Prasad Vishwakarma as Senior Advisor, bringing decades of combined experience.",
  },
  {
    q: "What is your project timeline typically?",
    a: "Timelines vary based on project scope. We provide detailed estimates and scheduling during the documentation phase, ensuring timely delivery within agreed timelines.",
  },
  {
    q: "Do you provide end-to-end services?",
    a: "Yes, we are your ultimate one-stop solution provider for all interior furnishing contracting needs, from initial design to final execution and handover.",
  },
  {
    q: "How can I get started with InterioXcel?",
    a: "Simply reach out via phone, email, or our contact form. We'll schedule an initial consultation to discuss your vision, requirements, and budget.",
  },
];

/* ─────────────────────────────────────────
   HOOK
───────────────────────────────────────── */
const useInView = (threshold = 0.15) => {
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

/* ─────────────────────────────────────────
   BLUEPRINT SVG
───────────────────────────────────────── */
const BlueprintBg = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="bp-grid"
        width="28"
        height="28"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M28 0L0 0 0 28"
          fill="none"
          stroke="#b88a44"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bp-grid)" />
  </svg>
);

/* ─────────────────────────────────────────
   SERVICE CARD
───────────────────────────────────────── */
const ServiceCard = ({ service, index }) => {
  const [ref, visible] = useInView(0.2);
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 1;
  const fromLeft = service.slideFrom === "left";

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row mb-8 overflow-hidden min-h-72 rounded-lg shadow-md ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <div
        className="w-full md:w-1/2 relative overflow-hidden cursor-pointer min-h-56 md:min-h-0"
        style={{
          transform: visible
            ? "translateX(0)"
            : fromLeft
              ? "translateX(-40px)"
              : "translateX(40px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.23,1,0.32,1), opacity 0.7s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={service.img}
          alt={service.title}
          className="w-full h-full object-cover block"
          style={{
            filter: hovered
              ? "grayscale(0%) brightness(1.05)"
              : "grayscale(50%)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "filter 0.5s ease, transform 0.5s ease",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: service.accent, opacity: hovered ? 0.15 : 0 }}
        />
      </div>

      {/* Text */}
      <div
        className="w-full md:w-1/2 bg-brand-charcoal px-5 md:px-8 py-6 md:py-8 flex flex-col justify-center"
        style={{
          transform: visible
            ? "translateX(0)"
            : fromLeft
              ? "translateX(40px)"
              : "translateX(-40px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s, opacity 0.7s ease 0.1s",
        }}
      >
        <div
          className="h-0.5 mb-4 transition-all duration-500 delay-300"
          style={{
            width: visible ? "40px" : "0px",
            background: service.accent,
          }}
        />
        <h3 className="text-white text-lg md:text-xl font-bold font-serif tracking-wide mb-2">
          {service.title}
        </h3>
        <p className="text-gray-300 text-base leading-6 font-sans mb-3">
          {service.desc}
        </p>
        <ul className="list-none p-0 m-0 space-y-1">
          {service.features.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-gray-300  font-sans"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(12px)",
                transition: `opacity 0.4s ease ${0.3 + i * 0.05}s, transform 0.4s ease ${0.3 + i * 0.05}s`,
              }}
            >
              <span
                className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-white font-bold "
                style={{ background: service.accent }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   OUR SERVICES
───────────────────────────────────────── */
const OurServices = () => (
  <div className="bg-bg-soft pt-12 md:pt-14">
    <div className="text-center mb-8 section-px">
      <h6 className="text-brand-gold-light">What We Do</h6>
      <h2 className="!mt-2">Our Interior Services</h2>
      <div className="w-10 h-0.5 bg-brand-gold-light mx-auto mt-3 rounded" />
    </div>
    <div className="section-px">
      <div className="max-w-5xl mx-auto">
        {serviceData.map((s, i) => (
          <ServiceCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   WHY CHOOSE US
───────────────────────────────────────── */
const WhyCard = ({ item, delay }) => {
  const [ref, visible] = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-1 relative overflow-hidden px-5 md:px-6 py-8 border border-gray-200 cursor-default text-center transition-colors duration-400 rounded-lg"
      style={{
        background: hovered ? "#1a1f26" : "#ffffff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, background 0.3s ease`,
      }}
    >
      <BlueprintBg />
      <div className="relative z-10">
        <div className="w-14 h-14 mx-auto mb-3 bg-brand-gold-light/10 rounded-lg flex items-center justify-center">
          {item.id === 1 && (
            <BuildingOfficeIcon className="w-7 h-7 text-brand-gold-light" />
          )}
          {item.id === 2 && (
            <UserGroupIcon className="w-7 h-7 text-brand-gold-light" />
          )}
          {item.id === 3 && (
            <SparklesIcon className="w-7 h-7 text-brand-gold-light" />
          )}
        </div>
        <h3
          className="text-base md:text-base font-bold font-sans mb-2 tracking-tight transition-colors duration-300"
          style={{ color: hovered ? "#fff" : "#1a1f26" }}
        >
          {item.title}
        </h3>
        <p
          className=" md:text-base leading-relaxed font-sans transition-colors duration-300"
          style={{ color: hovered ? "#bbb" : "#666" }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
};

const WhyChooseUs = () => (
  <div className="bg-white pt-10 pb-8 section-px">
    <div className="text-center mb-8">
      <h6 className="text-brand-gold-light">Why Us</h6>
      <h2 className="!mt-2">Why Choose InterioXcel</h2>
      <div className="w-10 h-0.5 bg-brand-gold-light mx-auto mt-3 rounded" />
    </div>
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {whyData.map((item, i) => (
          <WhyCard key={item.id} item={item} delay={i * 0.1} />
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   OUR PROCESS
───────────────────────────────────────── */
const ProcessCard = ({ item, delay, onHoverChange }) => {
  const [ref, visible] = useInView(0.15);
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    onHoverChange && onHoverChange(true);
  };
  const handleLeave = () => {
    setHovered(false);
    onHoverChange && onHoverChange(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="flex-1 relative px-5 md:px-6 py-6 md:py-7 border border-gray-200 rounded-lg cursor-default transition-all duration-300"
      style={{
        background: hovered ? "#1a1f26" : "#f7f7f7",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, background 0.3s ease, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.1)"
          : "0 1px 3px rgba(0,0,0,0.02)",
      }}
    >
      <div className="w-10 h-10 mb-3 bg-brand-gold-light/10 rounded-lg flex items-center justify-center">
        <span className="text-lg font-bold text-brand-gold-light">
          {item.id}
        </span>
      </div>
      <h3
        className="text-base md:text-base font-bold font-sans mb-2 leading-snug transition-colors duration-300"
        style={{ color: hovered ? "#fff" : "#1a1f26" }}
      >
        {item.title}
      </h3>
      <p
        className=" md:text-base leading-relaxed font-sans transition-colors duration-300"
        style={{ color: hovered ? "#bbb" : "#666" }}
      >
        {item.desc}
      </p>
    </div>
  );
};

const ProcessArrow = ({ leftHovered, rightHovered }) => {
  const active = leftHovered || rightHovered;
  return (
    <div
      className="shrink-0 w-8 md:w-10 flex items-center justify-center transition-transform duration-300"
      style={{ transform: active ? "translateX(3px)" : "translateX(0)" }}
    >
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
        <path
          d="M10 30 C10 18, 22 14, 34 14 L30 8 M34 14 L30 20"
          stroke={active ? "#b88a44" : "#bbb"}
          strokeWidth={active ? "2.5" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
        />
      </svg>
    </div>
  );
};

const OurProcess = () => {
  const [ref, visible] = useInView(0.1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bg-white pt-12 pb-14 md:pt-14 md:pb-16 section-px">
      <div className="text-center mb-8 md:mb-10">
        <h6 className="text-brand-gold-light">How We Work</h6>
        <h2 className="!mt-2">Our Execution Strategy</h2>
        <div className="w-10 h-0.5 bg-brand-gold-light mx-auto mt-3 rounded" />
      </div>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
          {processData.map((item, i) => (
            <React.Fragment key={item.id}>
              <ProcessCard
                item={item}
                delay={i * 0.15}
                onHoverChange={(h) => setHoveredIndex(h ? i : null)}
              />
              {i < processData.length - 1 && (
                <ProcessArrow
                  leftHovered={hoveredIndex === i}
                  rightHovered={hoveredIndex === i + 1}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAJOR PROJECTS SHOWCASE
───────────────────────────────────────── */
const MajorProjects = () => {
  const [ref, visible] = useInView(0.1);

  const projects = [
    { name: "UNION BANK OF INDIA", locations: "8 Branches", count: 8 },
    {
      name: "KASHI GOMATI GRAMEEN BANK",
      locations: "40 Models in 8 Districts",
      count: 40,
    },
    { name: "TANISHQ SHOWROOM", locations: "Varanasi", count: 1 },
    { name: "NYKAA", locations: "Haldwani", count: 1 },
    { name: "ALLEN SOLLY", locations: "Rourkela", count: 2 },
    { name: "PETER ENGLAND", locations: "Darbhanga", count: 1 },
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50/30 to-white pt-12 pb-14 md:pt-14 md:pb-16 section-px">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h6 className="text-brand-gold-light">Our Portfolio</h6>
          <h2 className="!mt-2">Major Projects</h2>
          <div className="w-10 h-0.5 bg-brand-gold-light mx-auto mt-3 rounded" />
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow border border-gray-100 text-center hover:shadow-md transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
              }}
            >
              <BuildingStorefrontIcon className="w-8 h-8 mx-auto text-brand-gold-light mb-2" />
              <h3 className="font-bold  mb-1">{project.name}</h3>
              <p className=" text-gray-500 mb-2">{project.locations}</p>
              <span className=" bg-brand-gold-light/10 text-brand-gold-light px-2 py-1 rounded-full">
                {project.count} Location{project.count > 1 ? "s" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   WORK IN PROGRESS
───────────────────────────────────────── */
const WorkInProgress = () => {
  const [ref, visible] = useInView(0.1);

  const currentProjects = [
    { name: "TATA AIG LIFE INSURANCE", location: "Robertsgang, Sonbhadra" },
    { name: "NYKAA LUX", location: "HLP Galleria, Mohali, Chandigarh" },
  ];

  return (
    <div className="bg-brand-charcoal text-white py-12 section-px">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h6 className="text-brand-gold-light !mb-1">
              CURRENTLY WORKING ON
            </h6>
            <h2 className="text-white !mb-0">Work in Progress</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {currentProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.5s ease ${0.15 + index * 0.1}s, transform 0.5s ease ${0.15 + index * 0.1}s`,
                }}
              >
                <p className="text-white text-base font-semibold">
                  {project.name}
                </p>
                <p className=" text-gray-300">{project.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   QUALITY & SAFETY
───────────────────────────────────────── */
const QualitySafety = () => {
  const [ref, visible] = useInView(0.1);

  const items = [
    {
      icon: ShieldCheckIcon,
      title: "PPE Equipment",
      desc: "Full protective gear for all laborers",
    },
    {
      icon: CheckCircleIcon,
      title: "Regular Inspections",
      desc: "Daily safety checks and audits",
    },
    {
      icon: WrenchScrewdriverIcon,
      title: "Equipment Maintenance",
      desc: "Regular servicing of all tools",
    },
    {
      icon: UserGroupIcon,
      title: "Team Training",
      desc: "Comprehensive safety training",
    },
  ];

  return (
    <div className="pt-12 pb-14 md:pt-14 md:pb-16 section-px bg-white">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-8">
          <div
            className="lg:w-1/2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <h6 className="text-brand-gold-light !mb-3">OUR COMMITMENT</h6>
            <h2 className="!mb-4">
              Quality & Safety{" "}
              <span className="text-brand-gold-light">First</span>
            </h2>
            <div className="w-16 h-[2px] bg-brand-gold-light mb-6" />
            <p className="text-gray-600 !mb-4">
              At our construction site, quality and safety are our top
              priorities for all laborers involved in interior work. We maintain
              strict adherence to industry standards and regulations to ensure
              the highest quality of craftsmanship and safety for our team.
            </p>
            <p className="text-gray-500 !mb-0">
              We provide comprehensive training, personal protective equipment
              (PPE), and regularly inspect and maintain equipment to mitigate
              risks. Your well-being and the quality of our work are
              non-negotiable commitments.
            </p>
          </div>

          <div
            className="lg:w-1/2 grid grid-cols-2 gap-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(20px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-amber-50/50 p-4 rounded-lg text-center"
                >
                  <Icon className="w-8 h-8 mx-auto text-brand-gold-light mb-2" />
                  <h4 className="font-bold  mb-1">{item.title}</h4>
                  <p className=" text-gray-500">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */
const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(index === 0);
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="border-b border-stone-200"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.4s ease ${index * 0.03}s, transform 0.4s ease ${index * 0.03}s`,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex justify-between items-center py-3 md:py-4 bg-transparent border-none cursor-pointer text-left gap-3"
      >
        <span className="text-base md:text-base font-semibold font-serif leading-snug">
          {item.q}
        </span>
        <span
          className="shrink-0 w-6 h-6 rounded-full border-2 border-brand-gold-light flex items-center justify-center transition-all duration-300"
          style={{
            color: open ? "#fff" : "#b88a44",
            background: open ? "#b88a44" : "transparent",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <span className="leading-none text-base -mt-px">+</span>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-400"
        style={{ maxHeight: open ? "200px" : "0" }}
      >
        <p className=" leading-6 pb-4 pr-8">{item.a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [ref, visible] = useInView(0.1);
  return (
    <div className="bg-bg-soft pt-12 pb-14 md:pt-14 md:pb-16 section-px">
      <div className="max-w-2xl mx-auto">
        <div
          ref={ref}
          className="text-center mb-8 md:mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <h6 className="text-brand-gold-light !mb-2">FAQ</h6>
          <h2 className="!mb-2">Frequently Asked Questions</h2>
          <div className="w-10 h-0.5 bg-brand-gold-light mx-auto rounded" />
        </div>
        <div>
          {faqData.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   GET A QUOTE - Only section with py (both)
───────────────────────────────────────── */
const GetAQuote = () => {
  const [ref, visible] = useInView(0.1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = () => {
    if (form.name && form.email) setSent(true);
  };

  const contacts = [
    {
      icon: MapPinIcon,
      label: "Office",
      lines: ["Coraut Bazar Kotwa Lohata", "Varanasi - 221107"],
    },
    {
      icon: PhoneIcon,
      label: "Call",
      lines: ["+91-6393556220", "+91-9935550330"],
    },
    {
      icon: EnvelopeIcon,
      label: "Email",
      lines: ["info@interioxcel.com"],
    },
  ];

  const inputCls =
    "w-full border-0 border-b border-gray-300 pb-2 pt-2 text-base font-sans bg-transparent outline-none focus:border-brand-gold-light transition-colors duration-200";
  const labelCls =
    "block  tracking-widest text-text-main/60 font-sans uppercase mb-1";

  return (
    <div className="bg-white section-px py-8">
      <div
        ref={ref}
        className="max-w-5xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2 className="text-center text-2xl md:text-3xl font-bold font-sans mb-2">
          GET A QUOTE
        </h2>
        <div className="w-10 h-0.5 bg-brand-gold-light mx-auto mb-8" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          {/* Contact Info */}
          <div className="w-full md:w-64 md:shrink-0 space-y-6 md:space-y-8">
            {contacts.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 md:gap-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-16px)",
                    transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
                  }}
                >
                  <div className="shrink-0 mt-0.5 text-brand-gold-light">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className=" font-bold font-sans mb-1">
                      {c.label}
                    </p>
                    {c.lines.map((l, j) => (
                      <p
                        key={j}
                        className=" text-text-main/70 font-sans leading-5 m-0"
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="flex-1 w-full">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3 text-brand-gold-light">✓</div>
                <h3 className="font-sans font-semibold mb-2 text-base">
                  Message Sent!
                </h3>
                <p className="text-text-main/70 font-sans ">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { name: "name", label: "YOUR NAME *", type: "text" },
                  { name: "email", label: "YOUR EMAIL *", type: "email" },
                  { name: "phone", label: "YOUR PHONE", type: "tel" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className={labelCls}>{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={form[f.name]}
                      onChange={onChange}
                      className={inputCls}
                    />
                  </div>
                ))}
                <div>
                  <label className={labelCls}>PROJECT DETAILS...</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={4}
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <button
                  onClick={onSubmit}
                  className="btn-primary bg-brand-gold-light hover:bg-brand-gold text-white !px-6 !py-2.5"
                >
                  SEND MESSAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN INTERIOR COMPONENT
───────────────────────────────────────── */
export const Interior = () => {
  const [current, setCurrent] = useState(0);
  const total = sliderImages.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);
  const leftImg = sliderImages[current];
  const rightImg = sliderImages[(current + 1) % total];

  return (
    <div className="bg-stone-50">
      <div className="w-full relative">
        <img
          src="https://images.pexels.com/photos/3741314/pexels-photo-3741314.jpeg"
          alt="Interior hero"
          className="w-full object-cover block max-h-80 md:max-h-120"
        />
        <div className="absolute inset-0  bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mt-30 mx-auto section-px">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">
                  Interior Services
                </h6>
              </div>

              <h1 className="text-white !mb-2">
                Complete <span className="text-brand-gold-light">Interior</span>{" "}
                Design & Execution
              </h1>

              <p className="text-gray-200 !mb-0">
                We provide comprehensive interior solutions including space
                planning, custom furniture, modular installations, and full
                turnkey execution for residential, commercial, and retail
                environments.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Intro Text ── */}
      <div className="mt-8 md:mt-10 section-px">
        <div className="max-w-6xl mx-auto">
          <h1 className="!mb-3">Interior Design Excellence</h1>
          <p className="text-gray-600 !mb-0">
            <strong className="text-brand-charcoal">
              Combining art and science to deliver premium interior design
              solutions.
            </strong>
            <br />
            <br />
            At InterioXcel, we offer a complete range of interior solutions
            including renovation, intricate interior detailing, meticulous
            material selection and finishing, procurement of furniture and
            accessories, specification management, budgeting, and seamless
            execution, all under vigilant supervision. Our diverse range of
            services caters to retail, insurance & finance, corporate, and
            hospitality industries.
            <br />
            <br />
            As leading interior contractors, we have successfully delivered
            numerous interior projects encompassing thousands of square feet.
            Our team works closely with esteemed architects and PMC companies to
            ensure every project meets the highest standards of quality and
            excellence. From conceptual development to final execution, we
            manage every aspect with precision and dedication.
          </p>
        </div>
      </div>

      {/* ── Image Slider ── */}
      <div className="section-px mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center w-full py-8 md:py-10 bg-white gap-2 select-none rounded-lg shadow-sm">
            <button
              onClick={prev}
              className="shrink-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-white border border-stone-200 shadow-sm cursor-pointer hover:bg-stone-50 transition-colors rounded-full"
              aria-label="Previous"
            >
              <ArrowLeft size={14} color="#555" />
            </button>
            <div className="flex gap-2 md:gap-3 w-full max-w-xs md:max-w-4xl">
              <div
                className="w-1/2 overflow-hidden bg-gray-200 rounded-md"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  key={leftImg.id + "-l"}
                  src={leftImg.src}
                  alt={leftImg.alt}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div
                className="w-1/2 overflow-hidden bg-gray-200 rounded-md"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  key={rightImg.id + "-r"}
                  src={rightImg.src}
                  alt={rightImg.alt}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <button
              onClick={next}
              className="shrink-0 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-white border border-stone-200 shadow-sm cursor-pointer hover:bg-stone-50 transition-colors rounded-full"
              aria-label="Next"
            >
              <ArrowRight size={14} color="#555" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Why Work With Us ── */}
      <div className="section-px mt-10 md:mt-14">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-light text-2xl md:text-3xl !mb-2">
            Why Work With Us
          </h2>
          <p className="text-base md:text-base leading-7 text-brand-charcoal font-semibold mb-2 italic">
            "We shape our spaces, and then, our spaces shape us."
          </p>
          <p className="text-gray-600 !mb-0">
            At InterioXcel, we offer customized interior solutions and devoted
            customer care with personal assistance. With assured convenience and
            end-to-end interior design solutions, we let you move right into
            your dream space. We have created some of the most unique interiors
            — retail stores, bank branches, corporate offices, and commercial
            spaces. Our team of skilled architects and interior designers plan,
            research, manage and coordinate every aspect of the design, adding
            your vision combined with our creativity to accomplish the task
            magnificently within time.
          </p>
        </div>
      </div>

      {/* ── Sections ── */}
      <OurServices />
      <MajorProjects />
      <WhyChooseUs />
      <OurProcess />
      <WorkInProgress />
      <QualitySafety />
      <FAQ />
      <GetAQuote />
    </div>
  );
};

export {
  FAQ,
  OurServices,
  GetAQuote,
  OurProcess,
  WhyChooseUs,
  MajorProjects,
  WorkInProgress,
  QualitySafety,
};
export default Interior;
