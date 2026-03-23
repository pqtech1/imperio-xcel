import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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

import api from "@/lib/api";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";
import { useServices, useFAQs } from "@/hooks/useApiData";
import { PageLoader } from "../Layouts/Header";

// Import shadcn carousel components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Reusable hooks
const useInView = (threshold = 0.15) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
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

// Why Choose Us Card
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
          <BuildingOfficeIcon className="w-7 h-7 text-brand-gold-light" />
        </div>
        <h3
          className="text-base md:text-base font-bold font-sans mb-2 tracking-tight transition-colors duration-300"
          style={{ color: hovered ? "#fff" : "#1a1f26" }}
        >
          {item.title}
        </h3>
        <p
          className="md:text-base leading-relaxed font-sans transition-colors duration-300"
          style={{ color: hovered ? "#bbb" : "#666" }}
        >
          {item.desc}
        </p>
      </div>
    </div>
  );
};

// FAQ Item
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
          {item.question || item.q}
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
        <p className="leading-6 pb-4 pr-8">{item.answer || item.a}</p>
      </div>
    </div>
  );
};

// Service Card Component for What We Do
const ServiceCard = ({ item, index }) => {
  const [ref, visible] = useInView(0.2);
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 1;

  // Get image from the item if available
  const imageUrl = item.image
    ? getImageUrl(item.image)
    : "https://images.pexels.com/photos/1631049/pexels-photo-1631049.jpeg";

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row mb-8 overflow-hidden min-h-72 rounded-lg shadow-md ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Image */}
      <div
        className="w-full md:w-1/2 relative overflow-hidden cursor-pointer min-h-56 md:min-h-0"
        style={{
          transform: visible ? "translateX(0)" : "translateX(-40px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.23,1,0.32,1), opacity 0.7s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-cover block"
          style={{
            filter: hovered
              ? "grayscale(0%) brightness(1.05)"
              : "grayscale(50%)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "filter 0.5s ease, transform 0.5s ease",
          }}
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/1631049/pexels-photo-1631049.jpeg";
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: "#b88a44", opacity: hovered ? 0.15 : 0 }}
        />
      </div>

      {/* Text */}
      <div
        className="w-full md:w-1/2 bg-brand-charcoal px-5 md:px-8 py-6 md:py-8 flex flex-col justify-center"
        style={{
          transform: visible ? "translateX(0)" : "translateX(40px)",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s, opacity 0.7s ease 0.1s",
        }}
      >
        <div
          className="h-0.5 mb-4 transition-all duration-500 delay-300"
          style={{
            width: visible ? "40px" : "0px",
            background: "#b88a44",
          }}
        />
        <h3 className="text-white text-lg md:text-xl font-bold font-serif tracking-wide mb-3">
          {item.title}
        </h3>
        {item.description && (
          <div
            className="text-gray-300 text-base leading-6 font-sans mb-4"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}

        {/* Services list */}
        {item.services && item.services.length > 0 && (
          <ul className="list-none p-0 m-0 space-y-2">
            {item.services.map((service, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-300 font-sans"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(12px)",
                  transition: `opacity 0.4s ease ${0.3 + i * 0.05}s, transform 0.4s ease ${0.3 + i * 0.05}s`,
                }}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-white font-bold mt-1"
                  style={{ background: "#b88a44" }}
                >
                  ✓
                </span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Image Carousel Component
const ImageCarousel = ({ images }) => {
  if (!images || images.length === 0) return null;

  const validImages = images.filter((img) => img && img.src);

  if (validImages.length === 1) {
    return (
      <div className="w-full rounded-lg overflow-hidden">
        <img
          src={validImages[0].src}
          alt={validImages[0].alt}
          className="w-full h-full object-cover"
          style={{ maxHeight: "400px" }}
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg";
          }}
        />
      </div>
    );
  }

  if (validImages.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {validImages.map((img, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              style={{ maxHeight: "400px" }}
              onError={(e) => {
                e.target.src =
                  "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg";
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {validImages.map((img, idx) => (
          <CarouselItem key={idx}>
            <div className="rounded-lg overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                style={{ maxHeight: "500px", minHeight: "300px" }}
                onError={(e) => {
                  e.target.src =
                    "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg";
                }}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch FAQs
  const { data: faqs } = useFAQs();

  // Fetch all services to find the current one
  const { data: services, isLoading: servicesLoading } = useServices();

  useEffect(() => {
    if (services && services.length > 0) {
      // Find service by slug or id
      const found = services.find(
        (s) => s.slug === slug || s.id.toString() === slug,
      );

      if (found) {
        setService(found);
        setError(null);
      } else {
        setError("Service not found");
      }
      setLoading(false);
    }
  }, [services, slug]);

  if (loading || servicesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
            Service Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The service you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-brand-gold text-white rounded-lg hover:bg-brand-gold-light transition-colors"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // Prepare why work with us data from API
  const whyWorkData =
    service.why_work_with_us?.length > 0
      ? service.why_work_with_us.map((item) => ({
          id: item.id,
          title: item.title,
          desc:
            item.tagline || stripHtml(item.description || "").substring(0, 120),
        }))
      : [
          {
            id: 1,
            title: "Experience and Expertise",
            desc: "With 7+ years of experience, we have collaborated with esteemed architects and PMC companies to successfully deliver numerous interior projects.",
          },
          {
            id: 2,
            title: "Personalized Approach",
            desc: "We understand that each client has unique requirements. Our team works closely with you to understand your vision.",
          },
          {
            id: 3,
            title: "Skilled & Expert Team",
            desc: "Our founders bring extensive wealth of experience, spanning decades, in the interior solutions sector.",
          },
        ];

  // Prepare process data from what_we_do
  const processData =
    service.what_we_do?.length > 0
      ? service.what_we_do.slice(0, 3).map((item, index) => ({
          id: index + 1,
          title: item.title,
          desc: stripHtml(item.description || "").substring(0, 100),
        }))
      : [
          {
            id: 1,
            title: "Planning and Design",
            desc: "Understanding designs and drawings, allocating resources for optimal project execution.",
          },
          {
            id: 2,
            title: "Documentation & Estimates",
            desc: "Detailed documentation, estimates, and resource planning for seamless implementation.",
          },
          {
            id: 3,
            title: "Completion & Evaluation",
            desc: "Final execution, quality checks, and project delivery with client satisfaction.",
          },
        ];

  // Get slider images from services_over_view
  const sliderImages =
    service.services_over_view?.flatMap((ov) =>
      ov.images?.map((img) => ({
        id: img,
        src: getImageUrl(img),
        alt: ov.title || "Service image",
      })),
    ) || [];

  // Get hero image
  const heroImage = service.service_banner_img
    ? getImageUrl(service.service_banner_img)
    : "https://images.pexels.com/photos/3741314/pexels-photo-3741314.jpeg";

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <div className="w-full relative">
        <img
          src={heroImage}
          alt={service.service_title}
          className="w-full object-cover block max-h-80 md:max-h-96 lg:max-h-[500px]"
          onError={(e) => {
            e.target.src =
              "https://images.pexels.com/photos/3741314/pexels-photo-3741314.jpeg";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-[2px] bg-brand-gold-light" />
                <h6 className="text-brand-gold-light mb-0 text-sm md:text-base uppercase tracking-wider">
                  {service.service_tagline || "Our Services"}
                </h6>
              </div>

              <h1 className="text-white mb-3 text-3xl md:text-4xl lg:text-5xl font-bold">
                {service.service_title}
              </h1>

              <p className="text-gray-200 mb-0 text-base md:text-lg">
                {service.service_short_description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="mt-10 md:mt-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {service.service_intro_title || "Service Excellence"}
          </h2>
          <p className="text-gray-600 mb-0 text-base md:text-lg leading-relaxed">
            <strong className="text-brand-charcoal">
              {service.service_tagline}
            </strong>
          </p>
          {service.description && (
            <div
              className="text-gray-600 mt-4 text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.description }}
            />
          )}
        </div>
      </div>

      {/* Image Slider/Carousel */}
      {sliderImages.length > 0 && (
        <div className="px-4 md:px-8 lg:px-16 mt-12 md:mt-16">
          <div className="max-w-6xl mx-auto">
            <ImageCarousel images={sliderImages} />
          </div>
        </div>
      )}

      {/* Why Work With Us */}
      <div className="px-4 md:px-8 lg:px-16 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light mb-2">
            Why Work With Us
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-brand-charcoal font-semibold mb-4 italic">
            "We shape our spaces, and then, our spaces shape us."
          </p>
          <p className="text-gray-600 mb-0 text-base md:text-lg leading-relaxed">
            {service.why_work_with_us?.[0]?.description
              ? stripHtml(service.why_work_with_us[0].description)
              : "At InterioXcel, we offer customized interior solutions and devoted customer care with personal assistance. Our team of skilled architects and interior designers plan, research, manage and coordinate every aspect of the design, adding your vision combined with our creativity to accomplish the task magnificently within time."}
          </p>
        </div>
      </div>

      {/* Service Cards from what_we_do */}
      {service.what_we_do && service.what_we_do.length > 0 && (
        <div className="bg-gray-50 pt-12 md:pt-16 pb-8 mt-12 md:mt-16">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h6 className="text-brand-gold-light text-sm md:text-base uppercase tracking-wider mb-2">
              What We Do
            </h6>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
              Our Services
            </h2>
            <div className="w-12 h-0.5 bg-brand-gold-light mx-auto mt-4 rounded" />
          </div>
          <div className="px-4 md:px-8 lg:px-16">
            <div className="max-w-5xl mx-auto">
              {service.what_we_do.map((item, i) => (
                <ServiceCard key={item.id || i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us */}
      <div className="bg-white pt-12 md:pt-16 pb-12 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-8 md:mb-12">
          <h6 className="text-brand-gold-light text-sm md:text-base uppercase tracking-wider mb-2">
            Why Us
          </h6>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            Why Choose Us
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold-light mx-auto mt-4 rounded" />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {whyWorkData.map((item, i) => (
              <WhyCard key={item.id} item={item} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="bg-gray-50 pt-12 md:pt-16 pb-12 md:pb-16 px-4 md:px-8 lg:px-16">
        <div className="text-center mb-8 md:mb-12">
          <h6 className="text-brand-gold-light text-sm md:text-base uppercase tracking-wider mb-2">
            How We Work
          </h6>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
            Our Process
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold-light mx-auto mt-4 rounded" />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {processData.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mb-4 bg-brand-gold-light/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-brand-gold-light">
                    {item.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <div className="bg-white pt-12 md:pt-16 pb-12 md:pb-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h6 className="text-brand-gold-light text-sm md:text-base uppercase tracking-wider mb-2">
                FAQ
              </h6>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-0.5 bg-brand-gold-light mx-auto mt-4 rounded" />
            </div>
            <div>
              {faqs.slice(0, 6).map((item, i) => (
                <FAQItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quality & Safety */}
      <div className="bg-gray-50 pt-12 md:pt-16 pb-12 md:pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2">
              <h6 className="text-brand-gold-light text-sm md:text-base uppercase tracking-wider mb-3">
                OUR COMMITMENT
              </h6>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Quality & Safety{" "}
                <span className="text-brand-gold-light">First</span>
              </h2>
              <div className="w-16 h-[2px] bg-brand-gold-light mb-6" />
              <p className="text-gray-600 mb-4 text-base md:text-lg leading-relaxed">
                At our construction site, quality and safety are our top
                priorities for all laborers involved in interior work. We
                maintain strict adherence to industry standards and regulations
                to ensure the highest quality of craftsmanship and safety for
                our team.
              </p>
              <p className="text-gray-500 mb-0 text-base leading-relaxed">
                We provide comprehensive training, personal protective equipment
                (PPE), and regularly inspect and maintain equipment to mitigate
                risks.
              </p>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[
                {
                  icon: ShieldCheckIcon,
                  title: "PPE Equipment",
                  desc: "Full protective gear",
                },
                {
                  icon: CheckCircleIcon,
                  title: "Regular Inspections",
                  desc: "Daily safety checks",
                },
                {
                  icon: WrenchScrewdriverIcon,
                  title: "Maintenance",
                  desc: "Regular servicing",
                },
                {
                  icon: UserGroupIcon,
                  title: "Team Training",
                  desc: "Safety training",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-amber-50/50 p-4 md:p-6 rounded-lg text-center hover:shadow-md transition-shadow"
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 mx-auto text-brand-gold-light mb-3" />
                    <h4 className="font-bold mb-2 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Get A Quote */}
      <div className="bg-white px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold font-sans mb-3">
            GET A QUOTE
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold-light mx-auto mb-8 md:mb-12" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Contact Info */}
            <div className="w-full md:w-72 md:shrink-0 space-y-6 md:space-y-8">
              {[
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
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} className="flex items-start gap-3 md:gap-4">
                    <div className="shrink-0 mt-0.5 text-brand-gold-light">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold font-sans mb-2 text-sm md:text-base">
                        {c.label}
                      </p>
                      {c.lines.map((l, j) => (
                        <p
                          key={j}
                          className="text-text-main/70 font-sans leading-6 m-0 text-sm"
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
              <form className="space-y-5">
                {[
                  { name: "name", label: "YOUR NAME *", type: "text" },
                  { name: "email", label: "YOUR EMAIL *", type: "email" },
                  { name: "phone", label: "YOUR PHONE", type: "tel" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block tracking-widest text-text-main/60 font-sans uppercase mb-2 text-xs md:text-sm">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      name={f.name}
                      className="w-full border-0 border-b border-gray-300 pb-2 pt-2 text-base font-sans bg-transparent outline-none focus:border-brand-gold-light transition-colors duration-200"
                    />
                  </div>
                ))}
                <div>
                  <label className="block tracking-widest text-text-main/60 font-sans uppercase mb-2 text-xs md:text-sm">
                    PROJECT DETAILS...
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full border-0 border-b border-gray-300 pb-2 pt-2 text-base font-sans bg-transparent outline-none focus:border-brand-gold-light transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="bg-brand-gold-light hover:bg-brand-gold text-white px-6 py-3 rounded-md transition-colors font-medium"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
