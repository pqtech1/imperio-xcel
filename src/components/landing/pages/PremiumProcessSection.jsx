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
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(index);
  };

  const handleLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => setActive(0), 120);
    }
  };

  const handleClick = (index) => {
    setActive(index);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #0d0d0d 0%, #141414 50%, #0a0a0a 100%)",
        padding: "clamp(48px, 8vw, 88px) 0",
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
          height: "clamp(40px, 8vw, 80px)",
          background: "linear-gradient(to bottom, transparent, #C9A96E)",
          opacity: 0.4,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 40px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "clamp(32px, 6vw, 52px)",
          }}
        >
          <p
            style={{
              fontSize: "clamp(10px, 2vw, 11px)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "clamp(10px, 2vw, 14px)",
              fontWeight: 500,
            }}
          >
            Our Process
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 6vw, 52px)",
              fontWeight: 300,
              color: "#f5f0e8",
              margin: "0 0 clamp(12px, 2vw, 16px)",
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
              width: "clamp(30px, 6vw, 40px)",
              height: "1px",
              background: "#C9A96E",
              margin: "0 auto",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Accordion Cards - Mobile: Vertical Stack, Desktop: Horizontal Accordion */}
        {isMobile ? (
          // Mobile View: Vertical Stack
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {processSteps.map((step, index) => {
              const isActive = active === index;
              return (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "12px",
                    cursor: "pointer",
                    backgroundColor: "#1a1a1a",
                    border: isActive
                      ? "0.5px solid rgba(201, 169, 110, 0.5)"
                      : "0.5px solid rgba(255,255,255,0.08)",
                    transition: "all 0.3s ease",
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
                        ? "grayscale(0%) brightness(0.5)"
                        : "grayscale(100%) brightness(0.3)",
                      transition: "filter 0.5s ease",
                    }}
                  />

                  {/* Dark gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isActive
                        ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)",
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      position: "relative",
                      padding: "24px 20px",
                      zIndex: 1,
                    }}
                  >
                    {/* Step number and title */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: isActive ? "16px" : "0",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "clamp(11px, 3vw, 13px)",
                          letterSpacing: "0.15em",
                          color: "#C9A96E",
                          fontWeight: 500,
                        }}
                      >
                        {step.subtitle}
                      </div>
                      <div
                        style={{
                          fontSize: "clamp(14px, 4vw, 16px)",
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.9)",
                          textTransform: "uppercase",
                        }}
                      >
                        {step.title}
                      </div>
                    </div>

                    {/* Expanded content */}
                    {isActive && (
                      <div
                        style={{
                          animation: "fadeInUp 0.4s ease",
                          marginTop: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "1px",
                            background: "#C9A96E",
                            marginBottom: "16px",
                          }}
                        />

                        <p
                          style={{
                            fontSize: "clamp(13px, 3.5vw, 14px)",
                            color: "rgba(245,240,232,0.85)",
                            lineHeight: 1.6,
                            margin: "0 0 20px",
                          }}
                        >
                          {step.description}
                        </p>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "12px 16px",
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
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  background: "#C9A96E",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: "clamp(11px, 3vw, 12px)",
                                  color: "white",
                                  letterSpacing: "0.02em",
                                  lineHeight: 1.3,
                                }}
                              >
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Desktop View: Horizontal Accordion
          <div
            style={{
              display: "flex",
              gap: "10px",
              height: "clamp(380px, 35vw, 420px)",
            }}
          >
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
                      top: "clamp(18px, 2vw, 22px)",
                      left: "clamp(18px, 2vw, 22px)",
                      fontSize: "clamp(10px, 1.5vw, 11px)",
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
                        fontSize: "clamp(13px, 1.8vw, 16px)",
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
                      padding:
                        "clamp(20px, 2.5vw, 28px) clamp(20px, 2.5vw, 28px) clamp(24px, 3vw, 30px)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? "translateY(0)"
                        : "translateY(14px)",
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
                        marginBottom: "clamp(10px, 1.5vw, 12px)",
                      }}
                    />

                    <h3
                      style={{
                        fontSize: "clamp(18px, 2.5vw, 22px)",
                        fontWeight: 300,
                        color: "#f5f0e8",
                        margin: "0 0 clamp(8px, 1vw, 10px)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "clamp(13px, 1.5vw, 14px)",
                        color: "rgba(245,240,232,0.68)",
                        lineHeight: 1.6,
                        margin: "0 0 clamp(14px, 2vw, 18px)",
                        maxWidth: "340px",
                      }}
                    >
                      {step.description}
                    </p>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "clamp(5px, 1vw, 7px) clamp(12px, 2vw, 16px)",
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
                              fontSize: "clamp(10px, 1.2vw, 11.5px)",
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
        )}

        {/* Indicator pills - Desktop only */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "clamp(20px, 3vw, 28px)",
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
                  background:
                    active === i ? "#C9A96E" : "rgba(255,255,255,0.18)",
                  transition: "all 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}

        {/* Mobile pagination dots */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "24px",
            }}
          >
            {processSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                style={{
                  width: active === i ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background:
                    active === i ? "#C9A96E" : "rgba(255,255,255,0.3)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "none",
                  padding: 0,
                }}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add keyframes animation for mobile */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PremiumProcessSection;
