import { useState } from "react";
import { CheckCircle2, ChevronDown, X } from "lucide-react";

import { useUpdateIncidentStatus } from "../hooks/useUpdateIncidentStatus";

import type { Incident, IncidentStatus } from "../types/incident.types";

interface IncidentStatusSelectProps {
  incident: Incident;
}

const statusLabels: Record<IncidentStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const statusStyles: Record<IncidentStatus, string> = {
  OPEN: "bg-blue-50 text-blue-700 border-blue-100",
  IN_PROGRESS: "bg-purple-50 text-purple-700 border-purple-100",
  RESOLVED: "bg-green-50 text-green-700 border-green-100",
  CLOSED: "bg-stone-100 text-stone-700 border-stone-200",
};

export default function IncidentStatusSelect({ incident }: IncidentStatusSelectProps) {
  const updateStatusMutation = useUpdateIncidentStatus();

  const [pendingStatus, setPendingStatus] = useState<IncidentStatus | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as IncidentStatus;

    if (newStatus === incident.status) {
      return;
    }

    setPendingStatus(newStatus);
  };

  const handleConfirm = () => {
    if (!pendingStatus) {
      return;
    }

    updateStatusMutation.mutate(
      {
        id: incident.id,
        data: {
          status: pendingStatus,
        },
      },
      {
        onSuccess: () => {
          setPendingStatus(null);
        },
      },
    );
  };

  const handleCancel = () => {
    if (updateStatusMutation.isPending) {
      return;
    }

    setPendingStatus(null);
  };

  return (
    <>
      <div className="relative">
        <select
          value={incident.status}
          onChange={handleChange}
          disabled={updateStatusMutation.isPending}
          className={`
            w-full
            appearance-none
            rounded-xl
            border
            px-4
            py-3
            pr-10
            text-sm
            font-semibold
            outline-none
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-sm
            focus:ring-2
            focus:ring-[#4B3932]/10
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${statusStyles[incident.status]}
          `}
        >
          {(Object.keys(statusLabels) as IncidentStatus[]).map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-current
          "
        />
      </div>

      {pendingStatus && (
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
            backdrop-blur-[2px]
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white
              p-6
              shadow-2xl
              transition-all
              duration-300
            "
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F0E7D5]
                    text-[#4B3932]
                  "
                >
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#4B3932]">Change Status</h2>

                  <p className="text-xs text-stone-400">Update incident status</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                disabled={updateStatusMutation.isPending}
                className="
                  rounded-lg
                  p-2
                  text-stone-400
                  transition
                  hover:bg-[#FAF6F0]
                  hover:text-[#4B3932]
                  disabled:opacity-50
                "
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-stone-500">
              Are you sure you want to change the incident status from{" "}
              <span className="font-semibold text-[#4B3932]">{statusLabels[incident.status]}</span>{" "}
              to <span className="font-semibold text-[#4B3932]">{statusLabels[pendingStatus]}</span>
              ?
            </p>

            <div className="mt-5 flex items-center gap-2">
              <span
                className={`
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${statusStyles[incident.status]}
                `}
              >
                {statusLabels[incident.status]}
              </span>

              <span className="text-stone-400">→</span>

              <span
                className={`
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  ${statusStyles[pendingStatus]}
                `}
              >
                {statusLabels[pendingStatus]}
              </span>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updateStatusMutation.isPending}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-[#4B3932]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#FAF6F0]
                  hover:shadow-sm
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={updateStatusMutation.isPending}
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
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#3B2E29]
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {updateStatusMutation.isPending ? "Updating..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
