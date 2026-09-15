import { AlertCircle, AlertTriangle, CheckCircle2, CircleDot, Flame, Activity } from "lucide-react";

import type {
  IncidentStats as IncidentStatsType,
  IncidentStatus,
  IncidentSeverity,
  IncidentPriority,
} from "../types/incident.types";

interface IncidentStatsProps {
  stats?: IncidentStatsType;
  isLoading?: boolean;
}

const statusConfig: Record<
  IncidentStatus,
  {
    label: string;
    icon: typeof CircleDot;
    className: string;
  }
> = {
  OPEN: {
    label: "Open",
    icon: CircleDot,
    className: "bg-blue-50 text-blue-600",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Activity,
    className: "bg-purple-50 text-purple-600",
  },
  RESOLVED: {
    label: "Resolved",
    icon: CheckCircle2,
    className: "bg-green-50 text-green-600",
  },
  CLOSED: {
    label: "Closed",
    icon: CheckCircle2,
    className: "bg-stone-100 text-stone-600",
  },
};

const severityConfig: Record<
  IncidentSeverity,
  {
    label: string;
    className: string;
  }
> = {
  LOW: {
    label: "Low",
    className: "bg-green-50 text-green-600",
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-yellow-50 text-yellow-600",
  },
  HIGH: {
    label: "High",
    className: "bg-orange-50 text-orange-600",
  },
  CRITICAL: {
    label: "Critical",
    className: "bg-red-50 text-red-600",
  },
};

const priorityConfig: Record<
  IncidentPriority,
  {
    label: string;
    className: string;
  }
> = {
  P1: {
    label: "P1",
    className: "bg-red-50 text-red-600",
  },
  P2: {
    label: "P2",
    className: "bg-orange-50 text-orange-600",
  },
  P3: {
    label: "P3",
    className: "bg-yellow-50 text-yellow-600",
  },
  P4: {
    label: "P4",
    className: "bg-stone-100 text-stone-600",
  },
};

