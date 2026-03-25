import { Link } from "react-router-dom";
import { BRAND, CONTACT, SOCIAL } from "@/components/constants/constants";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaPalette,
  FaHome,
  FaBuilding,
  FaStore,
  FaHotel,

} from "react-icons/fa";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { useServices } from "@/hooks/useApiData";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { data: services, loading: servicesLoading } = useServices();

  // Navigation links exactly matching Header
  const mainNavigation = [
    { name: "HOME", path: "/" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "ABOUT", path: "/about" },
    { name: "ACHIEVEMENT", path: "/achievement" },
    { name: "AREAS WE SERVE", path: "/areas-we-serve" },
    { name: "BLOG", path: "/blog" },
    { name: "CONTACT", path: "/contact" },
  ];

  const socialIcons = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      href: SOCIAL.facebook,
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: SOCIAL.instagram,
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      href: SOCIAL.linkedin,
    },
    {
      icon: FaYoutube,
      label: "YouTube",
      href: SOCIAL.youtube,
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: SOCIAL.whatsapp,
    },
  ];

  // Get icon based on service title
  const getServiceIcon = (title) => {
    const lowerTitle = title?.toLowerCase() || "";
    if (lowerTitle.includes("home") || lowerTitle.includes("residential"))
      return FaHome;
    if (lowerTitle.includes("commercial") || lowerTitle.includes("office"))
      return FaBuilding;
    if (lowerTitle.includes("retail") || lowerTitle.includes("store"))
      return FaStore;
    if (lowerTitle.includes("hotel") || lowerTitle.includes("hospitality"))
      return FaHotel;
    if (lowerTitle.includes("corporate")) return FaHome;
    return FaPalette;
  };

  return (
    <footer className="bg-brand-charcoal text-gray-300 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold-light via-brand-gold to-brand-gold-light" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column - 3 cols */}
          <div className="lg:col-span-3">
            <Link to="/" className="inline-block mb-6">
              <img
                src={BRAND.logo}
                alt={BRAND.name}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Creating exceptional spaces through innovative design and
              meticulous execution. Your trusted partner in interior design and
              architecture since 2017.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400 border border-gray-700">
                ISO 9001:2015
              </span>
              <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400 border border-gray-700">
                IIID Member
              </span>
              <span className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400 border border-gray-700">
                7+ Years
              </span>
            </div>
          </div>

          {/* Quick Links - 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {mainNavigation.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-brand-gold-light transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 text-brand-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">
              Contact Us
            </h4>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3 group">
                <div className="mt-1 text-brand-gold-light">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">HEAD OFFICE</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {CONTACT.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 group">
                <div className="mt-1 text-brand-gold-light">
                  <FaPhone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">PHONE</p>
                  <p className="text-sm text-gray-400 hover:text-brand-gold-light transition-colors">
                    {CONTACT.phone}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className="mt-1 text-brand-gold-light">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">EMAIL</p>
                  <p className="text-sm text-gray-400 hover:text-brand-gold-light transition-colors">
                    {CONTACT.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3">FOLLOW US</p>
              <div className="flex gap-3">
                {socialIcons.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 border border-gray-700 hover:border-brand-gold-light hover:text-brand-gold-light transition-all duration-300 transform hover:scale-110"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Signup - 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">
              Stay Updated
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for design inspiration and updates.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold-light"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-gold-light text-white rounded-lg text-sm font-medium hover:bg-brand-gold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Services Section - Full Width with Flex Wrap */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6 text-center">
            Our Services
          </h4>
          {servicesLoading ? (
            <div className="text-center text-sm text-gray-500 py-4">
              Loading services...
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3">
              {services?.map((service) => {
                const Icon = getServiceIcon(
                  service.service_title || service.title,
                );
                return (
                  <Link
                    key={service.id}
                    to={`/${service.slug || service.id}`}
                    className="group inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 hover:bg-brand-gold/10 border border-gray-700 hover:border-brand-gold-light rounded-full transition-all duration-300"
                  >
                    <Icon className="w-3.5 h-3.5 text-brand-gold-light group-hover:text-brand-gold-light transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-brand-gold-light transition-colors">
                      {service.service_title || service.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Stats Bar - Minimal achievement stats */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-light">7+</div>
              <div className="text-xs text-gray-500 mt-1">
                Years of Excellence
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-light">
                50+
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-light">
                40+
              </div>
              <div className="text-xs text-gray-500 mt-1">Bank Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-gold-light">8+</div>
              <div className="text-xs text-gray-500 mt-1">Districts Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Glitch Effect Footer - Full Width with Larger Text */}
      <div className="w-full bg-black/40 border-t border-gray-800/50">
        <div className="w-full px-4">
          <div className="flex flex-col items-center justify-center space-y-8 py-8">
            {/* InterioXcel with Glitch Effect */}
            <div className="relative w-full overflow-hidden">
              <h1 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black tracking-tighter text-center whitespace-nowrap leading-none">
                <span className="relative inline-block">
                  <span className="relative z-10 text-white/90">Interio</span>
                  <span className="relative inline-block">
                    <span className="relative z-10 text-white/90">Xcel</span>
                    {/* Fast animation on Xcel using LineShadowText - Always visible */}
                    <LineShadowText
                      className="absolute inset-0 flex items-center justify-center text-brand-gold-light italic font-black text-[15vw] md:text-[12vw] lg:text-[10vw]"
                      shadowColor="rgba(255,255,255,0.8)"
                    >
                      Xcel
                    </LineShadowText>
                  </span>
                </span>
              </h1>

              {/* Glitch effect layers - Always visible */}
              <div className="absolute inset-0 -z-10 opacity-70">
                <div className="absolute top-0 left-0 text-[15vw] md:text-[12vw] lg:text-[10vw] font-black tracking-tighter text-red-500/40 translate-x-2 translate-y-1 animate-pulse">
                  InterioXcel
                </div>
                <div className="absolute top-0 left-0 text-[15vw] md:text-[12vw] lg:text-[10vw] font-black tracking-tighter text-blue-500/40 -translate-x-2 -translate-y-1 animate-pulse [animation-delay:150ms]">
                  InterioXcel
                </div>
                <div className="absolute top-0 left-0 text-[15vw] md:text-[12vw] lg:text-[10vw] font-black tracking-tighter text-green-500/40 translate-x-1 -translate-y-2 animate-pulse [animation-delay:300ms]">
                  InterioXcel
                </div>
                <div className="absolute top-0 left-0 text-[15vw] md:text-[12vw] lg:text-[10vw] font-black tracking-tighter text-purple-500/40 -translate-x-1 translate-y-2 animate-pulse [animation-delay:450ms]">
                  InterioXcel
                </div>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                © {currentYear} InterioXcel. All rights reserved.
                <br className="hidden sm:inline" />
                Design & Developed by{" "}
                <a
                  href="https://positivequadrant.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-gold-light hover:text-brand-gold transition-colors font-medium"
                >
                  Positive Quadrant Technologies LLP
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
