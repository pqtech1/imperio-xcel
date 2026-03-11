import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  SwatchIcon,
  CubeIcon,
  Squares2X2Icon,
  UserGroupIcon,
  SparklesIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  TrophyIcon,
  BriefcaseIcon,
  StarIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { FAQ, GetAQuote } from "./Interior";

const images = [
  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
  "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg",
  "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
  "https://images.pexels.com/photos/279607/pexels-photo-279607.jpeg",
  "https://images.pexels.com/photos/1631049/pexels-photo-1631049.jpeg",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
];

const turnkeyBenefits = [
  {
    icon: ClockIcon,
    title: "Time Management",
    desc: "Your turnkey solution provider gives stipulated time period. You just have to track that timeline and receive daily updates from a single source every time.",
  },
  {
    icon: CurrencyRupeeIcon,
    title: "Budget Control",
    desc: "Easily manage your budgets and payments. A dedicated person from our team handles all expenditure, sticks to the budget, and provides a single window for payments.",
  },
  {
    icon: UserGroupIcon,
    title: "Expert Team",
    desc: "Our team of experts maintains contacts with high-quality suppliers and ensures premium materials are sourced for your project.",
  },
  {
    icon: ChartBarIcon,
    title: "Single Point of Contact",
    desc: "Clear communication with one point of contact, proper guidance, and dedicated project management throughout the execution.",
  },
];

const projectPhases = [
  {
    phase: "Phase 1",
    title: "Planning & Design",
    desc: "Understanding designs and drawings, allocating resources for optimal project execution. We work closely with architects to ensure every detail is perfect.",
    icon: DocumentTextIcon,
  },
  {
    phase: "Phase 2",
    title: "Documentation & Estimates",
    desc: "Detailed documentation, estimates, and resource planning for seamless implementation. Comprehensive project planning and transparent budgeting.",
    icon: ChartBarIcon,
  },
  {
    phase: "Phase 3",
    title: "Procurement & Execution",
    desc: "Material selection, furniture procurement, and seamless execution under vigilant supervision. We manage all vendors and suppliers.",
    icon: WrenchScrewdriverIcon,
  },
  {
    phase: "Phase 4",
    title: "Completion & Handover",
    desc: "Final execution, quality checks, and project delivery with client satisfaction. We ensure every aspect meets our premium standards.",
    icon: CheckCircleIcon,
  },
];

const completedProjects = [
  { name: "UNION BANK OF INDIA", type: "Bank Branches", count: 8 },
  { name: "KASHI GOMATI GRAMEEN BANK", type: "Bank Models", count: 40 },
  { name: "TANISHQ SHOWROOM", type: "Retail", count: 1 },
  { name: "NYKAA", type: "Retail Store", count: 1 },
  { name: "ALLEN SOLLY", type: "Retail", count: 2 },
  { name: "PETER ENGLAND", type: "Retail", count: 1 },
];

