import { AlertTriangle, X } from "lucide-react";

import { useDeleteTeam } from "../hooks/useDeleteTeam";

import type { Team } from "../types/team.types";

interface DeleteTeamModalProps {
  team: Team;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteTeamModal({
  team,
  isOpen,
  onClose,
  onSuccess,
}: DeleteTeamModalProps) {
  const deleteTeamMutation = useDeleteTeam();

  if (!isOpen) {
    return null;
  }

  const handleDelete = async () => {
    await deleteTeamMutation.mutateAsync(team.id);
    onSuccess();
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
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-8
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
              rounded-full
              bg-red-100
              text-red-500
            "
          >
            <AlertTriangle size={24} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleteTeamMutation.isPending}
            className="
              rounded-lg
              p-2
              text-stone-500
              hover:bg-[#FAF6F0]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-[#4B3932]">Delete Team</h2>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#4B3932]">{team.name}</span>? This action cannot be
            undone.
          </p>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleteTeamMutation.isPending}
            className="
              rounded-xl
              border
              border-[#E7DDD3]
              px-5
              py-2.5
              text-sm
              font-medium
              text-[#4B3932]
              transition
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
            disabled={deleteTeamMutation.isPending}
            className="
              rounded-xl
              bg-red-500
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-600
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {deleteTeamMutation.isPending ? "Deleting..." : "Delete Team"}
          </button>
        </div>
      </div>
    </div>
  );
}
