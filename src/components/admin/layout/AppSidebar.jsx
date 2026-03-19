// src/components/admin/dashboard/AppSidebar.jsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings2, LogOut } from "lucide-react";
import { asset } from "@/components/constants/constants";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin",
  },
  {
    title: "Services",
    icon: Settings2,
    url: "/admin/dashboard/services/create",
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-slate-200 bg-black">
        <div
          className={`flex items-center ${collapsed ? "justify-center" : "px-4"} py-3`}
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
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 py-2 ${
                          isActive
                            ? "border-l-2 border-amber-600 bg-slate-800 text-white"
                            : "border-l-2 border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-white"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-xs font-medium tracking-wide">
                        {item.title}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-slate-900 border-t border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-slate-800/50 hover:text-amber-600 text-slate-400">
              <LogOut className="h-4 w-4" />
              <span className="text-xs font-medium tracking-wide">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
