import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BuildingOfficeIcon,
  UserIcon,
  UsersIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon,
  BriefcaseIcon,
  TrophyIcon,
  ShieldCheckIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const milestones = [
    {
      year: "2017",
      title: "Company Founded",
      desc: "Established by Mrs. Meera Ramesh Vishwakarma in Varanasi",
    },
    {
      year: "2019",
      title: "Expansion",
      desc: "Expanded operations to multiple districts in Uttar Pradesh",
    },
    {
      year: "2021",
      title: "40+ Bank Models",
      desc: "Completed Kashi Gomati Samyukt Grameen Bank project across 8 districts",
    },
    {
      year: "2024",
      title: "New Leadership",
      desc: "Abhishek Vishwakarma takes forward the legacy",
    },
  ];

  const values = [
    {
      icon: HeartIcon,
      title: "Honesty",
      desc: "Adherence to values and principles of honesty and transparency",
    },
    {
      icon: SparklesIcon,
      title: "Perfection",
      desc: "Attention to every detail in interior craftsmanship",
    },
    {
      icon: UserGroupIcon,
      title: "Teamwork",
      desc: "Working tirelessly together towards assured results",
    },
    {
      icon: EyeIcon,
      title: "Vision",
      desc: "To be among the top of our field in interior design",
    },
  ];

  const team = [
    {
      name: "Abhishek Vishwakarma",
      role: "Owner",
      desc: "Leading with vision and dedication since 2024",
      icon: UserIcon,
    },
    {
      name: "Kajal Vishwakarma",
      role: "Architect",
      desc: "Creative excellence in interior solutions",
      icon: SparklesIcon,
    },
    {
      name: "Ramesh Prasad Vishwakarma",
      role: "Senior Advisor",
      desc: "Decades of expertise in the industry",
      icon: UserGroupIcon,
    },
  ];

  const stats = [
    { icon: CalendarIcon, value: "7+", label: "Years of Excellence" },
    { icon: BriefcaseIcon, value: "50+", label: "Projects Completed" },
    { icon: BuildingOfficeIcon, value: "40+", label: "Bank Models" },
    { icon: TrophyIcon, value: "100%", label: "Client Satisfaction" },
  ];

  const expertise = [
    { area: "Retail Industry", projects: "15+", icon: BuildingOfficeIcon },
    {
      area: "Insurance & Finance",
      projects: "40+ Branches",
      icon: ShieldCheckIcon,
    },
    {
      area: "Corporate Industry",
      projects: "20+ Offices",
      icon: BriefcaseIcon,
    },
    {
      area: "Hospitality Industry",
      projects: "10+ Properties",
      icon: StarIcon,
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-[90vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2029665/pexels-photo-2029665.jpeg"
            alt="About ImperioXcel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto section-px">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-brand-gold-light" />
                <h6 className="!text-brand-gold-light !mb-0">EST. 2017</h6>
              </div>
              <h1 className="text-white !mb-4">
                Crafting Spaces,
                <br />
                Creating <span className="text-brand-gold-light">Legacies</span>
              </h1>
              <p className="text-gray-300 !mb-0">
                A comprehensive furnishing contracting solutions organization
                dedicated to excellence in interior design.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest"
        >
          SCROLL
        </motion.div>
      </section>

      {/* HONEYBEE PHILOSOPHY SECTION */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto section-px">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h6 className="!text-brand-gold-light">OUR INSPIRATION</h6>
              <h2>
                The Honeybee{" "}
                <span className="text-brand-gold-light">Philosophy</span>
              </h2>
              <div className="w-16 h-[2px] bg-brand-gold-light mb-6" />

              <p className="text-gray-600 italic !mb-6">
                "Honeybees are a symbol of hard work, dedication, perfection,
                focus, and teamwork. They work tirelessly towards achieving
                their desired goal of constructing their divine abode within the
                desired time and towards assured results."
              </p>

              <div className="grid grid-cols-2 gap-4">
                {values.slice(0, 2).map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-gold-light/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-brand-gold-light" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{value.title}</h4>
                        <p className="text-xs text-gray-500">{value.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="grid grid-cols-2 gap-4">
                {values.slice(2, 4).map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="bg-amber-50/50 p-4 rounded-lg">
                      <div className="w-10 h-10 bg-brand-gold-light/10 rounded-lg flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-brand-gold-light" />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{value.title}</h4>
                      <p className="text-xs text-gray-500">{value.desc}</p>
                    </div>
                  );
                })}

                {/* Founder's Quote */}
                <div className="col-span-2 bg-brand-charcoal text-white p-6 rounded-lg mt-2">
                  <p className="text-white text-base font-light italic mb-3">
                    "Adherence to values and principles of honesty and
                    transparency"
                  </p>
                  <h6 className="!text-brand-gold-light !text-xs !mb-0">
                    — Mrs. Meera Ramesh Vishwakarma, Founder
                  </h6>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="pt-16 pb-12 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="container mx-auto section-px">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 order-2 lg:order-1"
            >
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/5379178/pexels-photo-5379178.jpeg"
                  alt="Our Story"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-xl max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-brand-gold-light/10 flex items-center justify-center">
                      <BuildingOfficeIcon className="w-4 h-4 text-brand-gold-light" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">50+</p>
                      <p className="text-xs text-gray-500">
                        Projects Delivered
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-gold-light/10 flex items-center justify-center">
                      <MapPinIcon className="w-4 h-4 text-brand-gold-light" />
                    </div>
                    <div>
                      <p className="text-xl font-bold">8+</p>
                      <p className="text-xs text-gray-500">Districts Covered</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 order-1 lg:order-2"
            >
              <h6 className="!text-brand-gold-light">OUR JOURNEY</h6>
              <h2>
                A Legacy of{" "}
                <span className="text-brand-gold-light">Excellence</span>
              </h2>
              <div className="w-16 h-[2px] bg-brand-gold-light mb-6" />

              <p className="!mb-4">
                ImperioXcel, established by{" "}
                <span className="font-semibold">
                  Mrs. Meera Ramesh Vishwakarma
                </span>{" "}
                in 2017, is dedicated to creating comprehensive furnishing
                contracting solutions within the interior design industry. Our
                founders bring extensive wealth of experience, spanning decades,
                in the interior solutions sector.
              </p>

              <p className="!mb-6">
                Having collaborated with esteemed architects and PMC companies,
                we've successfully delivered numerous interior projects
                encompassing thousands of square feet. Today, under the
                leadership of
                <span className="font-semibold"> Abhishek Vishwakarma</span>, we
                continue our commitment to excellence.
              </p>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <EyeIcon className="w-6 h-6 text-brand-gold-light mb-2" />
                  <h4 className="font-bold text-sm mb-1">Our Vision</h4>
                  <p className="text-xs text-gray-500">
                    To be among the top of our field in interior design
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <EyeIcon className="w-6 h-6 text-brand-gold-light mb-2" />
                  <h4 className="font-bold text-sm mb-1">Our Mission</h4>
                  <p className="text-xs text-gray-500">
                    To be professional and committed in achieving client quality
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto section-px">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h6 className="!text-brand-gold-light">OUR MILESTONES</h6>
            <h2>The Journey So Far</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-3 bg-brand-gold-light/10 rounded-full flex items-center justify-center">
                      <h6 className="!text-brand-gold !text-sm !mb-0">
                        {milestone.year}
                      </h6>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                      <h4 className="font-bold text-sm mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-gray-500">{milestone.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23b88a44'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container mx-auto section-px relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-14 h-14 mx-auto mb-3 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-brand-gold-light transition-colors duration-500">
                    <Icon className="w-6 h-6 text-brand-gold-light group-hover:text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-brand-gold-light mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERTISE AREAS */}
      <section className="pt-16 pb-12 bg-gradient-to-b from-white to-amber-50/30">
        <div className="container mx-auto section-px">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h6 className="!text-brand-gold-light">AREAS OF EXPERTISE</h6>
            <h2>Industries We Serve</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow border border-gray-100 text-center group hover:shadow-md transition-all duration-500"
                >
                  <div className="w-14 h-14 mx-auto mb-3 bg-brand-gold-light/10 rounded-lg flex items-center justify-center group-hover:bg-brand-gold-light transition-colors duration-500">
                    <Icon className="w-6 h-6 text-brand-gold-light group-hover:text-white" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{item.area}</h4>
                  <h6 className="!text-brand-gold !text-xs !mb-0">
                    {item.projects}
                  </h6>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAJOR PROJECTS HIGHLIGHT */}
      <section className="pt-16 pb-12 bg-white">
        <div className="container mx-auto section-px">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h6 className="!text-brand-gold-light">KEY PROJECTS</h6>
            <h2>Trusted by Leading Brands</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-brand-gold-light to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "UNION BANK",
              "TANISHQ",
              "NYKAA",
              "ALLEN SOLLY",
              "PETER ENGLAND",
              "U.S. POLO",
            ].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-amber-50/50 p-4 rounded-lg text-center border border-gray-100 hover:border-brand-gold-light transition-colors duration-300"
              >
                <p className="font-semibold text-xs">{brand}</p>
              </motion.div>
            ))}
          </div>

          {/* Bank Project Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 bg-gradient-to-r from-brand-charcoal to-black text-white p-6 rounded-lg"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold mb-1">
                  KASHI GOMATI SAMYUKT GRAMEEN BANK
                </h3>
                <p className="text-xs text-gray-300">
                  Successfully delivered 40+ bank models across 8 districts
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-gold-light">40+</p>
                  <p className="text-xs text-gray-400">Bank Models</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-gold-light">8</p>
                  <p className="text-xs text-gray-400">Districts</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
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

      {/* WORK IN PROGRESS */}
      <section className="py-10 bg-brand-charcoal text-white">
        <div className="container mx-auto section-px">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h6 className="!text-brand-gold-light !mb-1">
                CURRENTLY WORKING ON
              </h6>
              <h3 className="text-lg font-bold">Work in Progress</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <p className="text-white text-sm font-semibold">TATA AIG LIFE INSURANCE</p>
                <p className="text-white text-xs text-gray-300">Robertsgang, Sonbhadra</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20">
                <p className="text-white text-sm font-semibold">NYKAA LUX</p>
                <p className="text-white text-xs text-gray-300">HLP Galleria, Mohali</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA - Only section with py (both top and bottom) */}
      <section className="py-8 bg-white">
        <div className="container mx-auto section-px">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="!mb-4">
                Let's Create Something{" "}
                <span className="text-brand-gold-light">Amazing Together</span>
              </h2>
              <p className="text-gray-600 !mb-6 max-w-2xl mx-auto">
                Contact us today to discuss your project requirements and
                discover how we can transform your space.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button className="btn-primary group bg-brand-gold-light hover:bg-brand-gold text-white !px-6 !py-3 mx-auto">
                  Schedule a Consultation
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-brand-gold-light" />
                  <span className="text-sm">+91-6393556220</span>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-brand-gold-light" />
                  <span className="text-sm">kkentp2018@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-brand-gold-light" />
                  <span className="text-sm">Varanasi, Uttar Pradesh</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
