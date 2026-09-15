import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateTeamMemberRole } from "../api/teamMemberApi";

import type { TeamMember, UpdateTeamMemberRoleDto, } from "../types/teamMember.types";


interface ErrorResponse {
  success: boolean;
  message: string;
}


interface UpdateTeamMemberRoleVariables {
  teamId: string;
  memberId: string;
  data: UpdateTeamMemberRoleDto;
}


export function useUpdateTeamMemberRole() {
  const queryClient = useQueryClient();

  return useMutation<TeamMember, AxiosError<ErrorResponse>, UpdateTeamMemberRoleVariables>({
    mutationFn: ({ teamId, memberId, data, }) => updateTeamMemberRole(
      teamId,
      memberId,
      data,
    ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["team-members", variables.teamId,],
      });

      toast.success(
        "Team member role updated successfully",
      );
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to update team member role";
      toast.error(message);
    },
  });
}