import { AlertTriangle, Trash2, X } from "lucide-react";

import { useDeleteMonitoringProject } from "../hooks/useDeleteMonitoringProject";

import type { DeleteMonitoringProjectModalProps} from "../types/monitoringProject.types";


export default function DeleteMonitoringProjectModal({  project,  isOpen,  onClose,  onDeleted,}: DeleteMonitoringProjectModalProps) {
  const deleteMutation = useDeleteMonitoringProject();

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (deleteMutation.isPending) {
      return;
    }

    onClose();
  };

  const handleDelete = () => {
    deleteMutation.mutate(project.id, {
      onSuccess: () => {
        onDeleted();
      },
    });
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
                bg-red-50
                text-red-600
              "
            >
              <AlertTriangle size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#4B3932]">Delete Project</h2>

              <p className="mt-1 text-xs text-stone-400">This action cannot be undone.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={deleteMutation.isPending}
            className="
              rounded-lg
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

        <div
          className="
            mt-6
            rounded-2xl
            border
            border-red-100
            bg-red-50/70
            p-4
          "
        >
          <p className="text-sm leading-6 text-stone-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#4B3932]">{project.name}</span>?
          </p>

          <p className="mt-2 text-xs leading-5 text-stone-500">
            The monitoring project and its associated project record will be permanently removed.
          </p>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={deleteMutation.isPending}
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
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-red-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <Trash2 size={16} />

            {deleteMutation.isPending ? "Deleting..." : "Delete Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
