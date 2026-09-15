import { useRevenueAnalytics } from "../hooks/useRevenueAnalytics";
import {
  superAdminRevenueAnalyticsStats,
  superAdminSubscriptionAnalyticsStats,
} from "../constants/superAdminRevenueAnalytics.constants";

export default function SuperAdminRevenueAnalytics() {
  const { data, isLoading, isError } = useRevenueAnalytics();

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center bg-stone-50/50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4B3932] border-t-transparent" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-96 w-full items-center justify-center bg-stone-50/50">
        <p className="text-sm font-medium text-red-600">
          Failed to load revenue analytics.
        </p>
      </div>
    );
  }

  const highlightedStat = superAdminRevenueAnalyticsStats[0];
  const HighlightedIcon = highlightedStat.icon;

  return (
    <div className="min-h-screen space-y-8 bg-stone-50/50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center rounded-full border border-[#4B3932]/10 bg-[#4B3932]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#4B3932]">
              Revenue Analytics
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#4B3932]">
              Revenue & Payments
            </h1>

            <p className="mt-1 text-sm font-medium text-stone-500">
              Monitor revenue and subscription performance across ResolveHub.
            </p>
          </div>

          <div className="hidden rounded-2xl border border-stone-200/80 bg-white px-4 py-3 shadow-sm sm:block">
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Active Plans
            </p>

            <p className="mt-1 text-lg font-black text-[#4B3932]">
              {(data.freeSubscriptions + data.paidSubscriptions).toLocaleString(
                "en-IN",
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-[#4B3932] p-7 text-white shadow-xl lg:col-span-2">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                  {highlightedStat.label}
                </p>

                <p className="mt-3 max-w-md text-sm font-medium leading-6 text-white/70">
                  Total successful revenue generated across all ResolveHub
                  subscriptions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                <HighlightedIcon className="h-6 w-6 text-white" />
              </div>
            </div>

            <div>
              <p className="text-5xl font-black tracking-tight sm:text-6xl">
                ₹{data[highlightedStat.key].toLocaleString("en-IN")}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/60">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Successful payment revenue
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {superAdminRevenueAnalyticsStats.slice(1).map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {stat.label}
                  </span>

                  <div
                    className={`rounded-xl border p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-105 ${stat.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6">
                  <span className="text-3xl font-black tracking-tight text-[#4B3932]">
                    ₹{data[stat.key].toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {superAdminSubscriptionAnalyticsStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg"
            >
              <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-stone-50 transition-transform duration-500 group-hover:scale-125" />

              <div className="relative flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {stat.label}
                  </span>

                  <p className="mt-4 text-4xl font-black tracking-tight text-[#4B3932]">
                    {data[stat.key].toLocaleString("en-IN")}
                  </p>
                </div>

                <div
                  className={`rounded-2xl border p-3 shadow-sm ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-stone-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-[#4B3932]">
              Plan-wise Subscriptions
            </h2>

            <p className="mt-1 text-sm font-medium text-stone-500">
              Current active subscriptions by plan.
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 px-3 py-2 text-xs font-bold text-stone-500">
            Active subscriptions
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-50/60 text-xs font-bold uppercase tracking-wider text-stone-500">
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Subscriptions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-sm">
              {data.planWiseSubscriptions.map((item) => (
                <tr
                  key={item.plan}
                  className="transition-colors hover:bg-stone-50/70"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-xl bg-[#4B3932]/5 px-3 py-1.5 text-xs font-bold text-[#4B3932]">
                      {item.plan}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-stone-600">
                    {item.count.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.planWiseSubscriptions.length === 0 && (
            <div className="flex h-32 items-center justify-center text-sm font-medium text-stone-500">
              No subscription data available.
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-stone-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-[#4B3932]">
              Revenue by Plan
            </h2>

            <p className="mt-1 text-sm font-medium text-stone-500">
              Total successful revenue generated by each plan.
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 px-3 py-2 text-xs font-bold text-stone-500">
            Successful revenue
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-50/60 text-xs font-bold uppercase tracking-wider text-stone-500">
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Revenue</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-sm">
              {data.revenueByPlan.map((item) => (
                <tr
                  key={item.plan}
                  className="transition-colors hover:bg-stone-50/70"
                >
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-xl bg-[#4B3932]/5 px-3 py-1.5 text-xs font-bold text-[#4B3932]">
                      {item.plan}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-bold text-stone-600">
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.revenueByPlan.length === 0 && (
            <div className="flex h-32 items-center justify-center text-sm font-medium text-stone-500">
              No revenue data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}