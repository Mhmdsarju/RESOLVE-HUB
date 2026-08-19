import { Activity, RefreshCw } from "lucide-react";

import AlertRuleCard from "./AlertRuleCard";

import type { AlertRuleListProps } from "../types/alertRule.types";

export default function AlertRuleList({
  rules,
  isLoading,
  isError,
  onRuleClick,
  onRuleEdit,
  onRuleDelete,
}: AlertRuleListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              h-64
              animate-pulse
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              shadow-sm
            "
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-64
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-red-100
          bg-white
          px-6
          text-center
          shadow-sm
        "
      >
        <div
          className="
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
          <RefreshCw size={24} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-[#4B3932]">Unable to load alert rules</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Something went wrong while loading the alert rules for this monitoring project.
        </p>
      </div>
    );
  }

  if (rules.length === 0) {
    return (
      <div
        className="
          flex
          min-h-72
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-[#D8C9BD]
          bg-white
          px-6
          text-center
          shadow-sm
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#F0E7D5]
            text-[#4B3932]
          "
        >
          <Activity size={28} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">No alert rules yet</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Create an alert rule to automatically monitor metrics and trigger alerts for this
          monitoring project.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {rules.map((rule) => (
        <AlertRuleCard
          key={rule.id}
          rule={rule}
          onClick={onRuleClick}
          onEdit={onRuleEdit}
          onDelete={onRuleDelete}
        />
      ))}
    </div>
  );
}
