
import { BarChart3, Send } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin/dashboard", icon: BarChart3 },
  { title: "Send Offer", url: "/admin/send-offer", icon: Send },
];

export function AdminSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || (path === "/admin/dashboard" && currentPath === "/admin");
  const getNavCls = (path: string) =>
    isActive(path) ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100 text-gray-700";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-white border-r border-gray-200`}
      collapsible
    >
      <SidebarContent className="bg-white">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SR</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-gray-900">SmartRetailer</h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 mb-2">
            {!collapsed && "Main Menu"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`${getNavCls(item.url)} flex items-center gap-3 px-3 py-2 rounded-lg transition-colors`}>
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
