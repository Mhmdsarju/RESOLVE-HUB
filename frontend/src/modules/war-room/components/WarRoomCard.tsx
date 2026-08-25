import { AlertTriangle, CalendarDays, Users } from "lucide-react";

import type { WarRoomCardProps } from "../types/warRoom.types";

import { severityStyles, warRoomStatusStyles } from "../constants/warRoom.constants";

import { useTeam } from "@/modules/team/hooks/useTeam";

export default function WarRoomCard({
  warRoom,
  onClick,
  onJoin,
  canJoin = false,
}: WarRoomCardProps) {
  const teamId = warRoom.incident?.assignedTeamId ?? "";

  const { data: team } = useTeam(teamId);

  const incident = warRoom.incident;

  return (
    <div
      className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
            "
    >
      <button type="button" onClick={onClick} className="w-full text-left">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`
                                    rounded-full
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    ${warRoomStatusStyles[warRoom.status]}
                                `}
              >
                {warRoom.status}
              </span>

              {incident?.severity && (
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
              )}

              {incident?.priority && (
                <span
                  className="
                                        rounded-full
                                        bg-[#F0E7D5]
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-[#4B3932]
                                    "
                >
                  {incident.priority}
                </span>
              )}
            </div>

            <h3 className="mt-4 truncate text-lg font-semibold text-[#4B3932]">
              {incident?.title ?? "Incident"}
            </h3>

            {incident?.description && (
              <p className="mt-2 line-clamp-2 text-sm text-stone-500">{incident.description}</p>
            )}
          </div>

          <AlertTriangle size={20} className="shrink-0 text-[#4B3932]" />
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

      {canJoin && warRoom.status === "ACTIVE" && (
        <div className="mt-5 border-t border-[#E7DDD3] pt-4">
          <button
            type="button"
            onClick={onJoin}
            className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            bg-[#4B3932]
                            px-4
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
      )}
    </div>
  );
}
