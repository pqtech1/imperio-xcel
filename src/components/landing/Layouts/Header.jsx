import { CONTACT, BRAND } from "@/components/constants/constants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useServices } from "@/hooks/useApiData";
import { getImageUrl, stripHtml } from "@/lib/imageUtils";

// Modern Minimal Loader Component
export const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 100 : prev + (100 - prev) * 0.1));
      }, 50);
      return () => clearInterval(interval);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="text-center">
        <div className="text-7xl font-light text-brand-charcoal mb-2 font-heading">
          {Math.min(100, Math.round(progress))}%
        </div>
        <div className="text-sm uppercase tracking-[0.3em] text-brand-gold font-medium">
          LOADING
        </div>
        <div className="w-48 h-[1px] bg-gray-200 mt-6 mx-auto overflow-hidden">
          <div
            className="h-full bg-brand-gold transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const { data: services, loading: servicesLoading } = useServices();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location]);

  const navLinkStyle = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 flex items-center gap-1 py-4 after:content-[''] after:absolute after:bottom-[8px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full ${
      isActive
        ? "text-brand-gold after:w-full"
        : isScrolled
          ? "text-gray-800"
          : "text-white"
    }`;

  const mobileNavStyle = ({ isActive }) =>
    `block py-3 px-4 text-base font-medium rounded-lg transition-all duration-300 ${
      isActive ? "bg-brand-gold text-white" : "text-gray-300 hover:bg-white/10"
    }`;

  return (
    <>
      {isLoading && <PageLoader />}

      {/* TOP BAR */}
      {!isScrolled && (
        <div className="hidden lg:block fixed top-0 left-0 w-full bg-black/30 backdrop-blur-sm text-white/80 text-xs py-2 z-50">
          <div className="container mx-auto section-px flex justify-end items-center gap-6">
            <span>📞 {CONTACT.phone}</span>
            <span>✉️ {CONTACT.email}</span>
          </div>
        </div>
      )}

      {/* MAIN HEADER */}
      <header
        className={`w-full fixed left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-lg py-2 top-0"
            : "bg-transparent py-4 lg:top-8 top-0"
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="container mx-auto section-px">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link
              to="/"
              className="relative z-10 flex items-center gap-3 group"
            >
              <img
                src={BRAND.logo}
                alt={BRAND.name}
                className={`h-12 md:h-14 object-contain transition-all duration-300 ${isScrolled ? "brightness-100" : "brightness-0 invert"}`}
              />
              <span
                className={`italic font-heading text-lg md:text-2xl tracking-wide transition-colors duration-300 ${isScrolled ? "text-brand-charcoal" : "text-white"}`}
              >
                - KK <span className="text-brand-gold">Enterprises</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink to="/" className={navLinkStyle} end>
                HOME
              </NavLink>
              <NavLink to="/portfolio" className={navLinkStyle}>
                PORTFOLIO
              </NavLink>

              {/* SERVICES TRIGGER */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
              >
                <button
                  className={`${navLinkStyle({ isActive: false })} cursor-pointer uppercase`}
                >
                  Services{" "}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === "services" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              {/* COMPANY TRIGGER */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("company")}
              >
                <button
                  className={`${navLinkStyle({ isActive: false })} cursor-pointer uppercase`}
                >
                  Company{" "}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === "company" ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <Link
                to="/contact"
                className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isScrolled ? "bg-brand-gold text-white" : "bg-white text-brand-gold"}`}
              >
                Get Quote
              </Link>
            </nav>

            {/* MOBILE MENU TRIGGER */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger className="lg:hidden">
                <Menu
                  className={`w-7 h-7 ${isScrolled ? "text-gray-800" : "text-white"}`}
                />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-80 bg-brand-charcoal border-none p-0 text-white"
              >
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <img
                      src={BRAND.logo}
                      alt="Logo"
                      className="h-8 brightness-0 invert"
                    />
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-1">
                    <NavLink to="/" className={mobileNavStyle}>
                      HOME
                    </NavLink>
                    <NavLink to="/portfolio" className={mobileNavStyle}>
                      PORTFOLIO
                    </NavLink>

                    {/* MOBILE SERVICES ACCORDION */}
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          setIsMobileServicesOpen(!isMobileServicesOpen)
                        }
                        className="w-full flex items-center justify-between py-3 px-4 text-base font-medium rounded-lg text-gray-300 hover:bg-white/10 transition-all"
                      >
                        SERVICES
                        <ChevronRight
                          className={`w-5 h-5 transition-transform ${isMobileServicesOpen ? "rotate-90" : ""}`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="pl-6 space-y-1 mt-1 border-l border-white/10 ml-4">
                          {servicesLoading ? (
                            <div className="py-2 text-sm text-gray-500">
                              Loading...
                            </div>
                          ) : (
                            services?.map((s) => (
                              <NavLink
                                key={s.id}
                                to={`/${s.slug || s.id}`}
                                className="block py-2 text-gray-400 hover:text-brand-gold transition-colors"
                              >
                                {s.service_title || s.title}
                              </NavLink>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 pb-2 px-4 text-xs font-bold text-brand-gold uppercase tracking-widest">
                      Company
                    </div>
                    {[
                      "About",
                      "Achievement",
                      "Areas We Serve",
                      "Blog",
                      "Contact",
                    ].map((item) => (
                      <NavLink
                        key={item}
                        to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                        className={mobileNavStyle}
                      >
                        {item.toUpperCase()}
                      </NavLink>
                    ))}
                  </div>

                  <div className="p-6 border-t border-white/10">
                    <Link
                      to="/contact"
                      className="block w-full py-3 bg-brand-gold text-center rounded-lg font-bold"
                    >
                      GET FREE QUOTE
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* DESKTOP FULL-WIDTH DROPDOWN */}
        <div
          className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 origin-top overflow-hidden ${
            activeDropdown
              ? "opacity-100 scale-y-100"
              : "opacity-0 scale-y-0 pointer-events-none"
          }`}
        >
          <div className="container mx-auto section-px py-10 overflow-y-auto max-h-[75vh]">
            {activeDropdown === "services" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesLoading ? (
                  <div className="col-span-4 py-20 text-center text-brand-gold">
                    Loading Services...
                  </div>
                ) : (
                  services?.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${service.slug || service.id}`}
                      className="group p-4 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200"
                    >
                      <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={
                            getImageUrl(service.service_banner_img) ||
                            "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
                          }
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-gray-900 font-semibold group-hover:text-brand-gold transition-colors line-clamp-1">
                        {service.service_title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {stripHtml(
                          service.service_short_description || "",
                        ).substring(0, 80)}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            )}

            {activeDropdown === "company" && (
              <div className="grid grid-cols-5 gap-4">
                {[
                  {
                    name: "About Us",
                    path: "/about",
                    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400",
                  },
                  {
                    name: "Achievements",
                    path: "/achievement",
                    img: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?w=400",
                  },
                  {
                    name: "Areas We Serve",
                    path: "/areas-we-serve",
                    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400",
                  },
                  {
                    name: "Blog",
                    path: "/blog",
                    img: "https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?w=400",
                  },
                  {
                    name: "Contact Us",
                    path: "/contact",
                    img: "https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?w=400",
                  },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group text-center p-4 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <div className="aspect-square mb-3 overflow-hidden rounded-full max-w-[100px] mx-auto border-2 border-transparent group-hover:border-brand-gold transition-all">
                      <img
                        src={item.img}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        alt=""
                      />
                    </div>
                    <span className="font-medium text-gray-800 group-hover:text-brand-gold block text-sm uppercase tracking-wide">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
