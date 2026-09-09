"use client";

import { AlertTriangle, CreditCard, Sparkles, TrendingUp } from "lucide-react";

import { useOrganizationDashboardStats } from "@/modules/organization/hooks/useOrganizationDashboardStats";
import { organizationDashboardStatCards } from "../../constants/orgAdminDashboard.constants";

export default function OrgAdminDashboard() {
  const { data, isLoading, isError } = useOrganizationDashboardStats();

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4B3932] border-t-transparent" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 p-6 text-center">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <h3 className="mt-3 text-lg font-semibold text-red-800">
          Failed to load dashboard
        </h3>
        <p className="mt-1 text-sm text-red-600">
          Please check your network connection or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-1">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#4B3932]">
            Organization Dashboard
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Welcome back to{" "}
            <span className="font-semibold text-stone-700">ResolveHub</span>.
            Here is your organization overview.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white/80 backdrop-blur-sm p-3 px-5 shadow-xs">
          <div className="rounded-xl bg-[#4B3932]/10 p-2.5 text-[#4B3932]">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              Current Plan
            </p>
            <p className="text-base font-bold text-[#4B3932] capitalize">
              {data.plan}
            </p>
          </div>
        </div>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {organizationDashboardStatCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-stone-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-500">
                  {stat.label}
                </span>

                <div
                  className={`rounded-xl border p-2.5 transition-transform duration-300 group-hover:scale-105 ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="text-3xl font-black text-[#4B3932]">
                  {data[stat.key]}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                  <TrendingUp className="h-3 w-3" /> Live
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Feature / Subscription Big Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4B3932] via-[#3a2c27] to-[#291f1b] p-8 text-white shadow-xl">
        {/* Background Decorative Pattern */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute right-20 top-0 h-40 w-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 border border-white/10 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Active Subscription Tier</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {data.plan} Plan
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed">
              Your organization is currently utilizing full features under the{" "}
              <span className="font-semibold text-white capitalize">{data.plan}</span> package.
              Manage your billing details and organization team members smoothly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-white/10 pt-6 md:border-t-0 md:pt-0">
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 border border-white/10 backdrop-blur-md">
              <div className="rounded-xl bg-white/15 p-3 text-amber-200">
                <CreditCard className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-300">
                  Status
                </p>
                <p className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}