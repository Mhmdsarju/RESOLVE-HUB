import {
  BarChart3,
  Building2,
  CreditCard,
  LayoutDashboard,
  Settings,
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
      {
        label: "Plans",
        path: "/plans",
        icon: CreditCard,
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