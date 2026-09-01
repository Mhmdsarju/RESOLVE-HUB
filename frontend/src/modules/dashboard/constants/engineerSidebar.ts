import {
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  User,
} from "lucide-react";

import type { SidebarSection } from "../types/sidebar.types";

export const engineerSidebar: SidebarSection[] = [
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
        label: "My Tasks",
        path: "/my-tasks",
        icon: ClipboardCheck,
      },
      {
        label: "War Rooms",
        path: "/engineer/war-rooms",
        icon: FolderKanban,
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        label: "Profile",
        path: "/profile",
        icon: User,
      },
    ],
  },
];