import { CalendarDays, Users, AlertTriangle } from "lucide-react";

import type { Incident } from "../types/incident.types";

interface IncidentCardProps {
  incident: Incident;
  onClick?: () => void;
}

const severityStyles = {
  LOW: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
} as const;

const statusStyles = {
  OPEN: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-stone-100 text-stone-700",
} as const;

export default function IncidentCard({ incident, onClick }: IncidentCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        rounded-2xl
        bg-white
        p-6
        text-left
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-[#4B3932]">{incident.title}</h3>

          {incident.description && (
            <p className="mt-2 line-clamp-2 text-sm text-stone-500">{incident.description}</p>
          )}
        </div>

        <AlertTriangle size={20} className="shrink-0 text-[#4B3932]" />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${severityStyles[incident.severity]}
          `}
        >
          {incident.severity}
        </span>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusStyles[incident.status]}
          `}
        >
          {incident.status.replace("_", " ")}
        </span>

        {incident.priority && (
          <span className="rounded-full bg-[#F0E7D5] px-3 py-1 text-xs font-semibold text-[#4B3932]">
            {incident.priority}
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-stone-500">
        <span className="inline-flex items-center gap-1.5">
          <Users size={14} />
          {incident.assignedTeamId ? "Team assigned" : "Unassigned"}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} />
          {new Date(incident.createdAt).toLocaleDateString()}
        </span>
      </div>
    </button>
  );
}