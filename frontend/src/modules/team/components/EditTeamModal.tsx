import { X } from "lucide-react";

import TeamForm from "./TeamForm";

import { useUpdateTeam } from "../hooks/useUpdateTeam";

import type { Team, UpdateTeamDto } from "../types/team.types";

interface EditTeamModalProps {
  team: Team;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditTeamModal({ team, isOpen, onClose }: EditTeamModalProps) {
  const updateTeamMutation = useUpdateTeam();

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (data: UpdateTeamDto) => {
    await updateTeamMutation.mutateAsync({
      teamId: team.id,
      data,
    });

    onClose();
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
          max-w-lg
          rounded-2xl
          bg-white
          p-8
          shadow-2xl
        "
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4B3932]">Edit Team</h2>

            <p className="mt-1 text-sm text-stone-500">Update your team details.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updateTeamMutation.isPending}
            className="
              rounded-lg
              p-2
              text-stone-500
              transition
              hover:bg-[#FAF6F0]
              hover:text-[#4B3932]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>
        </div>

        <TeamForm
          team={team}
          isLoading={updateTeamMutation.isPending}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
