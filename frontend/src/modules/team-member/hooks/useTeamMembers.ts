import { useQuery } from "@tanstack/react-query";

import { getTeamMembers } from "../api/teamMemberApi";

import type {  GetTeamMembersParams, GetTeamMembersResponse,} from "../types/teamMember.types";


export function useTeamMembers(
  teamId: string,
  params: GetTeamMembersParams,
) {
  return useQuery<GetTeamMembersResponse>({
    queryKey: [
      "team-members",
      teamId,
      params.page,
      params.limit,
      params.search,
    ],

    queryFn: () => getTeamMembers(teamId, params),
    enabled: Boolean(teamId),
  });
}