import { useMemo, useState } from "react";
import { GitBranch, X } from "lucide-react";

import { useUpdateAlertRoutingRule } from "../hooks/useUpdateAlertRoutingRule";

import { useTeams } from "@/modules/team/hooks/useTeams";
import { useMonitoringProjects } from "@/modules/monitoring/hooks/useMonitoringProjects";

import { useAlertRules } from "@/modules/alertRule/hooks/useAlertRules";

import type { UpdateAlertRoutingRuleDto ,EditAlertRoutingRuleModalProps} from "../types/alertRoutingRule.types";

export default function EditAlertRoutingRuleModal({
  rule,
  isOpen,
  onClose,
}: EditAlertRoutingRuleModalProps) {
  const mutation = useUpdateAlertRoutingRule();

  const [name, setName] = useState(rule?.name ?? "");
  const [monitoringProjectId, setMonitoringProjectId] = useState(rule?.monitoringProjectId ?? "");
  const [alertRuleId, setAlertRuleId] = useState(rule?.alertRuleId ?? "");
  const [teamId, setTeamId] = useState(rule?.teamId ?? "");
  const [priority, setPriority] = useState(String(rule?.priority ?? 1));

  const {
    data: teamsData,
    isLoading: isTeamsLoading,
    isError: isTeamsError,
  } = useTeams({
    page: 1,
    limit: 100,
  });

  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useMonitoringProjects({
    page: 1,
    limit: 100,
  });

  const {
    data: alertRulesData,
    isLoading: isAlertRulesLoading,
    isError: isAlertRulesError,
  } = useAlertRules({
    projectId: monitoringProjectId,
    page: 1,
    limit: 100,
  });

  const teams = teamsData?.items ?? [];
  const projects = projectsData?.data ?? [];
  const alertRules = alertRulesData?.items ?? [];

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === monitoringProjectId),
    [projects, monitoringProjectId],
  );

  const selectedTeam = useMemo(() => teams.find((team) => team.id === teamId), [teams, teamId]);

  const selectedAlertRule = useMemo(
    () => alertRules.find((rule) => rule.id === alertRuleId),
    [alertRules, alertRuleId],
  );

  if (!isOpen || !rule) {
    return null;
  }

  const isLoading = isTeamsLoading || isProjectsLoading || isAlertRulesLoading;

  const hasLoadingError = isTeamsError || isProjectsError || isAlertRulesError;

  const isFormValid =
    name.trim() && monitoringProjectId && alertRuleId && teamId && Number(priority) >= 1;

  const handleProjectChange = (projectId: string) => {
    setMonitoringProjectId(projectId);

    setAlertRuleId("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!rule) {
      return;
    }

    if (!isFormValid) {
      return;
    }

    const data: UpdateAlertRoutingRuleDto = {
      name: name.trim(),
      monitoringProjectId,
      alertRuleId,
      teamId,
      priority: Number(priority),
    };

    mutation.mutate(
      {
        id: rule.id,
        data,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
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
        py-6
        backdrop-blur-sm
      "
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <div className="border-b border-[#E7DDD3] p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F0E7D5]
                  text-[#4B3932]
                "
              >
                <GitBranch size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#4B3932]">Edit Routing Rule</h2>

                <p className="mt-1 text-sm text-stone-500">
                  Update where matching alerts should be routed.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="
                rounded-xl
                p-2
                text-stone-400
                transition-all
                duration-200
                hover:bg-[#FAF6F0]
                hover:text-[#4B3932]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="edit-routing-rule-name"
              className="text-sm font-semibold text-[#4B3932]"
            >
              Rule Name
            </label>

            <input
              id="edit-routing-rule-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              disabled={mutation.isPending}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                placeholder:text-stone-400
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />
          </div>

          <div>
            <label htmlFor="edit-routing-project" className="text-sm font-semibold text-[#4B3932]">
              Monitoring Project
            </label>

            <select
              id="edit-routing-project"
              value={monitoringProjectId}
              onChange={(event) => handleProjectChange(event.target.value)}
              disabled={isProjectsLoading || mutation.isPending}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <option value="">
                {isProjectsLoading ? "Loading projects..." : "Select monitoring project"}
              </option>

              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            {selectedProject && (
              <p className="mt-2 text-xs text-stone-400">
                {selectedProject.description || "Monitoring project selected"}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit-routing-alert-rule"
              className="text-sm font-semibold text-[#4B3932]"
            >
              Alert Rule
            </label>

            <select
              id="edit-routing-alert-rule"
              value={alertRuleId}
              onChange={(event) => setAlertRuleId(event.target.value)}
              disabled={!monitoringProjectId || isAlertRulesLoading || mutation.isPending}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <option value="">
                {!monitoringProjectId
                  ? "Select project first"
                  : isAlertRulesLoading
                    ? "Loading alert rules..."
                    : alertRules.length === 0
                      ? "No alert rules found"
                      : "Select alert rule"}
              </option>

              {alertRules.map((alertRule) => (
                <option key={alertRule.id} value={alertRule.id}>
                  {alertRule.name}
                </option>
              ))}
            </select>

            {selectedAlertRule && (
              <div className="mt-2 rounded-xl bg-[#FAF6F0] px-3 py-2">
                <p className="text-xs text-stone-500">
                  Metric:{" "}
                  <span className="font-medium text-[#4B3932]">{selectedAlertRule.metric}</span>
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  Condition:{" "}
                  <span className="font-medium text-[#4B3932]">
                    {selectedAlertRule.operator} {selectedAlertRule.threshold}
                  </span>
                </p>
              </div>
            )}

            {isAlertRulesError && (
              <p className="mt-2 text-xs font-medium text-red-500">Failed to load alert rules.</p>
            )}

            {monitoringProjectId && !isAlertRulesLoading && alertRules.length === 0 && (
              <p className="mt-2 text-xs font-medium text-amber-600">
                No alert rules are available for this monitoring project.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="edit-routing-team" className="text-sm font-semibold text-[#4B3932]">
              Team
            </label>

            <select
              id="edit-routing-team"
              value={teamId}
              onChange={(event) => setTeamId(event.target.value)}
              disabled={isTeamsLoading || mutation.isPending}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <option value="">{isTeamsLoading ? "Loading teams..." : "Select team"}</option>

              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            {selectedTeam && (
              <p className="mt-2 text-xs text-stone-400">
                Matching alerts will be routed to{" "}
                <span className="font-medium text-[#4B3932]">{selectedTeam.name}</span>.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="edit-routing-priority" className="text-sm font-semibold text-[#4B3932]">
              Routing Priority
            </label>

            <input
              id="edit-routing-priority"
              type="number"
              min={1}
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              disabled={mutation.isPending}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            <p className="mt-2 text-xs text-stone-400">
              Lower priority numbers are evaluated first.
            </p>
          </div>

          {hasLoadingError && (
            <div
              className="
                rounded-xl
                border
                border-red-100
                bg-red-50
                px-4
                py-3
                text-sm
                font-medium
                text-red-600
              "
            >
              Failed to load teams, monitoring projects, or alert rules. Please try again.
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-[#F0E7D5] pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={mutation.isPending}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                text-[#4B3932]
                transition-all
                duration-200
                hover:bg-[#FAF6F0]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={mutation.isPending || !isFormValid || isLoading || hasLoadingError}
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
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#3B2E29]
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {mutation.isPending ? "Updating..." : "Update Rule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
