import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { removeTeamMember } from "../api/teamMemberApi";


interface ErrorResponse {
  success: boolean;
  message: string;
}


interface RemoveTeamMemberVariables {
  teamId: string;
  memberId: string;
}


export function useRemoveTeamMember() {
  const queryClient = useQueryClient();


  return useMutation<void, AxiosError<ErrorResponse>, RemoveTeamMemberVariables>({
    mutationFn: ({ teamId, memberId, }) => removeTeamMember(teamId, memberId,),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["team-members", variables.teamId,],
      });

      toast.success(
        "Team member removed successfully",
      );
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to remove team member";

      toast.error(message);
    },
  });
}