import { useState } from "react";
import { Activity, ArrowLeft, Plus, Settings2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useAlertRules } from "../hooks/useAlertRules";

import AlertRuleList from "../components/AlertRuleList";
import CreateAlertRuleModal from "../components/CreateAlertRuleModal";
import EditAlertRuleModal from "../components/EditAlertRuleModal";
import DeleteAlertRuleModal from "../components/DeleteAlertRuleModal";
import DefaultAlertRulesModal from "../components/DefaultAlertRulesModal";

import type { AlertRule } from "../types/alertRule.types";

export default function AlertRuleListPage() {
  const navigate = useNavigate();

  const { projectId } = useParams<{
    projectId: string;
  }>();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isDefaultRulesOpen, setIsDefaultRulesOpen] = useState(false);

  const [editingRule, setEditingRule] = useState<AlertRule | null>(null);

  const [deletingRule, setDeletingRule] = useState<AlertRule | null>(null);

  const { data, isLoading, isError } = useAlertRules({
    projectId: projectId ?? "",
    page: 1,
    limit: 100,
  });

  const rules = data?.items ?? [];

  const handleRuleClick = (rule: AlertRule) => {
    navigate(`/monitoring/${projectId}/alert-rules/${rule.id}`);
  };

  if (!projectId) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
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
            <Activity size={25} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Monitoring project not found</h2>

          <button
            type="button"
            onClick={() => navigate("/monitoring")}
            className="
              mt-5
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
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

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
        <div>
          <button
            type="button"
            onClick={() => navigate(`/monitoring/${projectId}`)}
            className="
              mb-4
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
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#FAF6F0]
              hover:shadow-md
            "
          >
            <ArrowLeft size={17} />
            Back to Project
          </button>

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-[#F0E7D5]
                text-[#4B3932]
              "
            >
              <Settings2 size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#4B3932] sm:text-3xl">Alert Rules</h1>

              <p className="mt-1 text-sm text-stone-500">
                Configure metric-based alerts for this monitoring project.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDefaultRulesOpen(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-[#4B3932]
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#FAF6F0]
              hover:shadow-md
            "
          >
            <Settings2 size={18} />
            Default Rules
          </button>

          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#4B3932]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-[#3B2E29]
              hover:shadow-lg
            "
          >
            <Plus size={18} />
            Create Alert Rule
          </button>
        </div>
      </div>

      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
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
              <Settings2 size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Total Rules</p>

              <p className="mt-1 text-xl font-bold text-[#4B3932]">
                {isLoading ? "—" : (data?.pagination.total ?? 0)}
              </p>
            </div>
          </div>
        </div>

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
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-green-50
                text-green-600
              "
            >
              <Activity size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Active Rules</p>

              <p className="mt-1 text-xl font-bold text-[#4B3932]">
                {isLoading ? "—" : rules.filter((rule) => rule.isActive).length}
              </p>
            </div>
          </div>
        </div>

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
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-purple-50
                text-purple-600
              "
            >
              <Settings2 size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Predefined</p>

              <p className="mt-1 text-xl font-bold text-[#4B3932]">
                {isLoading ? "—" : rules.filter((rule) => rule.isPredefined).length}
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
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#4B3932]">Monitoring Rules</h2>

          <p className="mt-1 text-sm text-stone-500">
            Rules that determine when monitoring alerts should be triggered.
          </p>
        </div>

        <AlertRuleList
          rules={rules}
          isLoading={isLoading}
          isError={isError}
          onRuleClick={handleRuleClick}
          onRuleEdit={setEditingRule}
          onRuleDelete={setDeletingRule}
        />
      </div>

      <CreateAlertRuleModal
        projectId={projectId}
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <DefaultAlertRulesModal
        projectId={projectId}
        isOpen={isDefaultRulesOpen}
        onClose={() => setIsDefaultRulesOpen(false)}
      />

      <EditAlertRuleModal
        key={editingRule?.id ?? "edit-alert-rule"}
        rule={editingRule}
        projectId={projectId}
        isOpen={Boolean(editingRule)}
        onClose={() => setEditingRule(null)}
      />

      <DeleteAlertRuleModal
        rule={deletingRule}
        projectId={projectId}
        isOpen={Boolean(deletingRule)}
        onClose={() => setDeletingRule(null)}
        onDeleted={() => {
          setDeletingRule(null);
          navigate(`/monitoring/${projectId}/alert-rules`);
        }}
      />
    </div>
  );
}
