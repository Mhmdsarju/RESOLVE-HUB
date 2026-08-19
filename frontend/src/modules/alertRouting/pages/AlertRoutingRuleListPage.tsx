import { useState } from "react";
import { ArrowLeft, GitBranch, Plus, Route } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAlertRoutingRules } from "../hooks/useAlertRoutingRules";

import AlertRoutingRuleList from "../components/AlertRoutingRuleList";
import CreateAlertRoutingRuleModal from "../components/CreateAlertRoutingRuleModal";
import EditAlertRoutingRuleModal from "../components/EditAlertRoutingRuleModal";
import DeleteAlertRoutingRuleModal from "../components/DeleteAlertRoutingRuleModal";

import type { AlertRoutingRule } from "../types/alertRoutingRule.types";

export default function AlertRoutingRuleListPage() {
  const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [editingRule, setEditingRule] = useState<AlertRoutingRule | null>(null);

  const [deletingRule, setDeletingRule] = useState<AlertRoutingRule | null>(null);

  const { data: rules = [], isLoading, isError } = useAlertRoutingRules();

  const activeRules = rules.filter((rule) => rule.isActive);

  const inactiveRules = rules.filter((rule) => !rule.isActive);

  const handleRuleClick = (rule: AlertRoutingRule) => {
    navigate(`/monitoring/${rule.monitoringProjectId}/alert-routing-rules/${rule.id}`);
  };

  const handleCreateClose = () => {
    setIsCreateOpen(false);
  };

  const handleEditClose = () => {
    setEditingRule(null);
  };

  const handleDeleteClose = () => {
    setDeletingRule(null);
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
        <div>
          <button
            type="button"
            onClick={() => navigate("/monitoring")}
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
            Back to Monitoring
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
              <GitBranch size={23} />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-[#4B3932]
                  sm:text-3xl
                "
              >
                Alert Routing Rules
              </h1>

              <p className="mt-1 text-sm text-stone-500">
                Configure how alerts are routed to teams.
              </p>
            </div>
          </div>
        </div>

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
          Create Routing Rule
        </button>
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
              <Route size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Total Rules</p>

              <p className="mt-1 text-xl font-bold text-[#4B3932]">
                {isLoading ? "—" : rules.length}
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
              <GitBranch size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Active Rules</p>

              <p className="mt-1 text-xl font-bold text-[#4B3932]">
                {isLoading ? "—" : activeRules.length}
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
              <Route size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Inactive Rules</p>

              <p className="mt-1 text-xl font-bold text-[#4B3932]">
                {isLoading ? "—" : inactiveRules.length}
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
          <h2 className="text-xl font-bold text-[#4B3932]">Routing Rules</h2>

          <p className="mt-1 text-sm text-stone-500">
            Rules used to route matching alerts to the appropriate teams.
          </p>
        </div>

        <AlertRoutingRuleList
          rules={rules}
          isLoading={isLoading}
          isError={isError}
          onRuleClick={handleRuleClick}
          onRuleEdit={setEditingRule}
          onRuleDelete={setDeletingRule}
        />
      </div>

      <CreateAlertRoutingRuleModal isOpen={isCreateOpen} onClose={handleCreateClose} />

      <EditAlertRoutingRuleModal
        key={editingRule?.id ?? "edit-routing-rule"}
        rule={editingRule}
        isOpen={Boolean(editingRule)}
        onClose={handleEditClose}
      />

      <DeleteAlertRoutingRuleModal
        rule={deletingRule}
        isOpen={Boolean(deletingRule)}
        onClose={handleDeleteClose}
        onDeleted={() => {
          setDeletingRule(null);
          navigate("/alert-routing-rules");
        }}
      />
    </div>
  );
}
