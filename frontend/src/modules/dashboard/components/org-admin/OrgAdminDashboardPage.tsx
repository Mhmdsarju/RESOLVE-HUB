import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useOrganizationDashboardStats } from "@/modules/organization/hooks/useOrganizationDashboardStats";
import { organizationDashboardStatCards } from "../../constants/orgAdminDashboard.constants";

export default function OrgAdminDashboard() {
  const { data, isLoading, isError } = useOrganizationDashboardStats();

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#4B3932] border-t-transparent" />
          <p className="text-sm font-medium text-stone-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[500px] w-full flex-col items-center justify-center rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-white p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <h3 className="mt-5 text-lg font-bold text-red-800">
          Failed to load dashboard
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-red-600/80">
          Please check your network connection or try refreshing the page.
        </p>
      </div>
    );
  }

  const heroStat = organizationDashboardStatCards[0];
  const supportingStats = organizationDashboardStatCards.slice(1);

  return (
    <div className="relative space-y-8 overflow-hidden p-1">
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#F0E7D5]/50 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7DDD3] bg-white px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
              Organization Overview
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#4B3932] sm:text-4xl">
            Organization Dashboard
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
            Welcome back to{" "}
            <span className="font-semibold text-stone-700">ResolveHub</span>.
            Here is a quick overview of your organization.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E7DDD3] bg-white p-3.5 pr-5 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
            <CreditCard className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">
              Current Plan
            </p>

            <p className="mt-0.5 text-base font-bold capitalize text-[#4B3932]">
              {data.plan}
            </p>
          </div>

          <span className="ml-2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div
          className="
            group
            relative
            min-h-[250px]
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-[#4B3932]
            via-[#5A463D]
            to-[#79665B]
            p-7
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-2xl
          "
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:scale-125" />

          <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-amber-200/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  {heroStat.label}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
                    {(() => {
                      const Icon = heroStat.icon;

                      return <Icon className="h-7 w-7" />;
                    })()}
                  </div>

                  <div>
                    <p className="text-5xl font-black tracking-tight">
                      {data[heroStat.key]}
                    </p>

                    <p className="mt-1 text-sm text-white/55">
                      Total recorded in your organization
                    </p>
                  </div>
                </div>
              </div>

              <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-white/50">
              <TrendingUp className="h-3.5 w-3.5" />
              Organization-wide overview
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {supportingStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  group
                  relative
                  flex
                  min-h-[120px]
                  items-center
                  justify-between
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#E7DDD3]
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D8C4A8]
                  hover:shadow-lg
                "
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#FAF6F0] blur-2xl" />

                <div className="relative flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${stat.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-stone-400">
                      {stat.label}
                    </p>

                    <p className="mt-1 text-2xl font-black text-[#4B3932]">
                      {data[stat.key]}
                    </p>
                  </div>
                </div>

                <CheckCircle2 className="relative h-4 w-4 text-emerald-500/70" />
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-[#D8C4A8]/60
          bg-gradient-to-br
          from-[#FBF6EC]
          via-[#F7F2E9]
          to-[#EFE5D7]
          p-7
          shadow-sm
          sm:p-8
        "
      >
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/60 blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#D8C4A8]/20 blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8C4A8]/70 bg-white/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7B675A] backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#A78B72]" />
              Active Subscription
            </div>

            <h2 className="mt-4 text-2xl font-black tracking-tight text-[#4B3932] sm:text-3xl">
              {data.plan} Plan
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-stone-500">
              Your organization is currently utilizing the{" "}
              <span className="font-bold capitalize text-[#4B3932]">
                {data.plan}
              </span>{" "}
              package and its available features.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4B3932] text-white shadow-sm">
              <CreditCard className="h-5 w-5" />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">
                Subscription Status
              </p>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                <p className="text-sm font-bold text-emerald-600">
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