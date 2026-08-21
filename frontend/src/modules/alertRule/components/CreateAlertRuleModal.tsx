import { useState } from "react";

import { Activity, X } from "lucide-react";

import { useCreateAlertRule } from "../hooks/useCreateAlertRule";

import type {  AlertOperator,  CreateAlertRuleModalProps,} from "../types/alertRule.types";

import type {  IncidentPriority,  IncidentSeverity,} from "@/modules/incident/types/incident.types";

import {  ALERT_OPERATOR_OPTIONS,  ALERT_PRIORITY_OPTIONS,  ALERT_SEVERITY_OPTIONS,} from "../constants/alertRule.constants";

export default function CreateAlertRuleModal({  projectId,  isOpen,  onClose,}: CreateAlertRuleModalProps) {
  const createMutation = useCreateAlertRule();

  const [name, setName] = useState("");
  const [metric, setMetric] = useState("");
  const [operator, setOperator] =    useState<AlertOperator>("GT");
  const [threshold, setThreshold] = useState("");
  const [severity, setSeverity] =    useState<IncidentSeverity>("MEDIUM");
  const [priority, setPriority] =    useState<IncidentPriority>("P2");
  const [autoCreateIncident, setAutoCreateIncident] =    useState(false);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (createMutation.isPending) {
      return;
    }

    setName("");
    setMetric("");
    setOperator("GT");
    setThreshold("");
    setSeverity("MEDIUM");
    setPriority("P2");
    setAutoCreateIncident(false);

    onClose();
  };

  const handleSubmit = (    event: React.FormEvent<HTMLFormElement>,  ) => {
    event.preventDefault();

    const parsedThreshold = Number(threshold);

    if (
      !name.trim() ||
      !metric.trim() ||
      !Number.isFinite(parsedThreshold)
    ) {
      return;
    }

    createMutation.mutate(
      {
        projectId,
        data: {
          name: name.trim(),
          metric: metric.trim(),
          operator,
          threshold: parsedThreshold,
          severity,
          priority,
          autoCreateIncident,
        },
      },
      {
        onSuccess: () => {
          setName("");
          setMetric("");
          setOperator("GT");
          setThreshold("");
          setSeverity("MEDIUM");
          setPriority("P2");
          setAutoCreateIncident(false);

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
          max-w-lg
          overflow-y-auto
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <div className="p-6">
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
                <Activity size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#4B3932]">
                  Create Alert Rule
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  Configure a metric threshold for this monitoring project.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={createMutation.isPending}
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
              <X size={18} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="alert-rule-name"
                className="text-sm font-semibold text-[#4B3932]"
              >
                Rule Name
              </label>

              <input
                id="alert-rule-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="High CPU Usage"
                required
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
                "
              />
            </div>

            <div>
              <label
                htmlFor="alert-rule-metric"
                className="text-sm font-semibold text-[#4B3932]"
              >
                Metric
              </label>

              <input
                id="alert-rule-metric"
                type="text"
                value={metric}
                onChange={(event) =>
                  setMetric(event.target.value)
                }
                placeholder="cpu_usage"
                required
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
                "
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="alert-rule-operator"
                  className="text-sm font-semibold text-[#4B3932]"
                >
                  Operator
                </label>

                <select
                  id="alert-rule-operator"
                  value={operator}
                  onChange={(event) =>
                    setOperator(
                      event.target.value as AlertOperator,
                    )
                  }
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
                  "
                >
                  {ALERT_OPERATOR_OPTIONS.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="alert-rule-threshold"
                  className="text-sm font-semibold text-[#4B3932]"
                >
                  Threshold
                </label>

                <input
                  id="alert-rule-threshold"
                  type="number"
                  value={threshold}
                  onChange={(event) =>
                    setThreshold(event.target.value)
                  }
                  placeholder="90"
                  required
                  step="any"
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
                  "
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="alert-rule-severity"
                  className="text-sm font-semibold text-[#4B3932]"
                >
                  Severity
                </label>

                <select
                  id="alert-rule-severity"
                  value={severity}
                  onChange={(event) =>
                    setSeverity(
                      event.target.value as IncidentSeverity,
                    )
                  }
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
                  "
                >
                  {ALERT_SEVERITY_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="alert-rule-priority"
                  className="text-sm font-semibold text-[#4B3932]"
                >
                  Priority
                </label>

                <select
                  id="alert-rule-priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value as IncidentPriority,
                    )
                  }
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
                  "
                >
                  {ALERT_PRIORITY_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label
              className="
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                p-4
                transition-all
                duration-200
                hover:border-[#D8C9BD]
              "
            >
              <div>
                <p className="text-sm font-semibold text-[#4B3932]">
                  Auto-create incident
                </p>

                <p className="mt-1 text-xs text-stone-400">
                  Automatically create an incident when this rule fires.
                </p>
              </div>

              <input
                type="checkbox"
                checked={autoCreateIncident}
                onChange={(event) =>
                  setAutoCreateIncident(event.target.checked)
                }
                className="
                  h-5
                  w-5
                  rounded
                  border-[#D8C9BD]
                  accent-[#4B3932]
                "
              />
            </label>

            <div className="flex justify-end gap-3 border-t border-[#F0E7D5] pt-5">
              <button
                type="button"
                onClick={handleClose}
                disabled={createMutation.isPending}
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
                disabled={
                  createMutation.isPending ||
                  !name.trim() ||
                  !metric.trim() ||
                  !threshold
                }
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
                {createMutation.isPending
                  ? "Creating..."
                  : "Create Alert Rule"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}