import {
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Crown,
  CreditCard,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useSuperAdminDashboard } from "@/modules/organization/hooks/useSuperAdminDashboard";
import {
  superAdminDashboardChartColors,
  superAdminDashboardStatConfig,
} from "../../constants/superAdminDashboard.constants";
import {
  formatSuperAdminCurrency,
  formatSuperAdminRevenueTrend,
} from "../../constants/superAdminDashboard.utils";

export default function SuperAdminDashboard() {
  const { data, isLoading, isError } = useSuperAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center p-6">
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
      <div className="flex min-h-[500px] items-center justify-center p-6">
        <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-white px-8 py-7 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <CircleDollarSign className="h-6 w-6" />
          </div>

          <p className="mt-4 text-sm font-bold text-red-700">
            Unable to load dashboard
          </p>

          <p className="mt-1 text-xs text-red-500">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const stats = superAdminDashboardStatConfig.map((stat) => ({
    ...stat,
    value:
      stat.key === "totalRevenue"
        ? `₹${data[stat.key].toLocaleString("en-IN")}`
        : data[stat.key].toLocaleString("en-IN"),
  }));

  const revenueTrend = formatSuperAdminRevenueTrend(data.revenueTrend);

  const revenueStat = stats.find((stat) => stat.key === "totalRevenue");
  const organizationStats = stats.filter(
    (stat) => stat.key !== "totalRevenue",
  );

  return (
    <div className="relative space-y-8 overflow-hidden p-1">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#F0E7D5]/50 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E7DDD3] bg-white px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
              Platform Overview
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#4B3932] sm:text-4xl">
            Super Admin Dashboard
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
            Monitor organizations, subscriptions, revenue and platform
            activity from one place.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E7DDD3] bg-white p-3.5 pr-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">
              Active Organizations
            </p>

            <p className="mt-0.5 text-base font-bold text-[#4B3932]">
              {data.activeOrganizations.toLocaleString("en-IN")}
            </p>
          </div>

          <span className="ml-2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.10)]" />
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-[1.45fr_1fr]">
        {revenueStat && (
          <div
            className="
              group
              relative
              min-h-[280px]
              overflow-hidden
              rounded-3xl
              bg-gradient-to-br
              from-[#4B3932]
              via-[#5A463D]
              to-[#79665B]
              p-8
              text-white
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
            "
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition duration-500 group-hover:scale-125" />

            <div className="absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-amber-200/10 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    {revenueStat.label}
                  </p>

                  <div className="mt-7 flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm">
                      <CircleDollarSign className="h-8 w-8" />
                    </div>

                    <div>
                      <p className="text-4xl font-black tracking-tight sm:text-5xl">
                        {revenueStat.value}
                      </p>

                      <p className="mt-1 text-sm text-white/50">
                        Total successful payment revenue
                      </p>
                    </div>
                  </div>
                </div>

                <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    This Month
                  </p>

                  <p className="mt-1.5 text-lg font-bold text-white">
                    {formatSuperAdminCurrency(data.monthlyRevenue)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    This Year
                  </p>

                  <p className="mt-1.5 text-lg font-bold text-white">
                    {formatSuperAdminCurrency(data.yearlyRevenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {organizationStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  group
                  relative
                  flex
                  min-h-[128px]
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
                      {stat.value}
                    </p>
                  </div>
                </div>

                <CheckCircle2 className="relative h-4 w-4 text-emerald-500/70" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="group rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A78B72]">
                Subscriptions
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#4B3932]">
                Subscription Overview
              </h2>

              <p className="mt-1 text-xs text-stone-400">
                Current active subscriptions
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <Users className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#E7DDD3] bg-[#FCFAF7] p-5">
              <p className="text-xs font-semibold text-stone-400">
                Free Subscriptions
              </p>

              <p className="mt-3 text-3xl font-black text-[#4B3932]">
                {data.freeSubscriptions.toLocaleString("en-IN")}
              </p>

              <div className="mt-3 h-1.5 rounded-full bg-stone-200">
                <div className="h-full w-1/2 rounded-full bg-stone-400" />
              </div>
            </div>

            <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5">
              <p className="text-xs font-semibold text-violet-600">
                Paid Subscriptions
              </p>

              <p className="mt-3 text-3xl font-black text-violet-800">
                {data.paidSubscriptions.toLocaleString("en-IN")}
              </p>

              <div className="mt-3 h-1.5 rounded-full bg-violet-100">
                <div className="h-full w-1/2 rounded-full bg-violet-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="group rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A78B72]">
                Financial Summary
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#4B3932]">
                Revenue Overview
              </h2>

              <p className="mt-1 text-xs text-stone-400">
                Platform revenue summary
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CircleDollarSign className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E7DDD3] bg-[#FCFAF7] p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Total
              </p>

              <p className="mt-2 text-lg font-black text-[#4B3932]">
                {formatSuperAdminCurrency(data.totalRevenue)}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                This Month
              </p>

              <p className="mt-2 text-lg font-black text-blue-800">
                {formatSuperAdminCurrency(data.monthlyRevenue)}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                This Year
              </p>

              <p className="mt-2 text-lg font-black text-amber-800">
                {formatSuperAdminCurrency(data.yearlyRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A78B72]">
                Financial Activity
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#4B3932]">
                Revenue Trend
              </h2>

              <p className="mt-1 text-xs text-stone-400">
                Monthly revenue performance
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E7DDD3"
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#8A7A72" }}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#8A7A72" }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid #E7DDD3",
                    boxShadow: "0 10px 30px rgba(75, 57, 50, 0.08)",
                  }}
                  formatter={(value) => formatSuperAdminCurrency(value)}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4B3932"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A78B72]">
                Plan Mix
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#4B3932]">
                Subscription Distribution
              </h2>

              <p className="mt-1 text-xs text-stone-400">
                Active subscriptions by plan
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Crown className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.subscriptionDistribution}
                  dataKey="count"
                  nameKey="plan"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={48}
                  paddingAngle={3}
                  label
                >
                  {data.subscriptionDistribution.map((entry, index) => (
                    <Cell
                      key={`${entry.plan}-${index}`}
                      fill={
                        superAdminDashboardChartColors[
                          index % superAdminDashboardChartColors.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A78B72]">
              Financial Breakdown
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#4B3932]">
              Revenue by Plan
            </h2>

            <p className="mt-1 text-xs text-stone-400">
              Successful payment revenue by subscription plan
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <CircleDollarSign className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-6 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.revenueByPlan}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E7DDD3"
              />

              <XAxis
                dataKey="plan"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A7A72" }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: "#8A7A72" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #E7DDD3",
                  boxShadow: "0 10px 30px rgba(75, 57, 50, 0.08)",
                }}
                formatter={(value) => formatSuperAdminCurrency(value)}
              />

              <Bar
                dataKey="revenue"
                fill="#4B3932"
                radius={[8, 8, 0, 0]}
                barSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#E7DDD3] bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col gap-4 border-b border-[#E7DDD3] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A78B72]">
              Transactions
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#4B3932]">
              Recent Payments
            </h2>

            <p className="mt-1 text-xs text-stone-400">
              Latest payment transactions
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#E7DDD3] bg-[#FCFAF7] text-left">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                  Organization
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                  Plan
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                  Amount
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                  Status
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                  Paid At
                </th>
              </tr>
            </thead>

            <tbody>
              {data.recentPayments.map((payment, index) => (
                <tr
                  key={`${payment.organizationName}-${payment.paidAt}-${index}`}
                  className="border-b border-[#F0EBE5] transition-colors last:border-0 hover:bg-[#FCFAF7]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7D5] text-xs font-bold text-[#4B3932]">
                        {payment.organizationName.charAt(0).toUpperCase()}
                      </div>

                      <span className="text-sm font-semibold text-[#4B3932]">
                        {payment.organizationName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full border border-[#E7DDD3] bg-[#FCFAF7] px-3 py-1 text-xs font-semibold text-stone-600">
                      {payment.plan}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-[#4B3932]">
                    {payment.currency}{" "}
                    {payment.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
                        payment.status === "SUCCESS"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : payment.status === "PENDING"
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-red-200 bg-red-50 text-red-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-stone-500">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>
                </tr>
              ))}

              {data.recentPayments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-sm text-stone-400"
                  >
                    No recent payments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="group rounded-2xl border border-[#E7DDD3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#4B3932]">
                Organizations
              </p>

              <p className="mt-0.5 text-xs text-stone-400">
                Manage organizations
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-[#E7DDD3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CircleDollarSign className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#4B3932]">
                Revenue & Payments
              </p>

              <p className="mt-0.5 text-xs text-stone-400">
                View financial activity
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-[#E7DDD3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#4B3932]">
                Verifications
              </p>

              <p className="mt-0.5 text-xs text-stone-400">
                Review pending organizations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}