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

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const GOLD = "#C9A96E";
const GOLD_LIGHT = "#E2C98A";
const DARK = "#FFFFFF"; // Changed to white background
const DARK_2 = "#FAFAFA"; // Light grey for subtle contrast
const DARK_3 = "#F5F5F5"; // Even lighter grey
const LIGHT = "#0C0C0C"; // Changed to dark text
const MUTED = "rgba(12,12,12,0.65)"; // Dark muted text

const serif = "'Georgia', 'Times New Roman', serif";

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
   SECTION LABEL
───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p
    style={{
      fontSize: "11px",
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: GOLD,
      fontWeight: 500,
      marginBottom: "14px",
    }}
  >
    {children}
  </p>
);

/* ─────────────────────────────────────────
   GOLD DIVIDER
───────────────────────────────────────── */
const GoldLine = ({ width = 40, style = {} }) => (
  <div
    style={{ width, height: "1px", background: GOLD, opacity: 0.7, ...style }}
  />
);

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
    <div style={{ position: "relative" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <AnimatePresence mode="wait">
          {display.map((img, i) => (
            <motion.div
              key={`${idx}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              style={{
                position: "relative",
                borderRadius: "2px",
                overflow: "hidden",
                aspectRatio: "4/3",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.src = "/img/services/1.webp";
                }}
              />
              {/* Subtle vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.05) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
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
              style={{
                position: "absolute",
                [side]: "-20px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
                background: "#FFFFFF",
                border: `0.5px solid rgba(201,169,110,0.4)`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#F5F5F5")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#FFFFFF")
              }
            >
              <Icon size={16} color={GOLD} />
            </button>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "24px",
            }}
          >
            {Array.from({ length: pages }).map((_, i) => (
              <div
                key={i}
                onClick={() => setIdx(i * 2)}
                style={{
                  width: Math.floor(idx / 2) === i ? "28px" : "6px",
                  height: "2px",
                  borderRadius: "1px",
                  background:
                    Math.floor(idx / 2) === i ? GOLD : "rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
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
      style={{
        display: "flex",
        flexDirection: isEven ? "row-reverse" : "row",
        marginBottom: "2px",
        overflow: "hidden",
        background: DARK_2,
        position: "relative",
      }}
    >
      {/* Number indicator */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          left: isEven ? "auto" : "calc(50% + 24px)",
          right: isEven ? "calc(50% + 24px)" : "auto",
          fontSize: "11px",
          letterSpacing: "0.2em",
          color: GOLD,
          fontWeight: 500,
          zIndex: 2,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Image */}
      <div
        style={{
          width: "50%",
          position: "relative",
          overflow: "hidden",
          minHeight: "340px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={`img/services/${imgNum}.webp`}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)",
            display: "block",
          }}
          onError={(e) => {
            e.target.src = "/img/services/1.webp";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to right, rgba(0,0,0,0.2), transparent)"
              : "linear-gradient(to right, rgba(0,0,0,0.05), transparent)",
            transition: "background 0.6s ease",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          width: "50%",
          padding: "52px 48px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: DARK_2,
          position: "relative",
        }}
      >
        {/* Vertical gold accent */}
        <div
          style={{
            position: "absolute",
            [isEven ? "right" : "left"]: 0,
            top: "10%",
            bottom: "10%",
            width: "1px",
            background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
            opacity: 0.3,
          }}
        />

        <GoldLine style={{ marginBottom: "20px" }} />
        <h3
          style={{
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 300,
            color: LIGHT,
            margin: "0 0 16px",
            fontFamily: serif,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </h3>
        {item.description && (
          <div
            style={{
              color: MUTED,
              fontSize: "14px",
              lineHeight: 1.8,
              marginBottom: "24px",
            }}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
        {item.services?.length > 0 && (
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            {item.services.slice(0, 4).map((s, i) => (
              <li
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <CircleCheckBig
                  size={14}
                  color={GOLD}
                  style={{ flexShrink: 0 }}
                />
                <span
                  style={{
                    color: "rgba(12,12,12,0.65)",
                    fontSize: "13px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {s}
                </span>
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
      style={{ borderBottom: "0.5px solid rgba(201,169,110,0.2)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            fontWeight: 400,
            color: open ? GOLD : LIGHT,
            lineHeight: 1.4,
            transition: "color 0.3s",
            paddingRight: "24px",
            fontFamily: serif,
          }}
        >
          {item.question || item.q}
        </span>
        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            border: `0.5px solid ${open ? GOLD : "rgba(201,169,110,0.4)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            background: open ? GOLD : "transparent",
            transition: "all 0.35s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <span
            style={{
              color: open ? "#FFFFFF" : GOLD,
              fontSize: "18px",
              lineHeight: 1,
              marginTop: "-1px",
            }}
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
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                color: MUTED,
                fontSize: "14px",
                lineHeight: 1.8,
                paddingBottom: "22px",
              }}
            >
              {item.answer || item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   STAT TICKER
───────────────────────────────────────── */
const StatBar = () => {
  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "12+", label: "Years of Excellence" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "50+", label: "Design Awards" },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: `0.5px solid rgba(201,169,110,0.2)`,
        borderBottom: `0.5px solid rgba(201,169,110,0.2)`,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "32px 0",
            textAlign: "center",
            borderRight: i < 3 ? `0.5px solid rgba(201,169,110,0.15)` : "none",
          }}
        >
          <div
            style={{
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 300,
              color: GOLD,
              fontFamily: serif,
              lineHeight: 1,
              marginBottom: "6px",
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "rgba(12,12,12,0.5)",
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </div>
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
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: DARK,
        }}
      >
        <PageLoader />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: DARK,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: 300,
              color: LIGHT,
              marginBottom: "12px",
              fontFamily: serif,
            }}
          >
            Service Not Found
          </h2>
          <p style={{ color: MUTED, marginBottom: "28px" }}>
            The service you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 32px",
              background: "transparent",
              border: `0.5px solid ${GOLD}`,
              color: GOLD,
              borderRadius: "2px",
              cursor: "pointer",
              fontSize: "13px",
              letterSpacing: "0.08em",
            }}
          >
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
    width: "100%",
    padding: "14px 0",
    background: "transparent",
    border: "none",
    borderBottom: `0.5px solid ${focusedField === field ? GOLD : "rgba(201,169,110,0.25)"}`,
    color: LIGHT,
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box",
    caretColor: GOLD,
  });

  return (
    <div
      style={{
        background: DARK,
        minHeight: "100vh",
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      }}
    >
      {/* ── CINEMATIC HERO ── */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <img
          src={heroImage}
          alt={service.service_title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/3741314/pexels-photo-3741314.jpeg";
          }}
        />

        {/* Multi-layer overlay - lighter for white background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)",
          }}
        />

        {/* Decorative vertical line */}
        <div
          style={{
            position: "absolute",
            left: "calc(48px + 2px)",
            top: 0,
            bottom: 0,
            width: "0.5px",
            background: `linear-gradient(to bottom, transparent 0%, ${GOLD} 30%, ${GOLD} 70%, transparent 100%)`,
            opacity: 0.3,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            padding: "0 80px 80px",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ maxWidth: "680px" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <GoldLine width={48} />
              <SectionLabel>
                {service.service_tagline || "Premium Interior Design"}
              </SectionLabel>
            </motion.div>

            <h1
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 300,
                color: LIGHT,
                lineHeight: 1.0,
                margin: "0 0 24px",
                fontFamily: serif,
                letterSpacing: "-0.025em",
              }}
            >
              {service.service_intro_title || service.service_title}
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "rgba(12,12,12,0.7)",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: 0,
              }}
            >
              {service.service_short_description}
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "rgba(12,12,12,0.5)",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "0.5px",
              height: "60px",
              background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
              opacity: 0.5,
            }}
          />
        </motion.div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: DARK_2 }}>
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 80px" }}
        >
          <StatBar />
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      {service.services_over_view?.[0] && (
        <div style={{ background: DARK, padding: "100px 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: "80px",
                alignItems: "start",
              }}
            >
              <div>
                <SectionLabel>Overview</SectionLabel>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    fontWeight: 300,
                    color: LIGHT,
                    fontFamily: serif,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    margin: "0 0 28px",
                  }}
                >
                  {service.services_over_view[0].title || "Service Excellence"}
                </h2>
                <GoldLine style={{ marginBottom: "28px" }} />
                <p
                  style={{
                    color: MUTED,
                    fontSize: "13px",
                    lineHeight: 1.8,
                    letterSpacing: "0.05em",
                  }}
                >
                  {service.services_over_view[0].intro}
                </p>
              </div>
              <div>
                <div
                  style={{
                    color: MUTED,
                    fontSize: "16px",
                    lineHeight: 1.9,
                  }}
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
        <div style={{ background: DARK_2, padding: "0 80px 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <TwoImageCarousel images={sliderImages} />
          </div>
        </div>
      )}

      {/* ── WHY WORK WITH US ── */}
      {service.why_work_with_us?.[0] && (
        <div
          style={{
            background: DARK_3,
            padding: "100px 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Large faded background text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(80px, 15vw, 200px)",
              fontFamily: serif,
              fontWeight: 300,
              color: "rgba(201,169,110,0.05)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Excellence
          </div>

          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 52px)",
                  fontWeight: 300,
                  color: LIGHT,
                  fontFamily: serif,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  margin: "0 0 12px",
                }}
              >
                {service.why_work_with_us[0].title}
              </h2>
              <GoldLine width={40} style={{ margin: "20px auto 24px" }} />
              <p
                style={{
                  fontSize: "18px",
                  color: GOLD,
                  fontStyle: "italic",
                  margin: "0 0 28px",
                  fontFamily: serif,
                }}
              >
                {service.why_work_with_us[0].tagline}
              </p>
              <div
                style={{ color: MUTED, fontSize: "15px", lineHeight: 1.9 }}
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
        <div style={{ background: DARK }}>
          {/* Section header */}
          <div style={{ padding: "80px 80px 48px", textAlign: "center" }}>
            <SectionLabel>What We Do</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(30px, 4vw, 52px)",
                fontWeight: 300,
                color: LIGHT,
                fontFamily: serif,
                letterSpacing: "-0.02em",
                margin: "0 0 16px",
              }}
            >
              Our Services
            </h2>
            <GoldLine width={40} style={{ margin: "0 auto" }} />
          </div>

          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
        <div style={{ background: DARK_2, padding: "100px 80px" }}>
          <div style={{ maxWidth: "840px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <SectionLabel>FAQ</SectionLabel>
              <h2
                style={{
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  fontWeight: 300,
                  color: LIGHT,
                  fontFamily: serif,
                  letterSpacing: "-0.02em",
                  margin: "0 0 16px",
                }}
              >
                Frequently Asked
                <br />
                <em style={{ color: GOLD, fontStyle: "italic" }}>Questions</em>
              </h2>
              <GoldLine width={40} style={{ margin: "0 auto" }} />
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
      <div
        style={{
          background: DARK,
          padding: "100px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative corner element */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            background: `linear-gradient(135deg, transparent 0%, rgba(201,169,110,0.03) 100%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "80px",
            fontSize: "180px",
            fontFamily: serif,
            color: "rgba(201,169,110,0.05)",
            lineHeight: 1,
            fontWeight: 300,
            userSelect: "none",
          }}
        >
          ✦
        </div>

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: "64px" }}>
            <SectionLabel>Let's Talk</SectionLabel>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 68px)",
                fontWeight: 300,
                color: LIGHT,
                fontFamily: serif,
                letterSpacing: "-0.025em",
                lineHeight: 1.0,
                margin: 0,
              }}
            >
              Begin Your
              <br />
              <em style={{ color: GOLD, fontStyle: "italic" }}>
                Transformation
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.4fr",
              gap: "100px",
              alignItems: "start",
            }}
          >
            {/* Contact details */}
            <div>
              <p
                style={{
                  color: MUTED,
                  fontSize: "14px",
                  lineHeight: 1.8,
                  marginBottom: "48px",
                }}
              >
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
                <div
                  key={i}
                  style={{ display: "flex", gap: "20px", marginBottom: "36px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      border: `0.5px solid rgba(201,169,110,0.3)`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      style={{ width: "15px", height: "15px", color: GOLD }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        color: GOLD,
                        textTransform: "uppercase",
                        margin: "0 0 6px",
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </p>
                    {lines.map((l, j) => (
                      <p
                        key={j}
                        style={{
                          color: MUTED,
                          fontSize: "14px",
                          margin: "0 0 2px",
                        }}
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 40px",
                }}
              >
                {[
                  {
                    key: "name",
                    placeholder: "Full Name",
                    type: "text",
                    span: 1,
                  },
                  {
                    key: "email",
                    placeholder: "Email Address",
                    type: "email",
                    span: 1,
                  },
                  {
                    key: "phone",
                    placeholder: "Phone Number",
                    type: "tel",
                    span: 2,
                  },
                ].map(({ key, placeholder, type, span }) => (
                  <div
                    key={key}
                    style={{
                      gridColumn: span === 2 ? "1 / -1" : "auto",
                      marginBottom: "8px",
                    }}
                  >
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[key]}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, [key]: e.target.value }))
                      }
                      onFocus={() => setFocusedField(key)}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        ...inputStyle(key),
                        "::placeholder": { color: "rgba(12,12,12,0.35)" },
                      }}
                    />
                    <style>{`input[data-field="${key}"]::placeholder { color: rgba(12,12,12,0.35); }`}</style>
                  </div>
                ))}
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
                style={{
                  ...inputStyle("message"),
                  resize: "none",
                  display: "block",
                  marginBottom: "40px",
                  fontFamily: "inherit",
                }}
              />

              <button
                type="button"
                style={{
                  padding: "16px 48px",
                  background: "transparent",
                  border: `0.5px solid ${GOLD}`,
                  color: GOLD,
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  borderRadius: "1px",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD;
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = GOLD;
                }}
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <div
        style={{
          background: DARK,
          padding: "24px 80px",
          borderTop: `0.5px solid rgba(201,169,110,0.15)`,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: "rgba(12,12,12,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()} Interioxcel
          </span>
          <GoldLine width={60} style={{ opacity: 0.2 }} />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
