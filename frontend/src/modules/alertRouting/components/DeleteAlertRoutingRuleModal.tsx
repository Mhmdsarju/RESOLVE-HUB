import { AlertTriangle, X } from "lucide-react";

import { useDeleteAlertRoutingRule } from "../hooks/useDeleteAlertRoutingRule";

import type { DeleteAlertRoutingRuleModalProps } from "../types/alertRoutingRule.types";

export default function DeleteAlertRoutingRuleModal({
  rule,
  isOpen,
  onClose,
  onDeleted,
}: DeleteAlertRoutingRuleModalProps) {
  const mutation = useDeleteAlertRoutingRule();

  if (!isOpen || !rule) {
    return null;
  }

  const handleDelete = () => {
    mutation.mutate(rule.id, {
      onSuccess: () => {
        onClose();
        onDeleted?.();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
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
              text-red-500
            "
          >
            <AlertTriangle size={23} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-stone-400 hover:bg-[#FAF6F0]"
          >
            <X size={19} />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Delete Routing Rule?</h2>

        <p className="mt-2 text-sm leading-6 text-stone-500">
          Are you sure you want to delete <strong className="text-[#4B3932]">{rule.name}</strong>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-[#E7DDD3]
              px-5
              py-3
              text-sm
              font-semibold
              text-[#4B3932]
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={mutation.isPending}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {mutation.isPending ? "Deleting..." : "Delete Rule"}
          </button>
        </div>
      </div>
    </div>
  );
}
