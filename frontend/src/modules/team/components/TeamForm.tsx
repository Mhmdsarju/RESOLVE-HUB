import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Team, CreateTeamDto } from "../types/team.types";

import { teamSchema, type TeamFormData } from "../validations/team.schema";

interface TeamFormProps {
  team?: Team;
  isLoading: boolean;
  onSubmit: (data: CreateTeamDto) => void;
  onCancel: () => void;
}

export default function TeamForm({ team, isLoading, onSubmit, onCancel }: TeamFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: team?.name ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: team?.name ?? "",
    });
  }, [team, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="team-name" className="mb-2 block text-sm font-medium text-[#4B3932]">
          Team Name
        </label>

        <input
          id="team-name"
          type="text"
          placeholder="Enter team name"
          {...register("name")}
          className="
            w-full
            rounded-xl
            border
            border-[#E7DDD3]
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-[#4B3932]
            focus:ring-2
            focus:ring-[#4B3932]/10
          "
        />

        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
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
            disabled:opacity-60
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="
            rounded-xl
            bg-[#4B3932]
            px-5
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#3B2E29]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isLoading ? "Saving..." : team ? "Update Team" : "Create Team"}
        </button>
      </div>
    </form>
  );
}
