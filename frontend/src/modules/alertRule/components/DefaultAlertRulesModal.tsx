import { useState } from "react";
import { Activity, Check, CheckCircle2, X } from "lucide-react";

import { useAlertRuleDefaults } from "../hooks/useAlertRuleDefaults";
import { useApplyDefaultAlertRule } from "../hooks/useApplyDefaultAlertRule";

import type { AlertRule ,DefaultAlertRulesModalProps} from "../types/alertRule.types";

const severityStyles: Record<string, string> = {
  LOW: "bg-blue-50 text-blue-700 border-blue-200",
  MEDIUM: "bg-yellow-50 text-yellow-700 border-yellow-200",
  HIGH: "bg-orange-50 text-orange-700 border-orange-200",
  CRITICAL: "bg-red-50 text-red-700 border-red-200",
};

const priorityStyles: Record<string, string> = {
  P1: "bg-red-50 text-red-700 border-red-200",
  P2: "bg-orange-50 text-orange-700 border-orange-200",
  P3: "bg-yellow-50 text-yellow-700 border-yellow-200",
  P4: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function DefaultAlertRulesModal({  projectId,  isOpen,  onClose,}: DefaultAlertRulesModalProps) {
  const [selectedRuleKey, setSelectedRuleKey] = useState<string | null>(null);

  const { data: defaultRules = [], isLoading, isError } = useAlertRuleDefaults();

  const applyMutation = useApplyDefaultAlertRule();

  if (!isOpen) {
    return null;
  }

  const getRuleKey = (rule: AlertRule, index: number) => {
    return rule.id ?? rule.name ?? `rule-${index}`;
  };

  const selectedRule =    defaultRules.find((rule, index) => getRuleKey(rule, index) === selectedRuleKey) ?? null;

  const handleClose = () => {
    if (applyMutation.isPending) {
      return;
    }

    setSelectedRuleKey(null);
    onClose();
  };

  const handleSelectRule = (key: string) => {
    if (applyMutation.isPending) {
      return;
    }

    setSelectedRuleKey((previousKey) => (previousKey === key ? null : key));
  };

  const handleApply = () => {
    if (!selectedRule || applyMutation.isPending) {
      return;
    }

    applyMutation.mutate(
      {
        projectId,
        data: {
          defaultRuleName: selectedRule.name,
        },
      },
      {
        onSuccess: () => {
          setSelectedRuleKey(null);
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
        bg-[#4B3932]/40
        px-4
        py-6
        backdrop-blur-md
        transition-all
        animate-in
        fade-in
        duration-200
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="
          flex
          max-h-[85vh]
          w-full
          max-w-xl
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-[#E7DDD3]
          bg-[#F0E7D5]/40
          p-1
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <div className="flex h-full flex-col rounded-[22px] bg-[#FFFEFC]">
          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-[#E7DDD3]
              p-6
            "
          >
            <div className="flex items-center gap-4">
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
                  shadow-sm
                "
              >
                <Activity size={22} />
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight text-[#4B3932]">
                  Default Alert Rules
                </h2>

                <p className="mt-0.5 text-xs text-stone-500">
                  Select a rule template to monitor your project.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={applyMutation.isPending}
              className="
                rounded-xl
                p-2
                text-stone-400
                transition
                hover:bg-[#F0E7D5]
                hover:text-[#4B3932]
                disabled:opacity-50
              "
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-6">
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="
                        h-24
                        animate-pulse
                        rounded-2xl
                        bg-[#F0E7D5]/60
                      "
                  />
                ))}
              </div>
            )}

            {isError && (
              <div
                className="
                  rounded-2xl
                  border
                  border-red-100
                  bg-red-50
                  p-6
                  text-center
                "
              >
                <Activity size={26} className="mx-auto text-red-500" />

                <p className="mt-2 text-sm font-semibold text-red-800">Failed to load rules</p>

                <p className="mt-0.5 text-xs text-red-600">Please refresh or try again later.</p>
              </div>
            )}

            {!isLoading && !isError && defaultRules.length === 0 && (
              <div
                className="
                    rounded-2xl
                    border
                    border-dashed
                    border-[#E7DDD3]
                    bg-[#FAF7F2]
                    p-8
                    text-center
                  "
              >
                <Activity size={26} className="mx-auto text-stone-400" />

                <p className="mt-2 text-sm font-semibold text-[#4B3932]">No default rules found</p>

                <p className="mt-0.5 text-xs text-stone-400">
                  There are no predefined alert rules available right now.
                </p>
              </div>
            )}

            {!isLoading &&
              !isError &&
              defaultRules.map((rule, index) => {
                const ruleKey = getRuleKey(rule, index);

                const isSelected = selectedRuleKey === ruleKey;

                return (
                  <button
                    key={ruleKey}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => handleSelectRule(ruleKey)}
                    disabled={applyMutation.isPending}
                    className={`
                      group
                      relative
                      w-full
                      cursor-pointer
                      select-none
                      rounded-2xl
                      border-2
                      p-4
                      text-left
                      outline-none
                      transition-all
                      duration-200
                      focus-visible:ring-2
                      focus-visible:ring-[#4B3932]/20

                      ${
                        isSelected
                          ? `
                            border-[#4B3932]
                            bg-[#F0E7D5]
                            shadow-md
                            ring-1
                            ring-[#4B3932]/10
                          `
                          : `
                            border-[#E7DDD3]
                            bg-[#FFFEFC]
                            hover:border-[#BFAEA1]
                            hover:bg-[#FAF7F2]
                            hover:shadow-sm
                          `
                      }

                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={`
                            mt-0.5
                            flex
                            h-5
                            w-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            transition-all
                            duration-200

                            ${
                              isSelected
                                ? `
                                  border-[#4B3932]
                                  bg-[#4B3932]
                                  text-white
                                `
                                : `
                                  border-[#D6CCC3]
                                  bg-white
                                  group-hover:border-[#9F8F84]
                                `
                            }
                          `}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`
                                truncate
                                text-sm
                                font-bold
                                ${isSelected ? "text-[#3B2E29]" : "text-[#4B3932]"}
                              `}
                            >
                              {rule.name}
                            </h3>

                            {isSelected && (
                              <CheckCircle2 size={15} className="shrink-0 text-[#4B3932]" />
                            )}
                          </div>

                          <p className="mt-1 font-mono text-xs text-stone-500">
                            {rule.metric} {rule.operator} {rule.threshold}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          shrink-0
                          rounded-md
                          bg-[#F0E7D5]
                          px-2
                          py-0.5
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wide
                          text-[#4B3932]
                        "
                      >
                        Default
                      </span>
                    </div>

                    <div className="mt-3.5 flex flex-wrap gap-1.5 pl-8">
                      <span
                        className={`
                          rounded-md
                          border
                          px-2
                          py-0.5
                          text-[11px]
                          font-semibold
                          ${
                            severityStyles[rule.severity] ??
                            "border-stone-200 bg-stone-50 text-stone-600"
                          }
                        `}
                      >
                        {rule.severity}
                      </span>

                      <span
                        className={`
                          rounded-md
                          border
                          px-2
                          py-0.5
                          text-[11px]
                          font-semibold
                          ${
                            priorityStyles[rule.priority] ??
                            "border-stone-200 bg-stone-50 text-stone-600"
                          }
                        `}
                      >
                        {rule.priority}
                      </span>

                      {rule.autoCreateIncident && (
                        <span
                          className="
                            rounded-md
                            border
                            border-emerald-200
                            bg-emerald-50
                            px-2
                            py-0.5
                            text-[11px]
                            font-semibold
                            text-emerald-700
                          "
                        >
                          Auto Incident
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              justify-end
              gap-3
              rounded-b-[22px]
              border-t
              border-[#E7DDD3]
              bg-[#FAF7F2]
              p-5
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={applyMutation.isPending}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-[#4B3932]
                transition
                hover:bg-[#F0E7D5]
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              disabled={!selectedRule || applyMutation.isPending}
              className="
                rounded-xl
                bg-[#4B3932]
                px-5
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-sm
                transition-all
                hover:bg-[#3B2E29]
                hover:shadow
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {applyMutation.isPending
                ? "Applying..."
                : selectedRule
                  ? "Apply Selected Rule"
                  : "Select a Rule"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
