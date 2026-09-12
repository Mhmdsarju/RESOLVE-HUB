import { Building2, CheckCircle2, Snowflake } from "lucide-react";

type OrganizationAnalyticsKey =
  | "totalOrganizations"
  | "activeOrganizations"
  | "frozenOrganizations";

export const superAdminOrganizationAnalyticsStats: {
  label: string;
  key: OrganizationAnalyticsKey;
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
];