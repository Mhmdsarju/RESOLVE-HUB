import {
  Activity,
  CheckCircle2,
  ChevronRight,
  CircleOff,
  Settings2,
  Trash2,
} from "lucide-react";

import type { AlertRuleCardProps } from "../types/alertRule.types";

import {  ALERT_OPERATOR_CONFIG,  ALERT_PRIORITY_CONFIG,  ALERT_SEVERITY_CONFIG,} from "../constants/alertRule.constants";

export default function AlertRuleCard({  rule,  onClick,  onEdit,  onDelete,}: AlertRuleCardProps) {
  
  const operator = ALERT_OPERATOR_CONFIG[rule.operator];

  return (
    <div
      className="
        group
        relative
        overflow-hidden
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
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={() => onClick(rule)}
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
            text-left
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F0E7D5]
              text-[#4B3932]
              shadow-sm
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:shadow-md
            "
          >
            <Activity size={21} />
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-base
                font-bold
                text-[#4B3932]
              "
              title={rule.name}
            >
              {rule.name}
            </h3>

            <p className="mt-1 truncate text-xs text-stone-400">
              {rule.metric}
            </p>
          </div>
        </button>

        <ChevronRight
          size={18}
          className="
            shrink-0
            text-stone-400
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </div>

      <div className="mt-5 rounded-xl bg-[#FAF6F0] p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-stone-500">
            Condition
          </span>

          <span className="text-sm font-bold text-[#4B3932]">
            {operator} {rule.threshold}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={`
              rounded-lg
              px-2.5
              py-1
              text-[11px]
              font-semibold
              ${ALERT_SEVERITY_CONFIG[rule.severity]}
            `}
          >
            {rule.severity}
          </span>

          <span
            className={`
              rounded-lg
              px-2.5
              py-1
              text-[11px]
              font-semibold
              ${ALERT_PRIORITY_CONFIG[rule.priority]}
            `}
          >
            {rule.priority}
          </span>

          {rule.isPredefined && (
            <span
              className="
                rounded-lg
                bg-[#F0E7D5]
                px-2.5
                py-1
                text-[11px]
                font-semibold
                text-[#4B3932]
              "
            >
              Predefined
            </span>
          )}
        </div>
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-[#F0E7D5]
          pt-4
        "
      >
        <div className="flex items-center gap-2">
          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              px-2.5
              py-1
              text-[11px]
              font-semibold
              ${
                rule.isActive
                  ? "bg-green-50 text-green-700"
                  : "bg-stone-100 text-stone-500"
              }
            `}
          >
            {rule.isActive ? (
              <CheckCircle2 size={12} />
            ) : (
              <CircleOff size={12} />
            )}

            {rule.isActive ? "Active" : "Inactive"}
          </span>

          {rule.autoCreateIncident && (
            <span className="text-[11px] font-medium text-stone-400">
              Auto incident
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(rule)}
            className="
              rounded-lg
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:bg-[#F0E7D5]
              hover:text-[#4B3932]
            "
            title="Edit alert rule"
          >
            <Settings2 size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(rule)}
            className="
              rounded-lg
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:bg-red-50
              hover:text-red-600
            "
            title="Delete alert rule"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}