import {
  BarChart3,
  Building2,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from "lucide-react";

import type { SidebarSection } from "../types/sidebar.types";

export const superAdminSidebar: SidebarSection[] = [
  {
    title: "OVERVIEW",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "PLATFORM",
    items: [
      {
        label: "Organizations",
        path: "/organizations",
        icon: Building2,
      },
      {
        label: "Users",
        path: "/users",
        icon: Users,
      },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      {
        label: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
      {
        label: "Audit Logs",
        path: "/audit-logs",
        icon: Shield,
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        label: "Platform Settings",
        path: "/platform/settings",
        icon: Settings,
      },
    ],
  },
];