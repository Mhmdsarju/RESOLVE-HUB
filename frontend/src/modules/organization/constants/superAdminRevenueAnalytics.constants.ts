import {
  CalendarDays,
  CircleDollarSign,
  Crown,
  TrendingUp,
  Users,
} from "lucide-react";

type RevenueAnalyticsKey =
  | "totalRevenue"
  | "monthlyRevenue"
  | "yearlyRevenue";

export const superAdminRevenueAnalyticsStats: {
  label: string;
  key: RevenueAnalyticsKey;
  icon: typeof CircleDollarSign;
  color: string;
}[] = [
  {
    label: "Total Revenue",
    key: "totalRevenue",
    icon: CircleDollarSign,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    label: "Monthly Revenue",
    key: "monthlyRevenue",
    icon: CalendarDays,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    label: "Yearly Revenue",
    key: "yearlyRevenue",
    icon: TrendingUp,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

type SubscriptionAnalyticsKey =
  | "freeSubscriptions"
  | "paidSubscriptions";

export const superAdminSubscriptionAnalyticsStats: {
  label: string;
  key: SubscriptionAnalyticsKey;
  icon: typeof Users;
  color: string;
}[] = [
  {
    label: "Free Subscriptions",
    key: "freeSubscriptions",
    icon: Users,
    color: "bg-stone-100 text-stone-700 border-stone-200",
  },
  {
    label: "Paid Subscriptions",
    key: "paidSubscriptions",
    icon: Crown,
    color: "bg-violet-50 text-violet-700 border-violet-200",
  },
];