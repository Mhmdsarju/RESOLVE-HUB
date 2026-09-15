import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteTeam } from "../api/teamApi";
import axios from "axios";

export function useDeleteTeam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (teamId: string) => deleteTeam(teamId),

        onSuccess: (_, teamId) => {
            queryClient.removeQueries({ queryKey: ["team", teamId], });

            queryClient.invalidateQueries({ queryKey: ["teams"], });

            toast.success("Team deleted successfully");
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to delete team",);
                return;
            }

            toast.error("Failed to delete team");
        },
    });
}