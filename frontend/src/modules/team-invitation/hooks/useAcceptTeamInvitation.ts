import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { acceptTeamInvitation } from "@/modules/team-invitation/api/teamInvitationApi";
import { useAuthStore } from "@/modules/auth/store/authStore";

import type { AcceptTeamInvitationDto, AcceptTeamInvitationResponse, } from "@/modules/team-invitation/types/teamInvitation.types";


interface ErrorResponse {
  success: boolean;
  message: string;
}


export function useAcceptTeamInvitation() {
  const queryClient = useQueryClient();

  const setUser = useAuthStore(
    (state) => state.setUser,
  );

  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken,
  );


  return useMutation<AcceptTeamInvitationResponse, AxiosError<ErrorResponse>, { token: string; data: AcceptTeamInvitationDto; }>({
    mutationFn: ({ token, data }) =>
      acceptTeamInvitation(token, data),

    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);

      queryClient.invalidateQueries({
        queryKey: ["team-invitations"],
      });

      toast.success("Account created successfully");
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to accept invitation";
      toast.error(message);
    },
  });
}