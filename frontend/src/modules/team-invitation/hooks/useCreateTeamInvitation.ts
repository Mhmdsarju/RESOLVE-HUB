import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { createTeamInvitation } from "../api/teamInvitationApi";
import type { CreateTeamInvitationDto, } from "../types/teamInvitation.types";

interface CreateInvitationVariables {
    teamId: string;
    data: CreateTeamInvitationDto;
}

export function useCreateTeamInvitation() {
    const queryClient = useQueryClient();

    return useMutation({
        
        mutationFn: ({ teamId, data, }: CreateInvitationVariables) => createTeamInvitation(teamId, data),

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["team-invitations", variables.teamId,],
            });

            toast.success("Invitation sent successfully",);
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to send invitation",);
                return;
            }
            toast.error("Failed to send invitation",);
        },
    });
}