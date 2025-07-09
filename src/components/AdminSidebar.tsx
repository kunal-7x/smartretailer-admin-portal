
import { BarChart3, Send, TrendingUp, Settings } from "lucide-react";
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
  { title: "Analytics", url: "/admin/analytics", icon: TrendingUp },
];

const settingsItems = [
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || (path === "/admin/dashboard" && currentPath === "/admin");
  const getNavCls = (path: string) =>
    isActive(path) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted text-muted-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} bg-background border-r border-border`}
      collapsible="icon"
    >
      <SidebarContent className="bg-background flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SR</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">SmartRetailer</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 mb-2">
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
        </div>

        <div className="mt-auto">
          <SidebarGroup className="px-3 py-4 border-t border-border">
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-3 mb-2">
              {!collapsed && "System"}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {settingsItems.map((item) => (
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
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
