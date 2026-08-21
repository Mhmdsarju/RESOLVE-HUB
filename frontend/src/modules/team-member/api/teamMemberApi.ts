import { api } from "@/core/api/axios";

import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type { TeamMember, GetTeamMembersParams, GetTeamMembersResponse, UpdateTeamMemberRoleDto, } from "../types/teamMember.types";
import type { TeamRole } from "../types/teamMember.types";

export async function getTeamMembers(teamId: string, params?: GetTeamMembersParams,): Promise<GetTeamMembersResponse> {
  const response = await api.get<ApiResponse<GetTeamMembersResponse>>(
    ENDPOINTS.TEAM.MEMBERS(teamId),
    {
      params,
    },
  );

  return response.data.data;
}


export async function updateTeamMemberRole(teamId: string, memberId: string, data: UpdateTeamMemberRoleDto,): Promise<TeamMember> {
  const response = await api.patch<ApiResponse<TeamMember>>(
    `${ENDPOINTS.TEAM.BASE}/${teamId}/members/${memberId}`,
    data,
  );

  return response.data.data;
}


export async function removeTeamMember(teamId: string, memberId: string,): Promise<void> {
  await api.delete<ApiResponse<null>>(
    `${ENDPOINTS.TEAM.BASE}/${teamId}/members/${memberId}`,
  );
}

export async function addTeamMember(teamId: string, data: { userId: string; role: TeamRole },): Promise<TeamMember> {
  const response = await api.post<ApiResponse<TeamMember>>(
    `${ENDPOINTS.TEAM.BASE}/${teamId}/members`,
    data,
  );

  return response.data.data;
}