const Turnkey = () => {
  const [current, setCurrent] = useState(0);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const timerRef = useRef(null);

  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(timerRef.current);
  }, []);

  const prev = () => {
    clearInterval(timerRef.current);
    setCurrent((p) => (p - 1 + images.length) % images.length);
    startAutoPlay();
  };

  const next = () => {
    clearInterval(timerRef.current);
    setCurrent((p) => (p + 1) % images.length);
    startAutoPlay();
  };

  const img1 = images[current % images.length];
  const img2 = images[(current + 1) % images.length];

  return (
    <>
      {/* Hero Section with Gradient Overlay */}
      <div className="w-full relative">
        <img
          className="w-full object-cover h-64 sm:h-72 md:h-80 lg:h-120"
          src="https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg"
          alt="Turnkey Interior Solutions"
        />
        <div className="absolute inset-0  bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mt-25 mx-auto section-px">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">
                  TURNKEY SOLUTIONS
                </h6>
              </div>
              <h1 className="text-white !mb-2">
                Complete Turnkey{" "}
                <span className="text-brand-gold-light">Interior</span>{" "}
                Solutions
              </h1>
              <p className="text-gray-200 !mb-0">
                End-to-end project management from concept to completion –
                hassle-free, cost-effective, and delivered on time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Turnkey Content */}
      <div className="section-px mt-10 md:mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Introduction Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3"
            >
              <h6 className="text-brand-gold-light !mb-3">WHAT IS TURNKEY?</h6>
              <h2 className="!mb-4">
                Complete Interior Solutions Under One Roof
              </h2>
              <div className="w-16 h-[2px] bg-brand-gold-light mb-4" />
              <p className="text-gray-600 !mb-3">
                <strong>
                  ImperioXcel provides best turnkey interior solutions.
                </strong>{" "}
                This type of solution is easy, effective, and cost-friendly for
                homes, offices, retail sectors, and commercial spaces.
              </p>
              <p className="text-gray-600 !mb-0">
                A turnkey design solution is a comprehensive approach where only
                one contractor handles and looks after the entire interior
                design solution from initial to final stage. This in turn
                lessens the level of stress and work involvement for the owner,
                providing a seamless experience from concept to completion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/3 bg-gradient-to-br from-amber-50 to-white p-6 rounded-lg shadow border border-gray-100"
            >
              <TrophyIcon className="w-8 h-8 text-brand-gold-light mb-3" />
              <h3 className="text-lg font-bold mb-2">Why Choose Turnkey?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Single point of contact
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Better budget control
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Timely delivery guaranteed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Expert vendor management
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Image Slider - Premium Version */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full mb-12"
          >
            <div className="flex gap-3 overflow-hidden rounded-lg shadow-xl">
              <div className="w-1/2 h-56 sm:h-64 md:h-80 overflow-hidden flex-shrink-0 relative group">
                <img
                  src={img1}
                  alt="Turnkey Interior 1"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="w-1/2 h-56 sm:h-64 md:h-80 overflow-hidden flex-shrink-0 relative group">
                <img
                  src={img2}
                  alt="Turnkey Interior 2"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-brand-charcoal w-8 h-8 flex items-center justify-center shadow hover:bg-brand-gold-light hover:text-white transition-all duration-300 z-10 text-lg rounded-full"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-brand-charcoal w-8 h-8 flex items-center justify-center shadow hover:bg-brand-gold-light hover:text-white transition-all duration-300 z-10 text-lg rounded-full"
              aria-label="Next"
            >
              ›
            </button>

            {/* Slide Indicators */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.slice(0, 4).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    clearInterval(timerRef.current);
                    setCurrent(index);
                    startAutoPlay();
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    current % images.length === index
                      ? "w-4 bg-brand-gold-light"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-3">
                WHY CHOOSE TURNKEY
              </h6>
              <h2 className="!mb-2">Benefits of Turnkey Interior Solutions</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {turnkeyBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    onMouseEnter={() => setHoveredBenefit(index)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                    className="relative group"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-brand-gold-light/10 to-transparent rounded-lg transition-opacity duration-500 ${
                        hoveredBenefit === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div className="relative bg-white p-5 rounded-lg shadow border border-gray-100 flex items-start gap-3">
                      <div
                        className={`w-10 h-10 bg-brand-gold-light/10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${
                          hoveredBenefit === index
                            ? "scale-105 bg-brand-gold-light"
                            : ""
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 transition-colors duration-500 ${
                            hoveredBenefit === index
                              ? "text-white"
                              : "text-brand-gold-light"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Two column text section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-5 rounded-lg shadow border border-gray-100"
            >
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-brand-gold-light" />
                Why You Should Go for Turnkey
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-3">
                As it is the best option for your interior design project.
                Whether you are starting a new project or simply applying
                modifications to the current one, our turnkey solution provides:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Expert consultation on design ideas and requirements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Personalized solutions tailored to your needs
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Complete project management from start to finish
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Quality assurance at every stage
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-5 rounded-lg shadow border border-gray-100"
            >
              <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-brand-gold-light" />
                Common Misconceptions
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-3">
                One of the most seen misconceptions is that property owners
                sometimes don't get the freedom to express themselves. But in
                reality:
              </p>
              <div className="bg-amber-50/50 p-4 rounded-lg mb-3">
                <p className="text-gray-700 text-xs italic">
                  "Turnkey projects are becoming more popular than self-managed
                  projects due to clear communication, one point of contact,
                  proper guidance, and dedication."
                </p>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <SparklesIcon className="w-3.5 h-3.5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Full creative freedom with expert guidance
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <SparklesIcon className="w-3.5 h-3.5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600">
                    Regular updates and transparent communication
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Project Phases */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <h6 className="text-brand-gold-light !mb-3">OUR PROCESS</h6>
              <h2 className="!mb-2">Turnkey Project Phases</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {projectPhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="relative"
                  >
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-100 h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-brand-gold-light/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-brand-gold-light" />
                        </div>
                        <span className="text-xs font-semibold text-brand-gold-light tracking-wider">
                          {phase.phase}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm mb-2">{phase.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                    {index < projectPhases.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 text-brand-gold-light text-base">
                        →
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Completed Projects Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-brand-charcoal to-black text-white p-6 rounded-lg mb-12"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold mb-1">
                Completed Turnkey Projects
              </h3>
              <p className="text-xs text-gray-400">
                Delivered with excellence across India
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {completedProjects.map((project, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl font-bold text-brand-gold-light mb-1">
                    {project.count}+
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    {project.type}
                  </div>
                  <div className="text-xs font-semibold">{project.name}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom full-width image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-56 sm:h-64 md:h-72 overflow-hidden rounded-lg shadow-xl mb-10 group"
          >
            <img
              src="https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg"
              alt="Turnkey Interior Project"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center bg-gradient-to-r from-amber-50 to-white p-6 rounded-lg border border-gray-100 mb-6"
          >
            <h3 className="text-lg font-bold mb-3">
              Ready for a Hassle-Free Interior Experience?
            </h3>
            <p className="text-gray-600 text-xs mb-4 max-w-2xl mx-auto">
              Let us handle your entire interior project from start to finish.
              Contact us for a free consultation.
            </p>
            <button className="btn-primary bg-brand-gold-light hover:bg-brand-gold text-white !px-6 !py-2.5 inline-flex items-center gap-2">
              Get a Free Quote
              <span className="text-base">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* FAQ & Get A Quote */}
      <div>
        <FAQ />
        <GetAQuote />
      </div>
    </>
  );
};

export default Turnkey;
