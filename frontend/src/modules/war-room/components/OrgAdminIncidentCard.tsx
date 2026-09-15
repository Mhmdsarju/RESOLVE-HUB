import { AlertTriangle, CalendarDays, CircleDot, Users } from "lucide-react";

import { severityStyles, incidentStatusStyles } from "../constants/warRoom.constants";

import { useTeam } from "@/modules/team/hooks/useTeam";

import type { Incident } from "@/modules/incident/types/incident.types";

interface OrgAdminIncidentCardProps {
  incident?: Incident;
}

export default function OrgAdminIncidentCard({ incident }: OrgAdminIncidentCardProps) {
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
                p-5
                shadow-sm
            "
    >
      <div className="flex items-start gap-3">
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

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">Incident</p>

          <h2 className="mt-1 text-base font-bold leading-5 text-[#4B3932]">{incident.title}</h2>
        </div>
      </div>

      {incident.description && (
        <p className="mt-4 text-sm leading-6 text-stone-500">{incident.description}</p>
      )}

      <div className="mt-5 space-y-3">
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
            <Users size={15} className="shrink-0 text-stone-400" />

            <p className="truncate text-sm font-semibold text-[#4B3932]">
              {team?.name ?? "Team unavailable"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="
                    mt-4
                    space-y-3
                    border-t
                    border-[#E7DDD3]
                    pt-4
                    text-xs
                    text-stone-500
                "
      >
        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} />
          Created {new Date(incident.createdAt).toLocaleDateString()}
        </span>

        <div>
          <p className="text-stone-400">Incident ID</p>

          <p className="mt-1 break-all font-medium text-[#4B3932]">{incident.id}</p>
        </div>
      </div>
    </div>
  );
}
