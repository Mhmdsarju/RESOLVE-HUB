import { Building2, TrendingUp } from "lucide-react";

import { useOrganizationAnalytics } from "@/modules/organization/hooks/useOrganizationAnalytics";
import { superAdminOrganizationAnalyticsStats } from "../constants/superAdminOrganizationAnalytics.constants";

export default function SuperAdminOrganizationAnalytics() {
  const { data, isLoading, isError } = useOrganizationAnalytics();

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4B3932] border-t-transparent" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center shadow-sm">
        <div className="rounded-full bg-red-100 p-3 text-red-500">
          <Building2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-red-900">
          Failed to load organization analytics
        </h3>
        <p className="mt-1 text-sm text-red-600 max-w-sm">
          Please check your network connection or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-stone-50/50 min-h-screen">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-[#4B3932]">
          Organization Analytics
        </h1>
        <p className="text-sm font-medium text-stone-500">
          High-level metrics and platform growth insights across all registered entities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {superAdminOrganizationAnalyticsStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-stone-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {stat.label}
                </span>

                <div className={`rounded-xl border p-3 shadow-sm transition-transform group-hover:scale-105 ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="text-4xl font-black text-[#4B3932]">
                  {data[stat.key] ?? 0}
                </span>

                <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                  <TrendingUp className="mr-1 h-3.5 w-3.5" />
                  Live
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}