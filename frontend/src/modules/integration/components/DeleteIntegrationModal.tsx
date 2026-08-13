import { AlertTriangle, Trash2, X } from "lucide-react";

import { useDeleteIntegration } from "../hooks/useDeleteIntegration";

import type { Integration } from "../types/integration.types";


interface DeleteIntegrationModalProps {
  integration: Integration | null;
  isOpen: boolean;
  onClose: () => void;
}


export default function DeleteIntegrationModal({
  integration,
  isOpen,
  onClose,
}: DeleteIntegrationModalProps) {
  const deleteMutation = useDeleteIntegration();


  if (!isOpen || !integration) {
    return null;
  }


  const handleDelete = () => {
    deleteMutation.mutate(
      {
        id: integration.id,
      },
      {
        onSuccess: () => {
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
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !deleteMutation.isPending
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <div className="p-6">

          <div className="flex items-start justify-between gap-4">

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-red-50
                text-red-600
              "
            >
              <AlertTriangle size={23} />
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


          <div className="mt-5">

            <h2 className="text-xl font-bold text-[#4B3932]">
              Delete Integration?
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Are you sure you want to delete this integration?
              This action cannot be undone.
            </p>

          </div>


          <div
            className="
              mt-5
              rounded-2xl
              border
              border-red-100
              bg-red-50/60
              p-4
            "
          >
            <p
              className="
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-red-400
              "
            >
              Integration
            </p>

            <p
              className="
                mt-1
                truncate
                text-sm
                font-bold
                text-[#4B3932]
              "
            >
              {integration.name}
            </p>

            <p className="mt-1 text-xs text-stone-500">
              {integration.type}
            </p>

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
                duration-200
                hover:bg-[#FAF6F0]
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
                duration-300
                hover:-translate-y-0.5
                hover:bg-red-700
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Trash2 size={16} />

              {deleteMutation.isPending
                ? "Deleting..."
                : "Delete Integration"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}