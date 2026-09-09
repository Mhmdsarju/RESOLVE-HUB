import {
  Users,
  UserCheck,
  AlertTriangle,
  Flame,
} from "lucide-react";

import type { OrganizationDashboardStats } from "@/modules/organization/types/organization.types";

export const organizationDashboardStatCards = [
  {
    label: "Total Teams",
    key: "teams",
    icon: Users,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    label: "Total Members",
    key: "members",
    icon: UserCheck,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    label: "Total Incidents",
    key: "incidents",
    icon: AlertTriangle,
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    label: "Total War Rooms",
    key: "warRooms",
    icon: Flame,
    color: "bg-orange-50 text-orange-700 border-orange-200",
  },
] satisfies {
  label: string;
  key: keyof Pick<
    OrganizationDashboardStats,
    "teams" | "members" | "incidents" | "warRooms"
  >;
  icon: typeof Users;
  color: string;
}[];