export default function IncidentStats({ stats, isLoading = false }: IncidentStatsProps) {
  if (isLoading || !stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              h-32
              animate-pulse
              rounded-2xl
              bg-white
              shadow-sm
            "
          />
        ))}
      </div>
    );
  }

  const openCount = stats.status.OPEN ?? 0;
  const inProgressCount = stats.status.IN_PROGRESS ?? 0;
  const resolvedCount = stats.status.RESOLVED ?? 0;
  const closedCount = stats.status.CLOSED ?? 0;

  const criticalCount = stats.severity.CRITICAL ?? 0;
  const highCount = stats.severity.HIGH ?? 0;

  const statusItems = (Object.keys(statusConfig) as IncidentStatus[]).filter(
    (status) => (stats.status[status] ?? 0) > 0,
  );

  const severityItems = (Object.keys(severityConfig) as IncidentSeverity[]).filter(
    (severity) => (stats.severity[severity] ?? 0) > 0,
  );

  const priorityItems = (Object.keys(priorityConfig) as IncidentPriority[]).filter(
    (priority) => (stats.priority[priority] ?? 0) > 0,
  );

  return (
    <div className="space-y-4">
      {/* Main Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            bg-[#4B3932]
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              bg-white/5
              transition-transform
              duration-500
              group-hover:scale-150
            "
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/10
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <AlertCircle size={20} className="text-[#F0E7D5]" />
              </div>

              <span className="text-xs font-medium text-[#E7DDD3]">Total</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-white">{stats.total}</p>

            <p className="mt-1 text-sm text-[#E7DDD3]">Total incidents</p>
          </div>
        </div>

        {/* Active */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              bg-blue-50
              opacity-60
              transition-transform
              duration-500
              group-hover:scale-150
            "
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <CircleDot size={20} className="text-blue-600" />
              </div>

              <span className="text-xs text-stone-400">Active</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-[#4B3932]">{openCount + inProgressCount}</p>

            <p className="mt-1 text-sm text-stone-500">Active incidents</p>
          </div>
        </div>

        {/* High Risk */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              bg-red-50
              opacity-60
              transition-transform
              duration-500
              group-hover:scale-150
            "
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-50
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <Flame size={20} className="text-red-600" />
              </div>

              <span className="text-xs text-stone-400">High Risk</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-[#4B3932]">{criticalCount + highCount}</p>

            <p className="mt-1 text-sm text-stone-500">High severity incidents</p>
          </div>
        </div>

        {/* Completed */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <div
            className="
              absolute
              -right-8
              -top-8
              h-24
              w-24
              rounded-full
              bg-green-50
              opacity-60
              transition-transform
              duration-500
              group-hover:scale-150
            "
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-green-50
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <CheckCircle2 size={20} className="text-green-600" />
              </div>

              <span className="text-xs text-stone-400">Completed</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-[#4B3932]">{resolvedCount + closedCount}</p>

            <p className="mt-1 text-sm text-stone-500">Resolved or closed</p>
          </div>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Status */}
        <div
          className="
            group
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Activity size={18} className="text-[#4B3932]" />
            </div>

            <h3 className="font-semibold text-[#4B3932]">Status Breakdown</h3>
          </div>

          <div className="mt-5 space-y-3">
            {statusItems.length === 0 ? (
              <p className="text-sm text-stone-400">No status data available</p>
            ) : (
              statusItems.map((status) => {
                const config = statusConfig[status];

                const Icon = config.icon;

                return (
                  <div
                    key={status}
                    className="
                      flex
                      cursor-default
                      items-center
                      justify-between
                      rounded-xl
                      bg-[#FAF6F0]
                      px-4
                      py-3
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:bg-[#F0E7D5]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-lg
                          transition-transform
                          duration-200
                          hover:scale-110
                          ${config.className}
                        `}
                      >
                        <Icon size={15} />
                      </div>

                      <span className="text-sm font-medium text-[#4B3932]">{config.label}</span>
                    </div>

                    <span className="font-bold text-[#4B3932]">{stats.status[status]}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Severity */}
        <div
          className="
            group
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <AlertTriangle size={18} className="text-[#4B3932]" />
            </div>

            <h3 className="font-semibold text-[#4B3932]">Severity Breakdown</h3>
          </div>

          <div className="mt-5 space-y-3">
            {severityItems.length === 0 ? (
              <p className="text-sm text-stone-400">No severity data available</p>
            ) : (
              severityItems.map((severity) => {
                const config = severityConfig[severity];

                return (
                  <div
                    key={severity}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      bg-[#FAF6F0]
                      px-4
                      py-3
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:bg-[#F0E7D5]
                    "
                  >
                    <span
                      className={`
                        rounded-lg
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        transition-transform
                        duration-200
                        hover:scale-105
                        ${config.className}
                      `}
                    >
                      {config.label}
                    </span>

                    <span className="font-bold text-[#4B3932]">{stats.severity[severity]}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Priority */}
        <div
          className="
            group
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <AlertCircle size={18} className="text-[#4B3932]" />
            </div>

            <h3 className="font-semibold text-[#4B3932]">Priority Breakdown</h3>
          </div>

          <div className="mt-5 space-y-3">
            {priorityItems.length === 0 ? (
              <p className="text-sm text-stone-400">No priority data available</p>
            ) : (
              priorityItems.map((priority) => {
                const config = priorityConfig[priority];

                return (
                  <div
                    key={priority}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      bg-[#FAF6F0]
                      px-4
                      py-3
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:bg-[#F0E7D5]
                    "
                  >
                    <span
                      className={`
                        rounded-lg
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        transition-transform
                        duration-200
                        hover:scale-105
                        ${config.className}
                      `}
                    >
                      {config.label}
                    </span>

                    <span className="font-bold text-[#4B3932]">{stats.priority[priority]}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
