import {
  BarChart3,
  Building2,
  CreditCard,
  LayoutDashboard,
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
        label: "Payment Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
      {
        label: "Payment History",
        path: "/history",
        icon: BarChart3,
      },
    ],
  },
];