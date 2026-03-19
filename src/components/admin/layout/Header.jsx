import { Menu, Bell, Search, User } from "lucide-react";
import { useState } from "react";

const Header = ({ collapsed, setCollapsed, setMobileOpen, isMobile }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 z-40">
      {" "}
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 transition-colors mr-1"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={18} className="text-gray-600" />
        </button>

        {/* Desktop collapse button */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 transition-colors hidden md:block"
          >
            <Menu size={18} className="text-gray-600" />
          </button>
        )}
      </div>
      <div className="flex items-center">
        {/* Search - mobile */}
        <button className="p-2 hover:bg-gray-100 transition-colors md:hidden">
          <Search size={18} className="text-gray-600" />
        </button>

        {/* Search - desktop */}
        <div className="hidden md:flex items-center border border-gray-300 px-3 py-1.5 mr-2">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none text-sm ml-2 w-48 placeholder:text-gray-400 text-gray-900"
          />
        </div>

        {/* Notification bell */}
        <button className="relative p-2 hover:bg-gray-100 transition-colors mx-1">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
        </button>

        {/* Profile dropdown */}
        <div className="relative ml-1">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 bg-gray-800 flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              Admin
            </span>
          </button>

          {/* Dropdown menu */}
          {showProfile && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfile(false)}
              />
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 shadow-sm py-0.5 z-50">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Settings
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
