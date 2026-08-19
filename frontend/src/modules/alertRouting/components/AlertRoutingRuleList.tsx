import { ChevronRight, Edit, GitBranch, Trash2 } from "lucide-react";

// import { useAlertRules } from "@/modules/alertRule/hooks/useAlertRules";
import { useTeams } from "@/modules/team/hooks/useTeams";

import type { AlertRoutingRule, AlertRoutingRuleListProps } from "../types/alertRoutingRule.types";

export default function AlertRoutingRuleList({
  rules,
  isLoading,
  isError,
  onRuleClick,
  onRuleEdit,
  onRuleDelete,
}: AlertRoutingRuleListProps) {
  const { data: teamsData, isLoading: isTeamsLoading } = useTeams({    page: 1,    limit: 100,  });

  const teams = teamsData?.items ?? [];

  const getTeamName = (teamId: string) => {
    const team = teams.find((item) => item.id === teamId);

    return team?.name ?? "Team unavailable";
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="
              h-24
              animate-pulse
              rounded-2xl
              bg-[#FAF6F0]
            "
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 text-center">
        <p className="text-sm font-medium text-red-600">Failed to load alert routing rules.</p>
      </div>
    );
  }

  if (rules.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-[#E7DDD3]
          bg-[#FAF6F0]
          p-10
          text-center
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
            bg-white
            text-[#4B3932]
            shadow-sm
          "
        >
          <GitBranch size={25} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-[#4B3932]">No routing rules</h3>

        <p className="mt-2 text-sm text-stone-500">
          Create a routing rule to determine which team should receive an alert.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {rules.map((rule: AlertRoutingRule) => {
        const teamName = isTeamsLoading ? "Loading..." : getTeamName(rule.teamId);

        return (
          <div
            key={rule.id}
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
              hover:-translate-y-0.5
              hover:border-[#D8C9BD]
              hover:shadow-md
            "
          >
            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              <button
                type="button"
                onClick={() => onRuleClick(rule)}
                className="min-w-0 flex-1 text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#F0E7D5]
                      text-[#4B3932]
                      transition-all
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <GitBranch size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        className="
                          truncate
                          text-base
                          font-bold
                          text-[#4B3932]
                        "
                      >
                        {rule.name}
                      </h3>

                      <span
                        className={`
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          ${
                            rule.isActive
                              ? "bg-green-50 text-green-600"
                              : "bg-stone-100 text-stone-500"
                          }
                        `}
                      >
                        {rule.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div
                      className="
                        mt-3
                        flex
                        flex-wrap
                        gap-x-5
                        gap-y-2
                        text-xs
                        text-stone-500
                      "
                    >
                      <span>
                        Priority: <strong className="text-[#4B3932]">{rule.priority}</strong>
                      </span>

                      <span>
                        Team: <strong className="text-[#4B3932]">{teamName}</strong>
                      </span>

                      <span>
                        Alert Rule: <strong className="text-[#4B3932]">{rule.alertRuleId}</strong>
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={18}
                    className="
                      mt-2
                      shrink-0
                      text-stone-300
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-[#4B3932]
                    "
                  />
                </div>
              </button>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  lg:shrink-0
                "
              >
                <button
                  type="button"
                  onClick={() => onRuleEdit(rule)}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-[#4B3932]
                    transition-all
                    duration-300
                    hover:bg-[#FAF6F0]
                    hover:shadow-sm
                  "
                >
                  <Edit size={15} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onRuleDelete(rule)}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-red-100
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-red-600
                    transition-all
                    duration-300
                    hover:bg-red-50
                    hover:shadow-sm
                  "
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
