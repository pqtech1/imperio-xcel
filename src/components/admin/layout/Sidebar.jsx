import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings2,
  LogOut,
  Folder,
  Users,
  FileText,
  MessageSquare,
  Trophy,
  HelpCircle,
  MapPin,
  Contact,
} from "lucide-react";
import { asset } from "@/components/constants/constants";
import api from "@/lib/api";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Services",
    icon: Settings2,
    path: "/admin/dashboard/services",
  },
  {
    name: "Projects",
    icon: Folder,
    path: "/admin/dashboard/projects",
  },
  {
    name: "Clients",
    icon: Users,
    path: "/admin/dashboard/clients",
  },
  {
    name: "Blogs",
    icon: FileText,
    path: "/admin/dashboard/blogs",
  },

  {
    name: "Testimonials",
    icon: MessageSquare,
    path: "/admin/dashboard/testimonials",
  },
  {
    name: "Achievements",
    icon: Trophy,
    path: "/admin/dashboard/achievements",
  },
  {
    name: "FAQs",
    icon: HelpCircle,
    path: "/admin/dashboard/faqs",
  },
  {
    name: "Areas We Serve",
    icon: MapPin,
    path: "/admin/dashboard/areas",
  },
  {
    name: "Meet Our Team",
    icon: Contact,
    path: "/admin/dashboard/teams",
  },
];

const Sidebar = ({ collapsed, mobileOpen, setMobileOpen, isMobile }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {}

    localStorage.removeItem("token");

    navigate("/admin/dashboard/");
  };
  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`
    bg-gray-900 text-white
    fixed top-0 left-0 h-full z-50
    transition-all duration-300 ease-in-out
    ${collapsed ? "w-16" : "w-48"}
    ${mobileOpen ? "left-0" : "-left-48 md:left-0"}
    shadow-xl
  `}
      >
        {/* Logo area */}
        <div
          className={`
            bg-white flex items-center h-16 border-b border-gray-200
            ${collapsed ? "justify-center px-0" : "px-4"}
          `}
        >
          {!collapsed ? (
            <img
              src={asset("interio-xcel-logo.jpeg")}
              alt="Logo"
              className="h-8 object-contain"
            />
          ) : (
            <img
              src={asset("favicon.jpeg")}
              alt="Icon"
              className="h-6 object-contain"
            />
          )}

          {/* Close button - mobile only */}
          <button
            className="md:hidden p-1 hover:bg-gray-100 transition-colors absolute right-2 text-gray-600"
            onClick={closeMobile}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {menu.map((item, i) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={i}
                to={item.path}
                end={item.path === "/admin"}
                onClick={closeMobile}
                className={({ isActive }) => `
                  flex items-center gap-3 px-0 py-3
                  transition-all duration-200 group relative
                  border-l-2
                  ${collapsed ? "justify-center" : "pl-4"}
                  ${
                    isActive
                      ? "bg-gray-800 border-gray-900 text-white"
                      : "border-transparent text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  }
                `}
              >
                <Icon
                  size={18}
                  className={`
                  transition-transform group-hover:scale-105
                  ${!collapsed && "min-w-[18px]"}
                `}
                />

                {!collapsed && (
                  <span className="text-xs font-medium tracking-wide">
                    {item.name}
                  </span>
                )}

                {/* Tooltip for collapsed mode */}
                {collapsed && !isMobile && (
                  <div
                    className="
                    absolute left-full ml-2 px-2 py-1 
                    bg-gray-900 text-white text-xs
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    transition-all whitespace-nowrap
                    border border-gray-700
                  "
                  >
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout button at bottom */}
        <div className="absolute bottom-4 left-0 right-0 px-0">
          <button
            onClick={handleLogout} // ✅ add this
            className={`
      flex items-center gap-3 py-3 w-full
      text-gray-400 hover:bg-gray-800/50 hover:text-gray-300
      transition-all duration-200 border-l-2 border-transparent hover:border-gray-600
      ${collapsed ? "justify-center" : "pl-4"}
    `}
          >
            <LogOut size={18} />
            {!collapsed && (
              <span className="text-xs font-medium tracking-wide">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
