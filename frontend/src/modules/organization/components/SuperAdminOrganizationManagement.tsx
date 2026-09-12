import { useEffect, useState } from "react";
import {
  Building2,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
} from "lucide-react";

import { useOrganizationAnalytics } from "@/modules/organization/hooks/useOrganizationAnalytics";
import { useSuperAdminOrganizations } from "@/modules/organization/hooks/useSuperAdminOrganizations";
import { superAdminOrganizationAnalyticsStats } from "../constants/superAdminOrganizationAnalytics.constants";

export default function SuperAdminOrganizationManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data: analyticsData, isLoading: isAnalyticsLoading } =
    useOrganizationAnalytics();

  const {
    data: organizationsData,
    isLoading: isOrganizationsLoading,
    isError,
  } = useSuperAdminOrganizations({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    status: status || undefined,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const stats = analyticsData
    ? superAdminOrganizationAnalyticsStats.map((stat) => ({
        ...stat,
        value: analyticsData[stat.key],
      }))
    : [];

  const getStatusBadge = (status: string) => {
    const formatted = status.replaceAll("_", " ");

    switch (status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            {formatted}
          </span>
        );

      case "PENDING_PROFILE":
      case "PENDING_VERIFICATION":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            {formatted}
          </span>
        );

      case "REJECTED":
      case "SUSPENDED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
            {formatted}
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600 ring-1 ring-inset ring-stone-500/10">
            {formatted}
          </span>
        );
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
  };

  if (isAnalyticsLoading || isOrganizationsLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#4B3932] border-t-transparent" />
      </div>
    );
  }

  if (isError || !organizationsData) {
    return (
      <div className="flex h-96 w-full flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center shadow-sm">
        <div className="rounded-full bg-red-100 p-3 text-red-500">
          <Building2 className="h-8 w-8" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-red-900">
          Failed to load organizations
        </h3>

        <p className="mt-1 max-w-sm text-sm text-red-600">
          Please check your network connection or try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 bg-stone-50/50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-[#4B3932]">
          Organization Management
        </h1>

        <p className="text-sm font-medium text-stone-500">
          Manage, filter, and monitor all organizations registered across ResolveHub.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {stat.label}
                </span>

                <div className={`rounded-xl border p-2.5 shadow-sm ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <span className="text-4xl font-extrabold text-[#4B3932]">
                  {stat.value ?? 0}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-stone-100 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#4B3932]">
              Organizations Registry
            </h2>

            <p className="mt-0.5 text-sm text-stone-500">
              Showing total {organizationsData.total} organizations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

              <input
                type="text"
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search by name..."
                className="h-10 w-full rounded-xl border border-stone-200 bg-stone-50/50 pl-10 pr-10 text-sm text-stone-800 placeholder-stone-400 outline-none transition focus:border-[#4B3932] focus:bg-white focus:ring-1 focus:ring-[#4B3932] sm:w-64"
              />

              {search && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-stone-400 transition hover:bg-stone-200 hover:text-stone-700"
                  title="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
                className="h-10 w-full appearance-none rounded-xl border border-stone-200 bg-stone-50/50 px-4 pr-10 text-sm font-medium text-stone-700 outline-none transition focus:border-[#4B3932] focus:bg-white focus:ring-1 focus:ring-[#4B3932]"
              >
                <option value="">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING_VERIFICATION">
                  Pending Verification
                </option>
                <option value="REJECTED">Rejected</option>
              </select>

              <Filter className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-800px border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-50/50 text-xs font-bold uppercase tracking-wider text-stone-500">
                <th className="px-6 py-4">Organization</th>
                <th className="px-6 py-4">Industry</th>
                <th className="px-6 py-4">Company Size</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Access</th>
                <th className="px-6 py-4">Created Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-sm">
              {organizationsData.organizations.map((organization) => (
                <tr
                  key={organization.id}
                  className="transition-colors hover:bg-stone-50/60"
                >
                  <td className="px-6 py-4 font-bold text-[#4B3932]">
                    {organization.name}
                  </td>

                  <td className="px-6 py-4 font-medium text-stone-600">
                    {organization.industry || "N/A"}
                  </td>

                  <td className="px-6 py-4 font-medium text-stone-600">
                    {organization.companySize || "N/A"}
                  </td>

                  <td className="px-6 py-4 font-medium text-stone-600">
                    {[organization.city, organization.state, organization.country]
                      .filter(Boolean)
                      .join(", ") || "N/A"}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(organization.status)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        organization.accessStatus === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {organization.accessStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-stone-500">
                    {new Date(organization.createdAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {organizationsData.organizations.length === 0 && (
            <div className="flex h-40 flex-col items-center justify-center text-stone-500">
              <Building2 className="h-8 w-8 text-stone-300" />

              <p className="mt-2 text-sm font-medium">
                No organizations match your filters.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50/30 px-6 py-4">
          <p className="text-sm font-medium text-stone-500">
            Showing Page{" "}
            <span className="font-bold text-[#4B3932]">
              {organizationsData.page}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#4B3932]">
              {organizationsData.totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm font-semibold text-stone-600 shadow-sm transition hover:bg-stone-50 active:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              type="button"
              disabled={page === organizationsData.totalPages}
              onClick={() => setPage((currentPage) => currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm font-semibold text-stone-600 shadow-sm transition hover:bg-stone-50 active:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}