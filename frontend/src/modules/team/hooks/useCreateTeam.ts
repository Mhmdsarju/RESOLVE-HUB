import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createTeam } from "../api/teamApi";
import type { CreateTeamDto } from "../types/team.types";
import axios from "axios";

export function useCreateTeam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: CreateTeamDto) => createTeam(dto),

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["teams"], });

            toast.success(
                `Team "${data.name}" created successfully`,
            );
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to update team",);
                return;
            }
            toast.error("Failed to update team");
        },
    });
}