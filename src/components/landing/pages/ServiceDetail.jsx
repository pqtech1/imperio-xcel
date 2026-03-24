import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CircleCheckBig } from "lucide-react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import { getImageUrl } from "@/lib/imageUtils";
import { useServices, useFAQs } from "@/hooks/useApiData";
import { PageLoader } from "../Layouts/Header";
import PremiumProcessSection from "./PremiumProcessSection";
import SEO from "./SEO";

/* ─────────────────────────────────────────
   useInView HOOK
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
   IMAGE CAROUSEL
───────────────────────────────────────── */
const TwoImageCarousel = ({ images }) => {
  const [idx, setIdx] = useState(0);
  if (!images?.length) return null;
  const valid = images.filter((i) => i?.src);
  const prev = () => setIdx((p) => (p === 0 ? valid.length - 2 : p - 2));
  const next = () => setIdx((p) => (p + 2 >= valid.length ? 0 : p + 2));
  const display = valid.slice(idx, idx + 2);
  if (display.length === 1) display.push(display[0]);
  const pages = Math.ceil(valid.length / 2);

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="wait">
          {display.map((img, i) => (
            <motion.div
              key={`${idx}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative rounded-sm overflow-hidden aspect-[4/3]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover block"
                onError={(e) => {
                  e.target.src = "/img/services/1.webp";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {valid.length > 2 && (
        <>
          {[
            { fn: prev, side: "left", Icon: ChevronLeft },
            { fn: next, side: "right", Icon: ChevronRight },
          ].map(({ fn, side, Icon }) => (
            <button
              key={side}
              onClick={fn}
              className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-brand-gold/40 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:bg-brand-gold/10 ${side === "left" ? "-left-5" : "-right-5"}`}
            >
              <Icon size={16} className="text-brand-gold" />
            </button>
          ))}

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pages }).map((_, i) => (
              <div
                key={i}
                onClick={() => setIdx(i * 2)}
                className={`h-px cursor-pointer transition-all duration-400 ${
                  Math.floor(idx / 2) === i
                    ? "w-7 bg-brand-gold"
                    : "w-1.5 bg-brand-charcoal/20"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────
   SERVICE CARD (What We Do)
───────────────────────────────────────── */
const ServiceCard = ({ item, index }) => {
  const [ref, visible] = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 1;
  const imgNum = (index % 10) + 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 40 }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col lg:flex-row ${isEven ? "lg:flex-row-reverse" : ""} mb-px overflow-hidden bg-bg-soft relative`}
    >
      {/* Number indicator */}
      <div
        className={`absolute top-6 text-xs tracking-wider text-brand-gold font-medium z-10 ${
          isEven ? "right-[calc(50%+24px)]" : "left-[calc(50%+24px)]"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Image */}
      <div
        className="w-full lg:w-1/2 relative overflow-hidden min-h-[340px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={`img/services/${imgNum}.webp`}
          alt={item.title}
          className={`w-full h-full object-cover block transition-transform duration-1000 ${
            hovered ? "scale-105" : "scale-100"
          }`}
          onError={(e) => {
            e.target.src = "/img/services/1.webp";
          }}
        />
        <div
          className={`absolute inset-0 transition-all duration-600 ${
            hovered
              ? "bg-gradient-to-r from-black/20 to-transparent"
              : "bg-gradient-to-r from-black/5 to-transparent"
          }`}
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-bg-soft relative">
        <div
          className={`absolute top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-brand-gold to-transparent opacity-30 ${
            isEven ? "right-0" : "left-0"
          }`}
        />

        <div className="w-10 h-px bg-brand-gold opacity-70 mb-5" />
        <h3 className="text-2xl md:text-3xl font-heading font-light text-brand-charcoal mb-4 leading-tight">
          {item.title}
        </h3>
        {item.description && (
          <div
            className="text-brand-charcoal/65 text-base leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
        {item.services?.length > 0 && (
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {item.services.slice(0, 4).map((s, i) => (
              <li key={i} className="flex items-center gap-2.5 list-none">
                <CircleCheckBig
                  size={14}
                  className="text-brand-gold flex-shrink-0"
                />
                <span className="text-brand-charcoal/65 ">{s}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────── */
const FAQItem = ({ item, index }) => {
  const [open, setOpen] = useState(index === 0);
  const [ref, visible] = useInView(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="border-b border-brand-gold/20"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 bg-transparent border-none cursor-pointer text-left"
      >
        <span
          className={`text-base md:text-lg font-medium pr-6 transition-colors duration-300 ${open ? "text-brand-gold" : "text-brand-charcoal"}`}
        >
          {item.question || item.q}
        </span>
        <div
          className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open ? "border-brand-gold bg-brand-gold rotate-45" : "border-brand-gold/40 bg-transparent"}`}
        >
          <span
            className={`text-lg leading-none ${open ? "text-white" : "text-brand-gold"}`}
          >
            +
          </span>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="text-brand-charcoal/65 text-base leading-relaxed pb-5">
              {item.answer || item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   STAT BAR
───────────────────────────────────────── */
const StatBar = () => {
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "12+", label: "Years of Excellence" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Design Awards" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-brand-gold/20">
      {stats.map((s, i) => (
        <div
          key={i}
          className={`py-8 text-center ${i < 3 ? "border-r border-brand-gold/15" : ""}`}
        >
          <div className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-brand-gold leading-none mb-1.5">
            {s.value}
          </div>
          <h6 className="mb-0">{s.label}</h6>
        </div>
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);

  const { data: faqs } = useFAQs();
  const { data: services, isLoading: servicesLoading } = useServices();

  useEffect(() => {
    if (services?.length) {
      const found = services.find(
        (s) => s.slug === slug || s.id.toString() === slug,
      );
      if (found) {
        setService(found);
        setError(null);
      } else setError("Service not found");
      setLoading(false);
    }
  }, [services, slug]);

  if (loading || servicesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <PageLoader />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-light text-brand-charcoal mb-3">
            Service Not Found
          </h1>
          <p className="text-brand-charcoal/65 mb-7">
            The service you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate("/")} className="btn-outline">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const sliderImages =
    service.services_over_view?.flatMap((ov) =>
      ov.images?.map((img) => ({
        id: img,
        src: getImageUrl(img),
        alt: ov.title || "Service image",
      })),
    ) || [];

  const heroImage = service.service_banner_img
    ? getImageUrl(service.service_banner_img)
    : "https://images.pexels.com/photos/3741314/pexels-photo-3741314.jpeg";

  const inputStyle = (field) => ({
    borderBottomColor:
      focusedField === field ? "#b88a44" : "rgba(26,31,38,0.25)",
    caretColor: "#b88a44",
  });

  return (
    <>
      <SEO
        title={`${service.service_title || service.title} | Interior Design Services | InterioXcel`}
        description={
          service.service_short_description ||
          `Professional ${service.service_title} services by InterioXcel.`
        }
        keywords={`${service.service_title}, interior design, furnishing contracting`}
        image={heroImage}
        url={`https://interioxcel.com/services/${service.slug || service.id}`}
      />
      <div className="bg-white">
        {/* ── CINEMATIC HERO ── */}
        <div className="relative h-screen min-h-[600px] overflow-hidden">
          <img
            src={heroImage}
            alt={service.service_title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.pexels.com/photos/3741314/pexels-photo-3741314.jpeg";
            }}
          />

          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {/* Decorative vertical line */}
          <div className="absolute left-6 md:left-8 lg:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold to-transparent opacity-30" />

          <div className="absolute inset-0 flex items-end pb-20 max-w-[1280px] mx-auto left-0 right-0">
            <div className="container mx-auto section-px">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="max-w-[680px]"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex items-center gap-4 mb-5"
                >
                  <div className="w-12 h-px bg-brand-gold opacity-70" />
                  <h6 className="text-brand-gold mb-0">
                    {service.service_tagline || "Premium Interior Design"}
                  </h6>
                </motion.div>

                <h1 className="text-white mb-6 text-[clamp(40px,6vw,80px)] font-heading font-light leading-none tracking-[-0.025em]">
                  {service.service_intro_title || service.service_title}
                </h1>

                <p className="text-white/70 text-base leading-relaxed max-w-[520px] mb-0">
                  {service.service_short_description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 right-6 md:right-8 lg:right-16 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.2em] text-brand-charcoal/50 uppercase [writing-mode:vertical-rl]">
              Scroll
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-brand-gold to-transparent opacity-50" />
          </motion.div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="bg-bg-soft">
          <div className="container mx-auto section-px">
            <StatBar />
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {service.services_over_view?.[0] && (
          <div className="bg-white py-16 lg:py-24">
            <div className="container mx-auto section-px">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
                <div>
                  <h6 className="mb-4 text-brand-gold">Overview</h6>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-brand-charcoal leading-tight tracking-[-0.02em] mb-6">
                    {service.services_over_view[0].title ||
                      "Service Excellence"}
                  </h2>
                  <div className="w-10 h-px bg-brand-gold opacity-70 mb-5" />
                  <p className="text-brand-charcoal/60  tracking-wide">
                    {service.services_over_view[0].intro}
                  </p>
                </div>
                <div>
                  <div
                    className="text-brand-charcoal/65 text-base leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: service.services_over_view[0].description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── IMAGE CAROUSEL ── */}
        {sliderImages.length > 0 && (
          <div className="bg-bg-soft pb-16">
            <div className="container mx-auto section-px">
              <TwoImageCarousel images={sliderImages} />
            </div>
          </div>
        )}

        {/* ── WHY WORK WITH US ── */}
        {service.why_work_with_us?.[0] && (
          <div className="bg-bg-soft py-16 lg:py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(80px,15vw,200px)] font-heading font-light text-brand-gold/5 whitespace-nowrap pointer-events-none select-none">
              Excellence
            </div>

            <div className="container mx-auto section-px relative z-10">
              <div className="text-center max-w-3xl mx-auto">
                <h6 className="mb-3 text-brand-gold">Why Choose Us</h6>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-brand-charcoal mb-3">
                  {service.why_work_with_us[0].title}
                </h2>
                <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto my-5" />
                <p className="text-brand-gold text-lg italic font-serif mb-6">
                  {service.why_work_with_us[0].tagline}
                </p>
                <div
                  className="text-brand-charcoal/65 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: service.why_work_with_us[0].description,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── WHAT WE DO ── */}
        {service.what_we_do?.length > 0 && (
          <div className="bg-white">
            <div className="text-center pt-16 pb-8">
              <h6 className="mb-3 text-brand-gold">What We Do</h6>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-brand-charcoal mb-3">
                Our Services
              </h2>
              <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto" />
            </div>

            <div className="container mx-auto">
              {service.what_we_do.map((item, i) => (
                <ServiceCard key={item.id || i} item={item} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* ── PROCESS ── */}
        <PremiumProcessSection />

        {/* ── FAQ ── */}
        {faqs?.length > 0 && (
          <div className="bg-bg-soft py-16 lg:py-24">
            <div className="container mx-auto section-px max-w-3xl">
              <div className="text-center mb-12">
                <h6 className="mb-3 text-brand-gold">FAQ</h6>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-brand-charcoal mb-3">
                  Frequently Asked
                  <br />
                  <span className="text-brand-gold italic">Questions</span>
                </h2>
                <div className="w-10 h-px bg-brand-gold opacity-70 mx-auto" />
              </div>

              <div>
                {faqs.slice(0, 6).map((item, i) => (
                  <FAQItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── GET A QUOTE ── */}
        <div className="bg-white py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-br from-brand-gold/5 to-transparent pointer-events-none" />
          <div className="absolute top-16 right-16 text-[180px] font-heading text-brand-gold/5 leading-none select-none">
            ✦
          </div>

          <div className="container mx-auto section-px relative z-10">
            <div className="mb-10">
              <h6 className="mb-3 text-brand-gold">Let's Talk</h6>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-brand-charcoal leading-tight mb-0">
                Begin Your
                <br />
                <span className="text-brand-gold italic">Transformation</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
              {/* Contact details */}
              <div>
                <p className="text-brand-charcoal/65  leading-relaxed mb-10">
                  Share your vision with us. Our design consultants will craft a
                  bespoke proposal tailored to your space, taste, and ambitions.
                </p>

                {[
                  {
                    Icon: MapPinIcon,
                    label: "Studio",
                    lines: ["Coraut Bazar Kotwa Lohata", "Varanasi — 221107"],
                  },
                  {
                    Icon: PhoneIcon,
                    label: "Call",
                    lines: ["+91-6393556220", "+91-9935550330"],
                  },
                  {
                    Icon: EnvelopeIcon,
                    label: "Email",
                    lines: ["info@interioxcel.com"],
                  },
                ].map(({ Icon, label, lines }, i) => (
                  <div key={i} className="flex gap-5 mb-7">
                    <div className="w-9 h-9 rounded-full border border-brand-gold/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <h6 className="mb-1 text-brand-gold">{label}</h6>
                      {lines.map((l, j) => (
                        <p
                          key={j}
                          className="text-brand-charcoal/65  mb-0"
                        >
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  <div className="col-span-1">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle("name")}
                      className="w-full bg-transparent border border-brand-charcoal/25 focus:border-brand-gold outline-none transition-colors px-4 py-3.5 text-brand-charcoal  rounded-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle("email")}
                      className="w-full bg-transparent border border-brand-charcoal/25 focus:border-brand-gold outline-none transition-colors px-4 py-3.5 text-brand-charcoal  rounded-sm"
                    />
                  </div>

                  <div className="col-span-2 mt-6">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      style={inputStyle("phone")}
                      className="w-full bg-transparent border border-brand-charcoal/25 focus:border-brand-gold outline-none transition-colors px-4 py-3.5 text-brand-charcoal  rounded-sm"
                    />
                  </div>
                </div>
                <textarea
                  rows={4}
                  placeholder="Project Details..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  style={inputStyle("message")}
                  className="w-full bg-transparent border border-brand-charcoal/25 focus:border-brand-gold outline-none transition-colors px-4 py-3.5 text-brand-charcoal  resize-none mt-6 mb-8 rounded-sm"
                />

                <button
                  type="button"
                  className="btn-outline px-12 py-4"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#b88a44";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#b88a44";
                  }}
                >
                  Send Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
