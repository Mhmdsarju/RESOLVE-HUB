import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { addTeamMember } from "../api/teamMemberApi";

import type { TeamMember } from "../types/teamMember.types";


interface ErrorResponse {
    success: boolean;
    message: string;
}


interface AddTeamMemberVariables {
    teamId: string;
    data: {
        userId: string;
        role: "MEMBER" | "LEAD";
    };
}


export function useAddTeamMember() {
    const queryClient = useQueryClient();

    return useMutation<TeamMember, AxiosError<ErrorResponse>, AddTeamMemberVariables>({
        mutationFn: ({ teamId, data }) => addTeamMember(teamId, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["team-members", variables.teamId,],
            });

            toast.success(
                "User added to team successfully",
            );
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to add user to team";
            toast.error(message);
        },
    });
}