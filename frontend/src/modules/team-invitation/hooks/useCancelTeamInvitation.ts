import { useMutation, useQueryClient, } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import axios from "axios";

import { cancelTeamInvitation } from "../api/teamInvitationApi";

interface CancelInvitationVariables {
    invitationId: string;
    teamId: string;
}

export function useCancelTeamInvitation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ invitationId, }: CancelInvitationVariables) => cancelTeamInvitation(invitationId),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["team-invitations", variables.teamId,],
            });

            toast.success("Invitation cancelled successfully",);
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message ?? "Failed to cancel invitation",);
                return;
            }
            toast.error("Failed to cancel invitation",);
        },
    });
}