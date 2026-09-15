import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateTeam } from "../api/teamApi";

import type { UpdateTeamDto, } from "../types/team.types";
import axios from "axios";

interface UpdateTeamVariables {
    teamId: string;
    data: UpdateTeamDto;
}

export function useUpdateTeam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ teamId, data, }: UpdateTeamVariables) => updateTeam(teamId, data),

        onSuccess: (updatedTeam) => {
            queryClient.setQueryData(["team", updatedTeam.id], updatedTeam,);

            queryClient.invalidateQueries({ queryKey: ["teams"], });

            toast.success(`Team "${updatedTeam.name}" updated successfully`,);
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to delete team");
                return;
            };
            toast.error("Failed to delete team")
        },

    });
}