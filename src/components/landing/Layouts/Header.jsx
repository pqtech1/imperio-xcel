"use client";

import { CONTACT, BRAND } from "@/components/constants/constants";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

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
        : "text-gray-300 hover:bg-brand-gold/10 hover:text-brand-gold"
    }`;

  return (
    <>
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
            <Link to="/" className="relative z-10">
              <img
                src={BRAND.logo}
                alt={BRAND.name}
                className={`h-10 md:h-12 object-contain transition-all duration-300 ${
                  isScrolled ? "brightness-100" : "brightness-0 invert"
                }`}
              />
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-1 lg:gap-4">
                  <NavigationMenuItem>
                    <NavLink to="/" className={navLinkStyle} end>
                      HOME
                    </NavLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavLink to="/about" className={navLinkStyle}>
                      ABOUT
                    </NavLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`bg-transparent px-3 py-2 text-sm font-medium tracking-wide hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      SERVICES
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-72 p-2 bg-white rounded-lg shadow-xl border border-gray-100">
                        <ul className="space-y-1">
                          <li>
                            <NavLink
                              to="/furniture-interior-services"
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-gold/5 hover:text-brand-gold rounded-md transition-colors"
                            >
                              <span className="font-medium">
                                Interior Designer
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Expert interior design solutions
                              </p>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/architecture"
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-gold/5 hover:text-brand-gold rounded-md transition-colors"
                            >
                              <span className="font-medium">Architecture</span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Modern architectural designs
                              </p>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/turnkey-interior"
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-gold/5 hover:text-brand-gold rounded-md transition-colors"
                            >
                              <span className="font-medium">
                                Turnkey Solutions
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Complete interior solutions
                              </p>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavLink to="/portfolio" className={navLinkStyle}>
                      PORTFOLIO
                    </NavLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavLink to="/achievement" className={navLinkStyle}>
                      ACHIEVEMENTS
                    </NavLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavLink to="/blog" className={navLinkStyle}>
                      BLOG
                    </NavLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavLink to="/contact" className={navLinkStyle}>
                      CONTACT
                    </NavLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* RIGHT SIDE - ACTIONS */}
            <div className="flex items-center gap-4">
              
              {/* Get Quote Button */}
              <Link
                to="/contact"
                className={`hidden lg:block px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105 ${
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
                  closeIcon={false} // This disables the default close icon
                >
                  <div className="flex flex-col h-full">
                    {/* Mobile Menu Header - Now with only our custom white close button */}
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
                          to="/about"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          ABOUT
                        </NavLink>

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

                        <div className="pt-4 pb-2">
                          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Company
                          </p>
                        </div>

                        <NavLink
                          to="/portfolio"
                          className={mobileNavStyle}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          PORTFOLIO
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
