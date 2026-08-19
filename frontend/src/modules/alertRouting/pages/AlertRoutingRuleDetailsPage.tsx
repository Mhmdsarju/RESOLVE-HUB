import { ArrowLeft, CalendarDays, GitBranch, Pencil, Route, Trash2 } from "lucide-react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAlertRoutingRule } from "../hooks/useAlertRoutingRule";
import { useAlertRules } from "@/modules/alertRule/hooks/useAlertRules";

import { useTeams } from "@/modules/team/hooks/useTeams";
import { useMonitoringProjects } from "@/modules/monitoring/hooks/useMonitoringProjects";

import EditAlertRoutingRuleModal from "../components/EditAlertRoutingRuleModal";
import DeleteAlertRoutingRuleModal from "../components/DeleteAlertRoutingRuleModal";

import type { AlertRoutingRule } from "../types/alertRoutingRule.types";

export default function AlertRoutingRuleDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [editingRule, setEditingRule] = useState<AlertRoutingRule | null>(null);

  const [deletingRule, setDeletingRule] = useState<AlertRoutingRule | null>(null);

  const { data: rule, isLoading, isError } = useAlertRoutingRule(id ?? "");

  const { data: teamsData, isLoading: isTeamsLoading } = useTeams({ page: 1, limit: 10 });

  const { data: projectsData, isLoading: isProjectsLoading } = useMonitoringProjects({
    page: 1,
    limit: 100,
  });

  const { data: alertRulesData, isLoading: isAlertRulesLoading } = useAlertRules({
    projectId: rule?.monitoringProjectId ?? "",
    page: 1,
    limit: 100,
  });

  const teams = teamsData?.items ?? [];
  const projects = projectsData?.data ?? [];
  const alertRules = alertRulesData?.items ?? [];

  const selectedTeam = rule ? teams.find((team) => team.id === rule.teamId) : undefined;

  const selectedProject = rule    ? projects.find((project) => project.id === rule.monitoringProjectId)    : undefined;

  const selectedAlertRule = rule    ? alertRules.find((alertRule) => alertRule.id === rule.alertRuleId)    : undefined;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div
          className="
            h-10
            w-40
            animate-pulse
            rounded-xl
            bg-[#F0E7D5]
          "
        />

        <div
          className="
            h-64
            animate-pulse
            rounded-3xl
            bg-white
            shadow-sm
          "
        />

        <div className="grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                  h-28
                  animate-pulse
                  rounded-2xl
                  bg-white
                  shadow-sm
                "
            />
          ))}
        </div>

        <div
          className="
            h-64
            animate-pulse
            rounded-2xl
            bg-white
            shadow-sm
          "
        />
      </div>
    );
  }

  if (isError || !rule) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            bg-white
            p-8
            text-center
            shadow-lg
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-red-50
              text-red-500
            "
          >
            <GitBranch size={25} />
          </div>

          <h2
            className="
              mt-5
              text-xl
              font-bold
              text-[#4B3932]
            "
          >
            Routing rule not found
          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-stone-500
            "
          >
            We couldn't load this alert routing rule. It may have been removed or you may not have
            permission to view it.
          </p>

          <button
            type="button"
            onClick={() => navigate("/alert-routing-rules")}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#4B3932]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#3B2E29]
              hover:shadow-lg
            "
          >
            <ArrowLeft size={17} />
            Back to Routing Rules
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditingRule(rule);
  };

  const handleDelete = () => {
    setDeletingRule(rule);
  };

  return (
    <div className="space-y-6">
      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <button
          type="button"
          onClick={() => navigate("/alert-routing-rules")}
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            border
            border-[#E7DDD3]
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-[#4B3932]
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#FAF6F0]
            hover:shadow-md
          "
        >
          <ArrowLeft size={17} />
          Back to Routing Rules
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleEdit}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-[#4B3932]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#FAF6F0]
              hover:shadow-md
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-100
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-red-600
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-red-50
              hover:shadow-md
            "
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-[#4B3932]
          p-7
          shadow-lg
          sm:p-8
        "
      >
        <div
          className="
            absolute
            -right-20
            -top-20
            h-52
            w-52
            rounded-full
            bg-white/5
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -left-16
            h-44
            w-44
            rounded-full
            bg-white/0.03
          "
        />

        <div className="relative">
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                text-[#F0E7D5]
              "
            >
              <GitBranch size={26} />
            </div>

            <div className="min-w-0">
              <div
                className="
                  inline-flex
                  rounded-full
                  bg-white/10
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#F0E7D5]
                "
              >
                Alert Routing Rule
              </div>

              <h1
                className="
                  mt-4
                  wrap-break-words
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                {rule.name}
              </h1>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >
                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${rule.isActive ? "bg-green-100 text-green-700" : "bg-white/10 text-[#E7DDD3]"}
                  `}
                >
                  {rule.isActive ? "Active" : "Inactive"}
                </span>

                <span
                  className="
                    rounded-full
                    bg-white/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-[#E7DDD3]
                  "
                >
                  Priority {rule.priority}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div
          className="
            group
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#D8C9BD]
            hover:shadow-md
          "
        >
          <div className="flex items-center gap-3">
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
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Route size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-400">Assigned Team</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
                title={selectedTeam?.name ?? "Team unavailable"}
              >
                {isTeamsLoading ? "Loading..." : (selectedTeam?.name ?? "Team unavailable")}
              </p>

              <p className="mt-1 text-xs text-stone-400">Alerts will be routed here</p>
            </div>
          </div>
        </div>

        <div
          className="
            group
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#D8C9BD]
            hover:shadow-md
          "
        >
          <div className="flex items-center gap-3">
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
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <GitBranch size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-400">Monitoring Project</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
                title={selectedProject?.name ?? "Project unavailable"}
              >
                {isProjectsLoading
                  ? "Loading..."
                  : (selectedProject?.name ?? "Project unavailable")}
              </p>

              {selectedProject?.description && (
                <p
                  className="
                    mt-1
                    truncate
                    text-xs
                    text-stone-400
                  "
                  title={selectedProject.description}
                >
                  {selectedProject.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div
          className="
            group
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#D8C9BD]
            hover:shadow-md
          "
        >
          <div className="flex items-center gap-3">
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
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <CalendarDays size={18} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-400">Created</p>

              <p
                className="
                  mt-1
                  truncate
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
                title={formatDate(rule.createdAt)}
              >
                {formatDate(rule.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

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
        <div className="flex items-center gap-3">
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
            <Route size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#4B3932]">Alert Rule</h2>

            <p className="text-xs text-stone-400">Alert rule associated with this routing rule.</p>
          </div>
        </div>

        <div className="mt-5">
          {isAlertRulesLoading ? (
            <div
              className="
                rounded-2xl
                bg-[#FAF6F0]
                p-5
              "
            >
              <p className="text-sm text-stone-400">Loading alert rule...</p>
            </div>
          ) : selectedAlertRule ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  p-4
                "
              >
                <p className="text-xs text-stone-400">Name</p>

                <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                  {selectedAlertRule.name}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  p-4
                "
              >
                <p className="text-xs text-stone-400">Metric</p>

                <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                  {selectedAlertRule.metric}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  p-4
                "
              >
                <p className="text-xs text-stone-400">Condition</p>

                <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                  {selectedAlertRule.operator} {selectedAlertRule.threshold}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  p-4
                "
              >
                <p className="text-xs text-stone-400">Severity</p>

                <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                  {selectedAlertRule.severity}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  p-4
                "
              >
                <p className="text-xs text-stone-400">Priority</p>

                <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                  {selectedAlertRule.priority}
                </p>
              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  p-4
                "
              >
                <p className="text-xs text-stone-400">Incident Creation</p>

                <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                  {selectedAlertRule.autoCreateIncident ? "Automatic" : "Manual"}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#D8C9BD]
                bg-[#FAF6F0]
                p-5
              "
            >
              <p className="text-sm font-semibold text-[#4B3932]">Alert rule unavailable</p>

              <p className="mt-1 text-xs text-stone-400">
                The alert rule associated with this routing rule could not be found.
              </p>
            </div>
          )}
        </div>
      </div>

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
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-stone-400">Created By</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">Organization User</p>
          </div>

          <div>
            <p className="text-xs font-medium text-stone-400">Last Updated</p>

            <p className="mt-1 text-sm font-semibold text-[#4B3932]">
              {formatDate(rule.updatedAt)}
            </p>
          </div>
        </div>
      </div>

      <EditAlertRoutingRuleModal
        key={editingRule?.id ?? "edit-routing-rule"}
        rule={editingRule}
        isOpen={Boolean(editingRule)}
        onClose={() => setEditingRule(null)}
      />

      <DeleteAlertRoutingRuleModal
        rule={deletingRule}
        isOpen={Boolean(deletingRule)}
        onClose={() => setDeletingRule(null)}
        onDeleted={() => {
          setDeletingRule(null);
          navigate("/alert-routing-rules");
        }}
      />
    </div>
  );
}
