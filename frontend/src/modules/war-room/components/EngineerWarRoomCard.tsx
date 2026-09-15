import { CalendarDays, Users, ArrowUpRight, LockKeyhole } from "lucide-react";

import type { WarRoomCardProps } from "../types/warRoom.types";

import { severityStyles, warRoomStatusStyles } from "../constants/warRoom.constants";

import { useTeam } from "@/modules/team/hooks/useTeam";
import { useIncident } from "@/modules/incident/hooks/useIncident";

export default function EngineerWarRoomCard({ warRoom, onClick, onJoin }: WarRoomCardProps) {
  const { data: incident } = useIncident(warRoom.incidentId);

  const teamId = incident?.assignedTeamId ?? "";

  const { data: team } = useTeam(teamId);

  const isActive = warRoom.status === "ACTIVE";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border border-stone-200/80 
        bg-linear-to-b from-white to-stone-50/50 p-6 shadow-sm 
        transition-all duration-300
        ${isActive ? "hover:-translate-y-1 hover:border-stone-300 hover:shadow-xl" : ""}
      `}
    >
      {isActive && (
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#4B3932] via-[#8C6D58] to-[#4B3932] opacity-0 transition-opacity group-hover:opacity-100" />
      )}

      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={isActive ? onClick : undefined}
          disabled={!isActive}
          className="
            min-w-0
            flex-1
            text-left
            focus:outline-none
            disabled:cursor-not-allowed
          "
        >
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`
                rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase
                shadow-xs ${warRoomStatusStyles[warRoom.status]}
              `}
            >
              {warRoom.status}
            </span>

            {incident?.severity && (
              <span
                className={`
                  rounded-full px-3 py-1 text-xs font-semibold
                  ${severityStyles[incident.severity]}
                `}
              >
                {incident.severity}
              </span>
            )}

            {incident?.priority && (
              <span className="rounded-full bg-amber-100/80 px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200/50">
                {incident.priority}
              </span>
            )}
          </div>

          <div className="mt-3">
            <h3
              className={`
                truncate text-lg font-bold text-[#4B3932] tracking-tight
                transition-colors
                ${isActive ? "group-hover:text-[#6E5347]" : ""}
              `}
            >
              {incident?.title ?? "Incident"}
            </h3>

            {incident?.description && (
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone-600">
                {incident.description}
              </p>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-6 text-xs font-medium text-stone-500">
            <span className="inline-flex items-center gap-2 rounded-md bg-stone-100 px-2.5 py-1 text-stone-700">
              <Users size={14} className="text-stone-500" />
              {team?.name ?? "Team"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} className="text-stone-400" />
              {new Date(warRoom.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </button>

        {isActive ? (
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={onJoin}
              className="
                group/btn inline-flex items-center justify-center gap-2 rounded-xl
                bg-[#4B3932] px-5 py-3 text-sm font-semibold text-white
                shadow-md transition-all duration-200 
                hover:bg-[#3B2E29] hover:shadow-lg hover:scale-[1.02]
                active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#4B3932] focus:ring-offset-2
              "
            >
              <span>Join War Room</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </button>
          </div>
        ) : (
          <div
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-stone-200
              bg-stone-100
              px-4
              py-3
              text-xs
              font-semibold
              text-stone-500
            "
          >
            <LockKeyhole size={15} />

            <span>Closed · Not accessible</span>
          </div>
        )}
      </div>
    </div>
  );
}
