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
        : "text-gray-300 hover:bg-brand-gold hover:text-white"
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

            {/* DESKTOP MENU - RESTRUCTURED */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="flex gap-1 lg:gap-2 xl:gap-4">
                  {/* Primary Navigation Items */}
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

                  {/* SERVICES Dropdown - Main Link */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`bg-transparent px-3 py-2 text-sm font-medium tracking-wide hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent ${
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
                              // Force close dropdown by triggering a click outside
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

                  {/* COMPANY Dropdown - For less important links */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`bg-transparent px-3 py-2 text-sm font-medium tracking-wide hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      COMPANY
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-140 p-2 bg-white rounded-lg shadow-xl border border-gray-100">
                        <div className="flex space-x-2">
                          {/* Card 1 */}
                          <NavLink
                            to="/portfolio"
                            className="flex-1 block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://i.ytimg.com/vi/TwYKwaEjJd4/maxresdefault.jpg"
                                alt="Portfolio"
                                className="w-full h-24 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                            </div>
                            <span className="font-medium text-gray-700 group-hover:text-brand-gold transition-colors duration-300">
                              Portfolio
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-700 transition-colors duration-300">
                              Our featured projects
                            </p>
                          </NavLink>

                          {/* Card 2 */}
                          <NavLink
                            to="/achievement"
                            className="flex-1 block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://thumbs.dreamstime.com/b/achievements-complex-like-puzzle-pictured-as-word-pieces-being-complicated-topic-to-show-needs-cooperating-fit-377102762.jpg"
                                alt="Achievements"
                                className="w-full h-24 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
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

                          {/* Card 3 */}
                          <NavLink
                            to="/blog"
                            className="flex-1 block bg-white rounded-lg border border-gray-100 shadow hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-brand-gold/30 group p-2"
                            onClick={() => {
                              document.body.click();
                            }}
                          >
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src="https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D"
                                alt="Blog"
                                className="w-full h-24 object-cover rounded-md group-hover:scale-105 transition-transform duration-500"
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
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* CONTACT - Primary Link */}
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

                    {/* Mobile Navigation Links - RESTRUCTURED */}
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
