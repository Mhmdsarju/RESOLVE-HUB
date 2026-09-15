import {
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Snowflake,
} from "lucide-react";

type SuperAdminDashboardStatKey =
  | "totalOrganizations"
  | "activeOrganizations"
  | "frozenOrganizations"
  | "totalRevenue";

export const superAdminDashboardStatConfig: {
  label: string;
  key: SuperAdminDashboardStatKey;
  icon: typeof Building2;
  color: string;
}[] = [
  {
    label: "Total Organizations",
    key: "totalOrganizations",
    icon: Building2,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    label: "Active Organizations",
    key: "activeOrganizations",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    label: "Frozen Organizations",
    key: "frozenOrganizations",
    icon: Snowflake,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    label: "Total Revenue",
    key: "totalRevenue",
    icon: CircleDollarSign,
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
];

export const superAdminDashboardChartColors = [
  "#4B3932",
  "#A78BFA",
  "#60A5FA",
  "#34D399",
];