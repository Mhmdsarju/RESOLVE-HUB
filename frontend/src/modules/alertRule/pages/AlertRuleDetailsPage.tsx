import {
  Activity,
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Pencil,
  ShieldAlert,
  Trash2,
  Zap,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useAlertRule } from "../hooks/useAlertRule";

import EditAlertRuleModal from "../components/EditAlertRuleModal";
import DeleteAlertRuleModal from "../components/DeleteAlertRuleModal";

import { ALERT_RULE_DETAIL_PAGE_priorityStyles,ALERT_RULE_DETAIL_PAGE_operatorLabels,ALERT_RULE_DETAIL_PAGE_severityStyles } from "../constants/alertRule.constants";

// import type { AlertRule } from "../types/alertRule.types";

const operatorLabels=ALERT_RULE_DETAIL_PAGE_operatorLabels

const severityStyles =ALERT_RULE_DETAIL_PAGE_severityStyles

const priorityStyles =ALERT_RULE_DETAIL_PAGE_priorityStyles

export default function AlertRuleDetailsPage() {
  const navigate = useNavigate();

  const { projectId, alertRuleId } = useParams<{
    projectId: string;
    alertRuleId: string;
  }>();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: rule, isLoading, isError } = useAlertRule(alertRuleId ?? "");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-36 animate-pulse rounded-xl bg-[#F0E7D5]" />

        <div className="h-64 animate-pulse rounded-3xl bg-white shadow-sm" />

        <div className="grid gap-5 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
          ))}
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />
      </div>
    );
  }

  if (isError || !rule) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
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
            <ShieldAlert size={25} />
          </div>

          <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Alert rule not found</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load this alert rule. It may have been removed or you may not have
            permission to view it.
          </p>

          <button
            type="button"
            onClick={() => navigate(`/monitoring/${projectId}/alert-rules`)}
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
            Back to Alert Rules
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
        <button
          type="button"
          onClick={() => navigate(`/monitoring/${projectId}/alert-rules`)}
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
          Back to Alert Rules
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
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
            onClick={() => setIsDeleteOpen(true)}
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
          transition-all
          duration-300
          hover:shadow-xl
          sm:p-8
        "
      >
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/5" />

        <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-white/5" />

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
                backdrop-blur-sm
              "
            >
              <Activity size={26} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="
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
                  Alert Rule
                </span>

                {rule.isPredefined && (
                  <span
                    className="
                      rounded-full
                      bg-white/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-[#F0E7D5]
                    "
                  >
                    Predefined
                  </span>
                )}
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

              <p className="mt-3 text-sm leading-6 text-[#E7DDD3]">
                Monitor <span className="font-semibold text-white">{rule.metric}</span> and trigger
                an alert when the configured threshold is reached.
              </p>
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
            hover:shadow-lg
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
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Activity size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Condition</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {operatorLabels[rule.operator]}
              </p>
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
            hover:shadow-lg
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
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <Zap size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Threshold</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">{rule.threshold}</p>
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
            hover:shadow-lg
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
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Status</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {rule.isActive ? "Active" : "Inactive"}
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
            <ShieldAlert size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#4B3932]">Rule Configuration</h2>

            <p className="text-xs text-stone-400">Alert rule monitoring and incident settings</p>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-[#FAF6F0] p-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-stone-400">Metric</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">{rule.metric}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Condition</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {operatorLabels[rule.operator]}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Threshold</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">{rule.threshold}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Severity</p>

              <span
                className={`
                  mt-1
                  inline-flex
                  rounded-full
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                  ${severityStyles[rule.severity]}
                `}
              >
                {rule.severity}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Priority</p>

              <span
                className={`
                  mt-1
                  inline-flex
                  rounded-full
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                  ${priorityStyles[rule.priority]}
                `}
              >
                {rule.priority}
              </span>
            </div>

            <div>
              <p className="text-xs font-medium text-stone-400">Auto Create Incident</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {rule.autoCreateIncident ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div
          className="
            rounded-2xl
            border
            border-[#E7DDD3]
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <CalendarDays size={19} className="text-[#4B3932]" />

            <div>
              <p className="text-xs font-medium text-stone-400">Created</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {new Date(rule.createdAt).toLocaleString()}
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
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <Clock3 size={19} className="text-[#4B3932]" />

            <div>
              <p className="text-xs font-medium text-stone-400">Last Updated</p>

              <p className="mt-1 text-sm font-semibold text-[#4B3932]">
                {new Date(rule.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <EditAlertRuleModal
        rule={rule}
        projectId={projectId ?? ""}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
      />

      <DeleteAlertRuleModal
        rule={rule}
        projectId={projectId ?? ""}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDeleted={() => {
          setIsDeleteOpen(false);
          navigate(`/monitoring/${projectId}/alert-rules`);
        }}
      />
    </div>
  );
}
