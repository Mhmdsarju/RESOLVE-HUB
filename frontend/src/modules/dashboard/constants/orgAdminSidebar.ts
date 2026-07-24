import {
  Activity,
  BarChart3,
  Building2,
  FolderKanban,
  LayoutDashboard,
  RadioTower,
  ShieldCheck,
  Users,
} from "lucide-react";

import type { SidebarSection } from "../types/sidebar.types";

export const orgAdminSidebar: SidebarSection[] = [
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
    title: "WORKSPACE",
    items: [
      {
        label: "Teams",
        path: "/teams",
        icon: Users,
      },
      {
        label: "Monitoring Projects",
        path: "/monitoring",
        icon: RadioTower,
      },
    ],
  },
  {
    title: "INCIDENT MANAGEMENT",
    items: [
      {
        label: "Incidents",
        path: "/incidents",
        icon: Activity,
      },
      {
        label: "War Rooms",
        path: "/war-rooms",
        icon: FolderKanban,
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
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        label: "Organization Settings",
        path: "/organization/settings",
        icon: Building2,
      },
    ],
  },
];