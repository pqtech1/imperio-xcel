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
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Achievements", path: "/achievement" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "Interior Design", path: "/interior-design" },
    { name: "Architecture", path: "/architecture" },
    { name: "Turnkey Solutions", path: "/turnkey-solutions" },
   
  ];

  const socialIcons = [
    {
      icon: FaFacebookF,
      label: "Facebook",
      href: SOCIAL.facebook,
      color: "hover:text-[#1877F2]",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: SOCIAL.instagram,
      color: "hover:text-[#E4405F]",
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      href: SOCIAL.linkedin,
      color: "hover:text-[#0A66C2]",
    },
    {
      icon: FaYoutube,
      label: "YouTube",
      href: SOCIAL.youtube,
      color: "hover:text-[#FF0000]",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      href: SOCIAL.whatsapp,
      color: "hover:text-[#25D366]",
    },
  ];

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

          {/* Quick Links - 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
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

          {/* Services - 2 cols */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sm text-gray-400 hover:text-brand-gold-light transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 text-brand-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {service.name}
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

            {/* Social Icons - Now only one set */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3">FOLLOW US</p>
              <div className="flex gap-3">
                {socialIcons.map(({ icon: Icon, label, href, color }) => (
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

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-500">
              © {currentYear} {BRAND.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-600">
              <Link
                to="/privacy-policy"
                className="hover:text-brand-gold-light transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="hover:text-brand-gold-light transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="hover:text-brand-gold-light transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
