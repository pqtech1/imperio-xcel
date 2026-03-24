import { useState, useRef, useEffect } from "react";

const processSteps = [
  {
    title: "Discovery & Vision",
    subtitle: "01",
    description:
      "Every exceptional interior begins with listening. We immerse ourselves in your lifestyle, aesthetic sensibilities, and spatial aspirations — translating the intangible into a precise creative brief that becomes the north star for everything that follows.",
    image: "img/process/consultancy-planning.avif",
    keyPoints: [
      "Lifestyle & habit analysis",
      "Spatial flow mapping",
      "Budget architecture",
      "Mood & material curation",
    ],
  },
  {
    title: "Design & Craft",
    subtitle: "02",
    description:
      "Concepts become tangible through photorealistic 3D renders, material boards, and virtual walkthroughs. You inhabit every room before a single wall is touched — refining until the design feels undeniably yours.",
    image: "img/process/design.avif",
    keyPoints: [
      "3D photorealistic renders",
      "Material & finish selection",
      "Lighting design",
      "Virtual walkthrough",
    ],
  },
  {
    title: "Build & Deliver",
    subtitle: "03",
    description:
      "Master craftsmen bring the design to life with surgical precision. Every joint, surface, and fixture is held to an exacting standard — delivered on schedule, with zero compromise on the quality you were promised.",
    image: "img/process/execution.avif",
    keyPoints: [
      "Premium material sourcing",
      "Artisan craftsmanship",
      "Site quality audits",
      "White-glove handover",
    ],
  },
];

const PremiumProcessSection = () => {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef(null);

  const handleEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(index);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActive(0), 120);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #0d0d0d 0%, #141414 50%, #0a0a0a 100%)",
        padding: "88px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "80px",
          background: "linear-gradient(to bottom, transparent, #C9A96E)",
          opacity: 0.4,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "14px",
              fontWeight: 500,
            }}
          >
            Our Process
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 300,
              color: "#f5f0e8",
              margin: "0 0 16px",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            From Concept
            <br />
            <em style={{ fontStyle: "italic", color: "#C9A96E" }}>
              to Creation
            </em>
          </h2>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#C9A96E",
              margin: "0 auto",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Accordion Cards */}
        <div style={{ display: "flex", gap: "10px", height: "420px" }}>
          {processSteps.map((step, index) => {
            const isActive = active === index;
            return (
              <div
                key={index}
                onMouseEnter={() => handleEnter(index)}
                onMouseLeave={handleLeave}
                style={{
                  flexGrow: isActive ? 2.8 : 1,
                  flexShrink: 1,
                  flexBasis: 0,
                  minWidth: 0,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "flex-grow 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
                  border: isActive
                    ? "0.5px solid rgba(201, 169, 110, 0.35)"
                    : "0.5px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Background image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${step.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: isActive
                      ? "grayscale(0%) brightness(0.55) contrast(1.05)"
                      : "grayscale(100%) brightness(0.25)",
                    transform: isActive ? "scale(1.06)" : "scale(1.0)",
                    transition:
                      "filter 0.9s cubic-bezier(0.76, 0, 0.24, 1), transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />

                {/* Dark gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)",
                    transition: "background 0.9s ease",
                  }}
                />

                {/* Gold shimmer on active */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(201,169,110,0.07) 0%, transparent 60%)",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.9s ease",
                    pointerEvents: "none",
                  }}
                />

                {/* Step number */}
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    left: "22px",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: isActive ? "#C9A96E" : "rgba(255,255,255,0.22)",
                    fontWeight: 500,
                    transition: "color 0.6s ease",
                  }}
                >
                  {step.subtitle}
                </div>

                {/* Collapsed: vertical title */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: isActive ? 0 : 1,
                    transition: "opacity 0.35s ease",
                    pointerEvents: isActive ? "none" : "auto",
                  }}
                >
                  <span
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "16px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    padding: "26px 28px 30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(14px)",
                    transition:
                      "opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.25s, transform 0.55s cubic-bezier(0.4, 0, 0.2, 1) 0.25s",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  {/* Gold bar */}
                  <div
                    style={{
                      width: "28px",
                      height: "1px",
                      background: "#C9A96E",
                      marginBottom: "12px",
                    }}
                  />

                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: 300,
                      color: "#f5f0e8",
                      margin: "0 0 10px",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "16px",
                      color: "rgba(245,240,232,0.68)",
                      lineHeight: 1.65,
                      margin: "0 0 18px",
                      maxWidth: "340px",
                    }}
                  >
                    {step.description}
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "7px 16px",
                    }}
                  >
                    {step.keyPoints.map((point, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "4px",
                            height: "4px",
                            borderRadius: "50%",
                            background: "#C9A96E",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: "11.5px",
                            color: "white",
                            letterSpacing: "0.02em",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicator pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "28px",
          }}
        >
          {processSteps.map((_, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? "28px" : "6px",
                height: "2px",
                borderRadius: "1px",
                background: active === i ? "#C9A96E" : "rgba(255,255,255,0.18)",
                transition: "all 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumProcessSection;
