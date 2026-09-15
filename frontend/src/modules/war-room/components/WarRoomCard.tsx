import { CalendarDays, LockKeyhole, Users } from "lucide-react";

import type { WarRoomCardProps } from "../types/warRoom.types";

import { severityStyles, warRoomStatusStyles } from "../constants/warRoom.constants";

import { useTeam } from "@/modules/team/hooks/useTeam";
import { useIncident } from "@/modules/incident/hooks/useIncident";

export default function WarRoomCard({
  warRoom,
  onClick,
  onJoin,
  canJoin = false,
}: WarRoomCardProps) {
  const { data: incident } = useIncident(warRoom.incidentId);

  const teamId = incident?.assignedTeamId ?? "";

  const { data: team } = useTeam(teamId);

  const isActive = warRoom.status === "ACTIVE";

  return (
    <div
      className={`
        rounded-2xl
        bg-white
        p-6
        shadow-sm
        transition
        ${isActive ? "hover:-translate-y-0.5 hover:shadow-md" : ""}
      `}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={isActive ? onClick : undefined}
          disabled={!isActive}
          className="
            min-w-0
            flex-1
            text-left
            disabled:cursor-not-allowed
          "
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${warRoomStatusStyles[warRoom.status]}`}
              >
                {warRoom.status}
              </span>

              {incident?.severity && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyles[incident.severity]}`}
                >
                  {incident.severity}
                </span>
              )}

              {incident?.priority && (
                <span className="rounded-full bg-[#F0E7D5] px-3 py-1 text-xs font-semibold text-[#4B3932]">
                  {incident.priority}
                </span>
              )}
            </div>

            <div>
              <h3 className="truncate text-lg font-semibold text-[#4B3932]">
                {incident?.title ?? "Incident"}
              </h3>

              {incident?.description && (
                <p className="mt-1.5 line-clamp-2 text-sm text-stone-500">{incident.description}</p>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-stone-500">
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} />
              {team?.name ?? "Team"}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              {new Date(warRoom.createdAt).toLocaleDateString()}
            </span>
          </div>
        </button>

        {isActive ? (
          canJoin && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={onJoin}
                className="
                  rounded-xl
                  bg-[#4B3932]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#3B2E29]
                "
              >
                Join War Room
              </button>
            </div>
          )
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
              py-2.5
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
