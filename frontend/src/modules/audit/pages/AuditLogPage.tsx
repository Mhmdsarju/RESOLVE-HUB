import { useEffect, useState } from "react";

import {
  ShieldAlert,
  Clock,
  Search,
  Filter,
  Activity,
  FileText,
  UserCheck,
  Trash2,
  Edit3,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { useAuditLogs } from "../hooks/useAuditLogs";

import type {
  AuditAction,
  AuditEntityType,
} from "../types/auditLog.types";

import {
  AUDIT_ACTION_OPTIONS,
  AUDIT_ENTITY_OPTIONS,
} from "../constants/auditLog.constants";

const getActionBadgeStyle = (action: string) => {
  const normalized = action.toLowerCase();

  if (normalized.includes("create") || normalized.includes("add")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (normalized.includes("update") || normalized.includes("edit")) {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  if (normalized.includes("delete") || normalized.includes("remove")) {
    return "bg-rose-50 text-rose-700 border-rose-200";
  }

  if (
    normalized.includes("login") ||
    normalized.includes("logout") ||
    normalized.includes("auth")
  ) {
    return "bg-sky-50 text-sky-700 border-sky-200";
  }

  return "bg-stone-100 text-stone-700 border-stone-200";
};

const getActionIcon = (action: string) => {
  const normalized = action.toLowerCase();

  if (normalized.includes("create") || normalized.includes("add")) {
    return <PlusCircle className="h-5 w-5 text-emerald-600" />;
  }

  if (normalized.includes("update") || normalized.includes("edit")) {
    return <Edit3 className="h-5 w-5 text-amber-600" />;
  }

  if (normalized.includes("delete") || normalized.includes("remove")) {
    return <Trash2 className="h-5 w-5 text-rose-600" />;
  }

  if (
    normalized.includes("login") ||
    normalized.includes("logout") ||
    normalized.includes("auth")
  ) {
    return <UserCheck className="h-5 w-5 text-sky-600" />;
  }

  return <Activity className="h-5 w-5 text-[#4B3932]" />;
};

export default function AuditLogPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedEntity, setSelectedEntity] = useState("");
  const [selectedAction, setSelectedAction] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: auditLogsResponse,
    isLoading,
    isError,
    refetch,
  } = useAuditLogs({
    page,
    limit,
    search: debouncedSearch || undefined,
    entityType: selectedEntity
      ? (selectedEntity as AuditEntityType)
      : undefined,
    action: selectedAction
      ? (selectedAction as AuditAction)
      : undefined,
  });

  const auditLogs = auditLogsResponse?.data ?? [];
  const total = auditLogsResponse?.total ?? 0;
  const totalPages = auditLogsResponse?.totalPages ?? 0;

  const handleEntityChange = (value: string) => {
    setSelectedEntity(value);
    setPage(1);
  };

  const handleActionChange = (value: string) => {
    setSelectedAction(value);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <div className="h-10 w-52 animate-pulse rounded-xl bg-stone-200" />
            <div className="h-4 w-96 animate-pulse rounded-lg bg-stone-100" />
          </div>

          <div className="h-11 w-36 animate-pulse rounded-xl bg-stone-200" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-[#E7DDD3] bg-stone-100"
            />
          ))}
        </div>

        <div className="h-20 animate-pulse rounded-2xl border border-[#E7DDD3] bg-stone-100" />

        <div className="overflow-hidden rounded-2xl border border-[#E7DDD3] bg-white">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center gap-5 border-b border-[#E7DDD3]/60 p-7 last:border-b-0"
            >
              <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-stone-100" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 animate-pulse rounded bg-stone-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-stone-100" />
              </div>

              <div className="h-4 w-24 animate-pulse rounded bg-stone-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl p-6 lg:p-10">
        <div className="rounded-3xl border border-rose-200 bg-rose-50/60 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
            <ShieldAlert className="h-8 w-8 text-rose-600" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-rose-900">
            Failed to load audit logs
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-rose-600">
            We couldn't fetch the latest organization activity. Please try
            again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 active:scale-[0.98]"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-[#4B3932]">
              Audit Logs
            </h1>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E7DDD3] bg-[#FAF6F0] px-3 py-1.5 text-xs font-semibold text-[#8C6D58]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live Activity
            </span>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
            Keep track of important activities, changes, and actions across
            your organization.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E7DDD3] bg-white px-5 py-3 text-sm font-semibold text-[#4B3932] shadow-sm transition hover:bg-[#FAF6F0] active:scale-[0.98]"
        >
          <RefreshCw className="h-4 w-4 text-[#8C6D58]" />
          Refresh Logs
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="group rounded-2xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF6F0]">
              <Activity className="h-6 w-6 text-[#4B3932]" />
            </div>

            <span className="text-xs font-medium text-stone-400">
              All time
            </span>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-stone-500">
              Total Events
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-[#4B3932]">
              {total}
            </p>
          </div>
        </div>

        <div className="group rounded-2xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF6F0]">
              <FileText className="h-6 w-6 text-[#4B3932]" />
            </div>

            <span className="text-xs font-medium text-stone-400">
              Page {page}
            </span>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-stone-500">
              Events Displayed
            </p>

            <p className="mt-1 text-3xl font-bold tracking-tight text-[#4B3932]">
              {auditLogs.length}
            </p>
          </div>
        </div>

        <div className="group rounded-2xl border border-[#E7DDD3] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF6F0]">
              <Clock className="h-6 w-6 text-[#4B3932]" />
            </div>

            <span className="text-xs font-medium text-stone-400">
              Latest
            </span>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-stone-500">
              Latest Activity
            </p>

            <p className="mt-1 text-lg font-bold text-[#4B3932]">
              {auditLogs[0]
                ? new Date(auditLogs[0].createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E7DDD3] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAF6F0]">
            <Filter className="h-4 w-4 text-[#8C6D58]" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#4B3932]">
              Activity Filters
            </p>

            <p className="text-xs text-stone-400">
              Search and filter organization activity
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />

            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#E7DDD3] bg-[#FCFAF7] pl-12 pr-4 text-sm text-[#4B3932] placeholder-stone-400 outline-none transition focus:border-[#8C6D58] focus:bg-white focus:ring-2 focus:ring-[#8C6D58]/15"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 transition hover:text-[#4B3932]"
              >
                Clear
              </button>
            )}
          </div>

          <select
            value={selectedEntity}
            onChange={(e) => handleEntityChange(e.target.value)}
            className="h-12 rounded-xl border border-[#E7DDD3] bg-[#FCFAF7] px-4 text-sm font-medium text-[#4B3932] outline-none transition focus:border-[#8C6D58] focus:bg-white focus:ring-2 focus:ring-[#8C6D58]/15 lg:w-52"
          >
            <option value="">All Entities</option>

            {AUDIT_ENTITY_OPTIONS.map((entity) => (
              <option key={entity} value={entity}>
                {entity}
              </option>
            ))}
          </select>

          <select
            value={selectedAction}
            onChange={(e) => handleActionChange(e.target.value)}
            className="h-12 rounded-xl border border-[#E7DDD3] bg-[#FCFAF7] px-4 text-sm font-medium text-[#4B3932] outline-none transition focus:border-[#8C6D58] focus:bg-white focus:ring-2 focus:ring-[#8C6D58]/15 lg:w-56"
          >
            <option value="">All Actions</option>

            {AUDIT_ACTION_OPTIONS.map((action) => (
              <option key={action} value={action}>
                {action.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E7DDD3] bg-white shadow-sm">
        <div className="border-b border-[#E7DDD3]/70 bg-[#FCFAF7] px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#4B3932]">
                Organization Activity
              </h2>

              <p className="mt-1 text-xs text-stone-400">
                Recent actions and system events
              </p>
            </div>

            <span className="rounded-lg border border-[#E7DDD3] bg-white px-3 py-1.5 text-xs font-semibold text-stone-500">
              {total} events
            </span>
          </div>
        </div>

        {auditLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF6F0]">
              <Clock className="h-7 w-7 text-[#8C6D58]" />
            </div>

            <h3 className="mt-5 text-base font-semibold text-[#4B3932]">
              No audit logs found
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
              {searchTerm || selectedEntity || selectedAction
                ? "Try adjusting your search or filter options."
                : "Important organization activities will appear here as they happen."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E7DDD3]/60">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="group flex flex-col gap-5 px-6 py-7 transition-colors duration-150 hover:bg-[#FCFAF7] sm:flex-row sm:items-center sm:justify-between lg:px-7"
              >
                <div className="flex min-w-0 items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] shadow-sm transition duration-200 group-hover:scale-105 group-hover:bg-[#F3ECE4]">
                    {getActionIcon(log.action)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2.5 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getActionBadgeStyle(log.action)}`}
                      >
                        {log.action.replaceAll("_", " ")}
                      </span>

                      <span className="inline-flex items-center rounded-lg bg-stone-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                        {log.entityType}
                      </span>
                    </div>

                    <p className="max-w-3xl text-sm font-semibold leading-6 text-[#4B3932] lg:text-[15px]">
                      {log.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 border-t border-[#E7DDD3]/60 pt-3 sm:min-w-[145px] sm:border-t-0 sm:pt-0 sm:text-right">
                  <p className="text-xs font-semibold text-stone-500">
                    {new Date(log.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <p className="mt-1 text-xs text-stone-400">
                    {new Date(log.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 0 && (
          <div className="flex flex-col gap-4 border-t border-[#E7DDD3]/70 bg-[#FCFAF7] px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-7">
            <p className="text-xs text-stone-500">
              Showing{" "}
              <span className="font-semibold text-[#4B3932]">
                {auditLogs.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#4B3932]">
                {total}
              </span>{" "}
              events
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-stone-500">
                Page{" "}
                <span className="font-semibold text-[#4B3932]">
                  {page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#4B3932]">
                  {totalPages}
                </span>
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={handlePreviousPage}
                  disabled={page <= 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E7DDD3] bg-white text-stone-500 transition hover:bg-[#FAF6F0] hover:text-[#4B3932] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E7DDD3] bg-white text-stone-500 transition hover:bg-[#FAF6F0] hover:text-[#4B3932] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}