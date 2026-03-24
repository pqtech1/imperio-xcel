import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  MapPinIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon,
  BriefcaseIcon,
  TrophyIcon,
  ShieldCheckIcon,
  EyeIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useTeams, useAchievements, useProjects } from "@/hooks/useApiData";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";
import { PageLoader } from "../Layouts/Header";
import SEO from "./SEO";

const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const { data: teams, loading: tl } = useTeams();
  const { data: achievements, loading: ahl } = useAchievements();
  const { data: projects, loading: pl } = useProjects();

  const loading = tl || ahl || pl;

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

  // Use dynamic achievements data if available
  const stats = achievements?.slice(0, 4).map((a) => ({
    icon: CalendarIcon,
    value: `${a.count}+`,
    label: a.title,
  })) || [
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

  // Use dynamic team data if available
  const displayedTeam = teams?.map((m) => ({
    name: m.name || "Team Member",
    role: m.designation || "Professional",
    desc: m.bio ? stripHtml(m.bio).substring(0, 80) : "Dedicated professional",
    image: getImageUrl(m.image) || "https://via.placeholder.com/400x500",
  })) || [
    {
      name: "Abhishek Vishwakarma",
      role: "Owner",
      desc: "Leading with vision and dedication to excellence",
      image:
        "https://st5.depositphotos.com/4218696/72817/i/450/depositphotos_728179600-stock-photo-image-shows-smiling-man-standing.jpg",
    },
    {
      name: "Kajal Vishwakarma",
      role: "Architect",
      desc: "Creative excellence in design and space planning",
      image:
        "https://img.freepik.com/premium-photo/happy-millennial-indian-business-lady-using-laptop-home-office_116547-79022.jpg",
    },
    {
      name: "Ramesh Prasad Vishwakarma",
      role: "Senior Advisor",
      desc: "Decades of expertise guiding our vision",
      image:
        "https://img.freepik.com/free-photo/happy-indian-business-man-using-tablet-cafe_1262-3224.jpg",
    },
  ];

  const totalBankModels =
    projects?.filter((p) => p.name?.toLowerCase().includes("bank")).length ||
    40;
  const totalProjects = projects?.length || 50;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="About InterioXcel - Our Story, Philosophy & Team | Interior Design Excellence"
        description="InterioXcel is a premier furnishing contracting company founded in 2017. Learn about our honeybee philosophy, leadership team, and commitment to excellence in interior design."
        keywords="about us, interior design company, furnishing contractors, Varanasi, interior design philosophy, leadership team"
        image="https://interioxcel.com/about-og-image.jpg"
        url="https://interioxcel.com/about"
      />
      <div className="bg-white">
        {/* HERO SECTION */}
        <section className="relative h-screen min-h-[640px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/2029665/pexels-photo-2029665.jpeg"
              alt="About InterioXcel"
              className="w-full h-full object-cover"
            />

            {/* Dark translucent overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="absolute left-6 md:left-8 lg:left-16 xl:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold to-transparent opacity-30" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto section-px w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-[680px]"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex items-center gap-4 mb-5"
                >
                  <div className="w-12 h-px bg-brand-gold opacity-70" />
                  <h6 className="mb-0">EST. 2017</h6>
                </motion.div>
                <h1>
                  Crafting Spaces,
                  <br />
                  Creating <span className="text-brand-gold">Legacies</span>
                </h1>
                <p className="mb-0">
                  A comprehensive furnishing contracting solutions organization
                  dedicated to excellence in interior design.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-wider text-brand-charcoal/40 uppercase"
          >
            SCROLL
          </motion.div>
        </section>

        {/* HONEYBEE PHILOSOPHY SECTION */}
        <section>
          <div className="container mx-auto section-px pt-16 pb-12">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <h6 className="mb-4">OUR INSPIRATION</h6>
                <h2 className="mb-4">
                  The Honeybee{" "}
                  <span className="text-brand-gold">Philosophy</span>
                </h2>
                <div className="w-10 h-px bg-brand-gold opacity-70 mb-5" />

                <p className="italic mb-6">
                  "Honeybees are a symbol of hard work, dedication, perfection,
                  focus, and teamwork. They work tirelessly towards achieving
                  their desired goal of constructing their divine abode within
                  the desired time and towards assured results."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.slice(0, 2).map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-brand-gold" />
                        </div>
                        <div>
                          <h5 className="mb-1">{value.title}</h5>
                          <p className="text-sm text-brand-charcoal/60 leading-relaxed m-0">
                            {value.desc}
                          </p>
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
                className="flex-1"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {values.slice(2, 4).map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div
                        key={index}
                        className="bg-bg-soft p-5 border border-brand-gold/10"
                      >
                        <div className="w-10 h-10 bg-brand-gold/10 flex items-center justify-center mb-4">
                          <Icon className="w-4.5 h-4.5 text-brand-gold" />
                        </div>
                        <h5 className="mb-2">{value.title}</h5>
                        <p className="text-sm text-brand-charcoal/60 leading-relaxed m-0">
                          {value.desc}
                        </p>
                      </div>
                    );
                  })}

                  <div className="col-span-2 bg-bg-soft p-6 border-l-2 border-brand-gold mt-2">
                    <p className="text-brand-charcoal text-sm italic leading-relaxed mb-2 font-serif">
                      "Adherence to values and principles of honesty and
                      transparency"
                    </p>
                    <h6 className="mb-0">
                      — Mrs. Meera Ramesh Vishwakarma, Founder
                    </h6>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STORY SECTION */}
        <section className="bg-bg-soft">
          <div className="container mx-auto section-px py-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/5379178/pexels-photo-5379178.jpeg"
                    alt="Our Story"
                    className="w-full h-auto block"
                  />
                  <div className="absolute -bottom-5 -right-5 bg-white p-5 max-w-[240px] border border-brand-gold/20 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                        <BuildingOfficeIcon className="w-3.5 h-3.5 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-2xl font-heading font-light text-brand-gold leading-none mb-0">
                          {totalProjects}+
                        </p>
                        <p className="text-xs text-brand-charcoal/60 mt-1 mb-0">
                          Projects Delivered
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center">
                        <MapPinIcon className="w-3.5 h-3.5 text-brand-gold" />
                      </div>
                      <div>
                        <p className="text-2xl font-heading font-light text-brand-gold leading-none mb-0">
                          8+
                        </p>
                        <p className="text-xs text-brand-charcoal/60 mt-1 mb-0">
                          Districts Covered
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1"
              >
                <h6 className="mb-4">OUR JOURNEY</h6>
                <h2 className="mb-4">
                  A Legacy of{" "}
                  <span className="text-brand-gold">Excellence</span>
                </h2>
                <div className="w-10 h-px bg-brand-gold opacity-70 mb-5" />

                <p className="mb-3">
                  InterioXcel, established by{" "}
                  <span className="font-semibold text-brand-charcoal">
                    Mrs. Meera Ramesh Vishwakarma
                  </span>{" "}
                  in 2017, is dedicated to creating comprehensive furnishing
                  contracting solutions within the interior design industry. Our
                  founders bring extensive wealth of experience, spanning
                  decades, in the interior solutions sector.
                </p>

                <p className="mb-6">
                  Having collaborated with esteemed architects and PMC
                  companies, we've successfully delivered numerous interior
                  projects encompassing thousands of square feet. Today, under
                  the leadership of
                  <span className="font-semibold text-brand-charcoal">
                    {" "}
                    Abhishek Vishwakarma
                  </span>
                  , we continue our commitment to excellence.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-bg-soft p-5 border border-brand-gold/10">
                    <EyeIcon className="w-5 h-5 text-brand-gold mb-3" />
                    <h5 className="mb-2">Our Vision</h5>
                    <p className="text-sm text-brand-charcoal/60 m-0 leading-relaxed">
                      To be among the top of our field in interior design
                    </p>
                  </div>
                  <div className="bg-bg-soft p-5 border border-brand-gold/10">
                    <EyeIcon className="w-5 h-5 text-brand-gold mb-3" />
                    <h5 className="mb-2">Our Mission</h5>
                    <p className="text-sm text-brand-charcoal/60 m-0 leading-relaxed">
                      To be professional and committed in achieving client
                      quality
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MILESTONES TIMELINE */}
        <section>
          <div className="container mx-auto section-px pt-16 pb-12">
            <div className="text-center max-w-[768px] mx-auto mb-12">
              <h6 className="mb-3">OUR MILESTONES</h6>
              <h2 className="mb-3">The Journey So Far</h2>
              <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-brand-gold/10 rounded-full flex items-center justify-center">
                    <h6 className="mb-0 text-brand-gold">{milestone.year}</h6>
                  </div>
                  <div className="bg-bg-soft p-5 border border-brand-gold/10">
                    <h5 className="mb-2">{milestone.title}</h5>
                    <p className="text-sm text-brand-charcoal/60 m-0 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-bg-soft relative overflow-hidden">
          <div className="container mx-auto section-px py-12 relative z-10">
            <div className="text-center max-w-[768px] mx-auto mb-10">
              <h6 className="mb-3">Our Achievements</h6>
              <h2 className="mb-3">
                Numbers That <span className="text-brand-gold">Speak</span>
              </h2>
              <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 bg-brand-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-gold mb-1">
                      {stat.value}
                    </div>
                    <h6 className="mb-0">{stat.label}</h6>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERTISE AREAS */}
        <section>
          <div className="container mx-auto section-px pt-16 pb-12">
            <div className="text-center max-w-[768px] mx-auto mb-12">
              <h6 className="mb-3">AREAS OF EXPERTISE</h6>
              <h2 className="mb-3">Industries We Serve</h2>
              <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-bg-soft p-6 border border-brand-gold/10 text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-4 bg-brand-gold/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h5 className="mb-2">{item.area}</h5>
                    <h6 className="mb-0">{item.projects}</h6>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MAJOR PROJECTS HIGHLIGHT */}
        <section className="bg-bg-soft">
          <div className="container mx-auto section-px py-16">
            <div className="text-center max-w-[768px] mx-auto mb-12">
              <h6 className="mb-3">KEY PROJECTS</h6>
              <h2 className="mb-3">Trusted by Leading Brands</h2>
              <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
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
                  className="bg-bg-soft p-5 text-center border border-brand-gold/10"
                >
                  <p className="text-sm font-medium text-brand-charcoal m-0 tracking-wide">
                    {brand}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 bg-bg-soft p-6 border-l-2 border-brand-gold"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-heading font-light text-brand-charcoal mb-2">
                    KASHI GOMATI SAMYUKT GRAMEEN BANK
                  </h3>
                  <p className="text-sm text-brand-charcoal/60 m-0">
                    Successfully delivered {totalBankModels}+ bank models across
                    8 districts
                  </p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-heading font-light text-brand-gold mb-1">
                      {totalBankModels}+
                    </p>
                    <h6 className="mb-0">Bank Models</h6>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-heading font-light text-brand-gold mb-1">
                      8
                    </p>
                    <h6 className="mb-0">Districts</h6>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section>
          <div className="container mx-auto section-px pt-16 pb-12">
            <div className="text-center max-w-[768px] mx-auto mb-12">
              <h6 className="mb-3">Our Leadership</h6>
              <h2 className="mb-3">Meet the Team</h2>
              <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedTeam.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center group"
                >
                  <div className="relative overflow-hidden mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover block transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x500";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h4 className="mb-1">{member.name}</h4>
                  <h6 className="mb-2">{member.role}</h6>
                  <p className="text-sm text-brand-charcoal/60 m-0 leading-relaxed">
                    {member.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK IN PROGRESS */}
        <section className="bg-bg-soft">
          <div className="container mx-auto section-px py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
              <div>
                <h6 className="mb-1">CURRENTLY WORKING ON</h6>
                <h4 className="mb-0">Work in Progress</h4>
              </div>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-white/80 backdrop-blur-sm px-5 py-3 border border-brand-gold/20">
                  <p className="text-sm font-medium text-brand-charcoal mb-1">
                    TATA AIG LIFE INSURANCE
                  </p>
                  <p className="text-xs text-brand-charcoal/60 m-0">
                    Robertsgang, Sonbhadra
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-5 py-3 border border-brand-gold/20">
                  <p className="text-sm font-medium text-brand-charcoal mb-1">
                    NYKAA LUX
                  </p>
                  <p className="text-xs text-brand-charcoal/60 m-0">
                    HLP Galleria, Mohali
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="bg-bg-soft">
          <div className="container mx-auto section-px py-16">
            <div className="max-w-[896px] mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="mb-4">
                  Let's Create Something{" "}
                  <span className="text-brand-gold">Amazing Together</span>
                </h2>
                <p className="mb-6 max-w-[640px] mx-auto">
                  Contact us today to discuss your project requirements and
                  discover how we can transform your space.
                </p>

                <Link to="/contact" className="btn-primary inline-flex">
                  Schedule a Consultation
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>

                <div className="flex justify-center gap-6 mt-8 flex-wrap">
                  {[
                    { icon: PhoneIcon, text: "+91-6393556220" },
                    { icon: EnvelopeIcon, text: "info@interioxcel.com" },
                    { icon: MapPinIcon, text: "Varanasi, Uttar Pradesh" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full border border-brand-gold/30 flex items-center justify-center transition-colors duration-300 group-hover:border-brand-gold">
                          <Icon className="w-3.5 h-3.5 text-brand-gold" />
                        </div>
                        <span className="text-sm text-brand-charcoal/60 group-hover:text-brand-charcoal transition-colors duration-300">
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
