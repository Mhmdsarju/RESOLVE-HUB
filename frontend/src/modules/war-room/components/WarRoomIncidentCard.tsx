import { AlertTriangle, CalendarDays, CircleDot, Users } from "lucide-react";

import { severityStyles, incidentStatusStyles } from "../constants/warRoom.constants";

import { useTeam } from "@/modules/team/hooks/useTeam";

import type { WarRoomIncidentCardProps } from "../types/warRoom.types";

export default function WarRoomIncidentCard({ warRoom }: WarRoomIncidentCardProps) {
  const incident = warRoom.incident;

  const teamId = incident?.assignedTeamId ?? "";

  const { data: team } = useTeam(teamId);

  if (!incident) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-stone-500">Incident information is unavailable.</p>
      </div>
    );
  }

  return (
    <div
      className="
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-white
                p-6
                shadow-sm
            "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#F0E7D5]
                                text-[#4B3932]
                            "
            >
              <AlertTriangle size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                Incident
              </p>

              <h2 className="mt-0.5 text-lg font-bold text-[#4B3932]">{incident.title}</h2>
            </div>
          </div>

          {incident.description && (
            <p className="mt-4 text-sm leading-6 text-stone-500">{incident.description}</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="
                        rounded-xl
                        bg-[#FAF6F0]
                        p-4
                    "
        >
          <p className="text-xs font-medium text-stone-400">Severity</p>

          <span
            className={`
                            mt-2
                            inline-flex
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
        </div>

        <div
          className="
                        rounded-xl
                        bg-[#FAF6F0]
                        p-4
                    "
        >
          <p className="text-xs font-medium text-stone-400">Priority</p>

          <p className="mt-2 text-sm font-semibold text-[#4B3932]">
            {incident.priority ?? "Not assigned"}
          </p>
        </div>

        <div
          className="
                        rounded-xl
                        bg-[#FAF6F0]
                        p-4
                    "
        >
          <p className="text-xs font-medium text-stone-400">Status</p>

          <span
            className={`
                            mt-2
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${incidentStatusStyles[incident.status]}
                        `}
          >
            <CircleDot size={12} />
            {incident.status.replace("_", " ")}
          </span>
        </div>

        <div
          className="
                        rounded-xl
                        bg-[#FAF6F0]
                        p-4
                    "
        >
          <p className="text-xs font-medium text-stone-400">Team</p>

          <div className="mt-2 flex items-center gap-2">
            <Users size={15} className="text-stone-400" />

            <p className="truncate text-sm font-semibold text-[#4B3932]">
              {team?.name ?? "Team unavailable"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    gap-5
                    border-t
                    border-[#E7DDD3]
                    pt-4
                    text-xs
                    text-stone-500
                "
      >
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={14} />
          Created {new Date(incident.createdAt).toLocaleDateString()}
        </span>

        <span>Incident ID: {incident.id}</span>
      </div>
    </div>
  );
}
