import { CONTACT, BRAND } from "@/components/constants/constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu, Search, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

// Modern Minimal Loader Component
const PageLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Simulate loading progress with easing
          return prev + (100 - prev) * 0.1;
        });
      }, 50);

      return () => clearInterval(interval);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="text-center">
        {/* Percentage Counter */}
        <div className="text-7xl font-light text-brand-charcoal mb-2 font-heading">
          {Math.min(100, Math.round(progress))}%
        </div>

        {/* Loading Text */}
        <div className="text-sm uppercase tracking-[0.3em] text-brand-gold font-medium">
          LOADING
        </div>

        {/* Minimal Progress Bar */}
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
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle route changes with loader
  useEffect(() => {
    setIsMobileMenuOpen(false);

    // Show loader on route change
    setIsLoading(true);

    // Simulate loading time (you can adjust this based on actual loading needs)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  // Show loader on initial page load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navLinkStyle = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-gold after:transition-all after:duration-300 hover:after:w-full ${
      isActive
        ? "text-brand-gold after:w-full"
        : isScrolled
          ? "text-gray-800"
          : "text-white"
    }`;

  const mobileNavStyle = ({ isActive }) =>
    `block py-2 px-4 text-base font-medium rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-brand-gold text-white"
        : "text-gray-300 hover:bg-brand-gold hover:text-white"
    }`;

  return (
    <>
      {/* Page Loader */}
      {isLoading && <PageLoader />}

      {/* TOP BAR - Optional but adds premium feel */}
      {!isScrolled && (
        <div className="hidden lg:block fixed top-0 left-0 w-full bg-black/30 backdrop-blur-sm text-white/80 text-xs py-2 z-50">
          <div className="container mx-auto section-px flex justify-end items-center gap-6">
            <span>📞 {CONTACT.phone}</span>
            <span>✉️ {CONTACT.email}</span>
          </div>
        </div>
      )}

      {/* MAIN HEADER */}
      <div
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
        } ${!isScrolled && "lg:top-8"}`}
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
                className={`h-12 md:h-14 object-contain transition-all duration-300 ${
                  isScrolled ? "brightness-100" : "brightness-0 invert"
                }`}
              />

              <span
                className={`italic font-heading text-lg md:text-2xl tracking-wide transition-colors duration-300 ${
                  isScrolled ? "text-brand-charcoal" : "text-white"
                }`}
              >
                - KK <span className="text-brand-gold">Enterprises</span>
              </span>
            </Link>

            {/* DESKTOP MENU - WITH EVEN SPACING */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center">
                  {/* HOME - Fixed width for even spacing */}
                  <NavigationMenuItem className="w-24 flex justify-center">
                    <NavLink to="/" className={navLinkStyle} end>
                      HOME
                    </NavLink>
                  </NavigationMenuItem>

                  {/* PORTFOLIO - Fixed width for even spacing */}
                  <NavigationMenuItem className="w-24 flex justify-center">
                    <NavLink to="/portfolio" className={navLinkStyle}>
                      PORTFOLIO
                    </NavLink>
                  </NavigationMenuItem>

                  {/* SERVICES Dropdown - Fixed width for even spacing */}
                  <NavigationMenuItem className="w-28 flex justify-center">
                    <NavigationMenuTrigger
                      className={`bg-transparent px-0 py-2 text-sm font-medium tracking-wide hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      SERVICES
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-150 p-2 bg-white rounded-lg shadow-xl border border-gray-100">
                        <div className="grid grid-cols-2 gap-2">
                          {/* Card 1 */}
                          <NavLink
                            to="/furniture-interior-services"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://cdn.home-designing.com/wp-content/uploads/2022/03/modern-sofa-1024x602.jpg"
                                alt="Interior Designer"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Interior Designer
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Expert interior design solutions
                            </p>
                          </NavLink>

                          {/* Card 2 */}
                          <NavLink
                            to="/architecture"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://t3.ftcdn.net/jpg/06/52/11/36/360_F_652113635_7g9CSthI86C354xL72T5TGblhBm7cfou.jpg"
                                alt="Architecture"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Architecture
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Modern architectural designs
                            </p>
                          </NavLink>

                          {/* Card 3 */}
                          <NavLink
                            to="/turnkey-interior"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://zoeafountain.com/wp-content/uploads/2020/05/iStock-599783022.jpg"
                                alt="Turnkey Solutions"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Turnkey Solutions
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Complete interior solutions
                            </p>
                          </NavLink>

                          {/* Card 4 */}
                          <NavLink
                            to="/competence"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://www.gotooptimal.com.au/wp-content/uploads/2014/08/Our-Services-e1409546099161.jpg"
                                alt="Our Competence"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Our Competence
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              18+ specialized domains
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* COMPANY Dropdown - Fixed width for even spacing */}
                  <NavigationMenuItem className="w-28 flex justify-center">
                    <NavigationMenuTrigger
                      className={`bg-transparent px-0 py-2 text-sm font-medium tracking-wide hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      COMPANY
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-180 p-2 bg-white rounded-lg shadow-xl border border-gray-100">
                        <div className="grid grid-cols-3 gap-2">
                          {/* About Card */}
                          <NavLink
                            to="/about"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFib3V0JTIwdXN8ZW58MHx8MHx8fDA%3D"
                                alt="About Us"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              About Us
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Our story & mission
                            </p>
                          </NavLink>

                          

                          {/* Achievements Card */}
                          <NavLink
                            to="/achievement"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://thumbs.dreamstime.com/b/achievements-complex-like-puzzle-pictured-as-word-pieces-being-complicated-topic-to-show-needs-cooperating-fit-377102762.jpg"
                                alt="Achievements"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Achievements
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Milestones & recognition
                            </p>
                          </NavLink>

                          {/* Blog Card */}
                          <NavLink
                            to="/blog"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
                                alt="Blog"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Blog
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Insights & updates
                            </p>
                          </NavLink>

                          {/* Contact Card */}
                          <NavLink
                            to="/contact"
                            className="block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww"
                                alt="Contact Us"
                                className="w-full h-20 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Contact Us
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Get in touch with us
                            </p>
                          </NavLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* RIGHT SIDE - ACTIONS */}
            <div className="flex items-center gap-4">
              {/* Get Quote Button */}
              <Link
                to="/contact"
                className={`hidden lg:block px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? "bg-brand-gold text-white hover:bg-brand-gold-light shadow-md"
                    : "bg-white text-brand-gold hover:bg-gray-100"
                }`}
              >
                Get Quote
              </Link>

              {/* MOBILE MENU TRIGGER */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger className="lg:hidden">
                  <Menu
                    className={`w-6 h-6 transition-colors ${
                      isScrolled ? "text-gray-800" : "text-white"
                    }`}
                  />
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-80 bg-gray-900 border-none p-0"
                  closeIcon={false}
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-800">
                      <img
                        src={BRAND.logo}
                        alt={BRAND.name}
                        className="h-8 brightness-0 invert"
                      />
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close menu"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                      <div className="space-y-1">
                        <NavLink
                          to="/"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                          end
                        >
                          HOME
                        </NavLink>

                        <NavLink
                          to="/portfolio"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          PORTFOLIO
                        </NavLink>

                        {/* Services Section */}
                        <div className="pt-4 pb-2">
                          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Services
                          </p>
                        </div>

                        <NavLink
                          to="/furniture-interior-services"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Interior Designer
                        </NavLink>

                        <NavLink
                          to="/architecture"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Architecture
                        </NavLink>

                        <NavLink
                          to="/turnkey-interior"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Turnkey Solutions
                        </NavLink>

                        <NavLink
                          to="/competence"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Our Competence
                        </NavLink>

                        {/* Company Section */}
                        <div className="pt-4 pb-2">
                          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Company
                          </p>
                        </div>

                        <NavLink
                          to="/about"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          ABOUT
                        </NavLink>

                        <NavLink
                          to="/achievement"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          ACHIEVEMENTS
                        </NavLink>

                        <NavLink
                          to="/blog"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          BLOG
                        </NavLink>

                        <NavLink
                          to="/contact"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          CONTACT
                        </NavLink>
                      </div>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="p-6 border-t border-gray-800">
                      <Link
                        to="/contact"
                        className="block w-full px-6 py-3 text-center bg-brand-gold text-white font-medium rounded-lg hover:bg-brand-gold-light transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Free Quote
                      </Link>
                      <div className="mt-4 text-sm text-gray-400 text-center">
                        <p>📞 {CONTACT.phone}</p>
                        <p className="mt-1">✉️ {CONTACT.email}</p>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
