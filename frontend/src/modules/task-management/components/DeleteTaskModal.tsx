import { AlertTriangle, X } from "lucide-react";

import type { DeleteTaskModalProps } from "../types/task.types";

export default function DeleteTaskModal({
  taskTitle,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteTaskModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E7DDD3] px-6 py-5">
          <h2 className="text-lg font-bold text-[#4B3932]">Delete Task</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl p-2 text-stone-400 transition hover:bg-[#FAF6F0] hover:text-[#4B3932] disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <AlertTriangle size={23} />
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#4B3932]">
                Are you sure you want to delete this task?
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                This will permanently delete{" "}
                <span className="font-semibold text-[#4B3932]">"{taskTitle}"</span>. This action
                cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#E7DDD3] px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-[#E7DDD3] bg-white px-4 py-2.5 text-sm font-semibold text-[#4B3932] transition hover:bg-[#FAF6F0] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
