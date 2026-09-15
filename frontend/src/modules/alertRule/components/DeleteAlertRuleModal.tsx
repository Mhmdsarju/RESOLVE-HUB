import { AlertTriangle, X } from "lucide-react";

import { useDeleteAlertRule } from "../hooks/useDeleteAlertRule";

import type { DeleteAlertRuleModalProps} from "../types/alertRule.types";


export default function DeleteAlertRuleModal({
  rule,
  projectId,
  isOpen,
  onClose,
  onDeleted,
}: DeleteAlertRuleModalProps) {
  const deleteMutation = useDeleteAlertRule();

  if (!isOpen || !rule) {
    return null;
  }

  const handleDelete = () => {
    deleteMutation.mutate(
      {
        id: rule.id,
        projectId,
      },
      {
        onSuccess: () => {
          onDeleted();
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
        backdrop-blur-sm
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
        "
      >
        <div className="flex items-start justify-between">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-red-50
              text-red-600
            "
          >
            <AlertTriangle size={22} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="
              rounded-xl
              p-2
              text-stone-400
              transition-all
              hover:bg-[#FAF6F0]
              hover:text-[#4B3932]
              disabled:opacity-50
            "
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#4B3932]">
          Delete Alert Rule?
        </h2>

        <p className="mt-2 text-sm leading-6 text-stone-500">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#4B3932]">
            {rule.name}
          </span>
          ? This action cannot be undone.
        </p>

        <div
          className="
            mt-5
            rounded-xl
            border
            border-red-100
            bg-red-50
            p-4
          "
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-red-500">
              Metric
            </span>

            <span className="text-sm font-semibold text-red-700">
              {rule.metric}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-medium text-red-500">
              Threshold
            </span>

            <span className="text-sm font-semibold text-red-700">
              {rule.operator} {rule.threshold}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleteMutation.isPending}
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
              hover:bg-[#FAF6F0]
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-red-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete Rule"}
          </button>
        </div>
      </div>
    </div>
  );
}