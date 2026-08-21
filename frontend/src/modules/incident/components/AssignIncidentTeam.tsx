import { useState } from "react";
import { Users, X, UserRoundCheck, ChevronDown } from "lucide-react";

import { useTeams } from "@/modules/team/hooks/useTeams";

import { useAssignIncidentTeam } from "../hooks/useAssignIncidentTeam";

import type { Incident } from "../types/incident.types";

interface AssignIncidentTeamProps {
  incident: Incident;
}

export default function AssignIncidentTeam({ incident }: AssignIncidentTeamProps) {
  const [selectedTeamId, setSelectedTeamId] = useState(incident.assignedTeamId ?? "");

  const [pendingTeamId, setPendingTeamId] = useState<string | null>(null);

  const assignTeamMutation = useAssignIncidentTeam();

  const { data: teamsData, isLoading: isTeamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  const teams = teamsData?.items ?? [];

  const selectedTeam = teams.find((team) => team.id === pendingTeamId);

  const currentTeam = teams.find((team) => team.id === incident.assignedTeamId);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const teamId = event.target.value;

    setSelectedTeamId(teamId);

    if (!teamId || teamId === incident.assignedTeamId) {
      return;
    }

    setPendingTeamId(teamId);
  };

  const handleConfirm = () => {
    if (!pendingTeamId) {
      return;
    }

    assignTeamMutation.mutate(
      {
        id: incident.id,
        data: {
          teamId: pendingTeamId,
        },
      },
      {
        onSuccess: () => {
          setPendingTeamId(null);
        },
        onError: () => {
          setSelectedTeamId(incident.assignedTeamId ?? "");

          setPendingTeamId(null);
        },
      },
    );
  };

  const handleCancel = () => {
    if (assignTeamMutation.isPending) {
      return;
    }

    setSelectedTeamId(incident.assignedTeamId ?? "");

    setPendingTeamId(null);
  };

  return (
    <>
      <div>
        <label
          htmlFor={`incident-team-${incident.id}`}
          className="
            mb-2
            block
            text-sm
            font-medium
            text-[#4B3932]
          "
        >
          Assigned Team
        </label>

        <div className="relative">
          <select
            id={`incident-team-${incident.id}`}
            value={selectedTeamId}
            onChange={handleChange}
            disabled={isTeamsLoading || assignTeamMutation.isPending}
            className="
              w-full
              appearance-none
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-3
              pr-10
              text-sm
              text-[#4B3932]
              outline-none
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#D8C9BD]
              hover:shadow-sm
              focus:border-[#4B3932]
              focus:ring-2
              focus:ring-[#4B3932]/10
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <option value="">{isTeamsLoading ? "Loading teams..." : "Unassigned"}</option>

            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="
              pointer-events-none
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />
        </div>

        {currentTeam && (
          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              rounded-xl
              bg-[#FAF6F0]
              px-3
              py-2
              transition-all
              duration-200
              hover:bg-[#F0E7D5]
            "
          >
            <Users size={15} className="text-[#4B3932]" />

            <span className="text-xs text-stone-500">Currently assigned to</span>

            <span className="text-xs font-semibold text-[#4B3932]">{currentTeam.name}</span>
          </div>
        )}
      </div>

      {pendingTeamId && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white
              p-6
              shadow-2xl
            "
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F0E7D5]
                    text-[#4B3932]
                  "
                >
                  <UserRoundCheck size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#4B3932]">Assign Team</h2>

                  <p className="text-xs text-stone-400">Update incident ownership</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                disabled={assignTeamMutation.isPending}
                className="
                  rounded-lg
                  p-2
                  text-stone-400
                  transition
                  hover:bg-[#FAF6F0]
                  hover:text-[#4B3932]
                  disabled:opacity-50
                "
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-stone-500">
              Are you sure you want to assign this incident to{" "}
              <span className="font-semibold text-[#4B3932]">
                {selectedTeam?.name ?? "this team"}
              </span>
              ?
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                gap-3
                rounded-2xl
                bg-[#FAF6F0]
                p-4
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F0E7D5]
                  text-[#4B3932]
                "
              >
                <Users size={18} />
              </div>

              <div>
                <p className="text-xs text-stone-400">New assigned team</p>

                <p className="mt-0.5 text-sm font-semibold text-[#4B3932]">
                  {selectedTeam?.name ?? "This team"}
                </p>
              </div>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={assignTeamMutation.isPending}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-[#4B3932]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#FAF6F0]
                  hover:shadow-sm
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={assignTeamMutation.isPending}
                className="
                  rounded-xl
                  bg-[#4B3932]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#3B2E29]
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {assignTeamMutation.isPending ? "Assigning..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
