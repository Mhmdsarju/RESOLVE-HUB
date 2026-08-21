import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type { TeamInvitation, CreateTeamInvitationDto, AcceptTeamInvitationDto, AcceptTeamInvitationResponse, } from "../types/teamInvitation.types";


export async function createTeamInvitation(teamId: string, data: CreateTeamInvitationDto,) {
  const response = await api.post<ApiResponse<TeamInvitation>>(
    ENDPOINTS.TEAM.INVITATIONS(teamId),
    data,
  );

  return response.data.data;
}


export async function getTeamInvitations(teamId: string,) {
  const response = await api.get<ApiResponse<TeamInvitation[]>>(
    ENDPOINTS.TEAM.INVITATIONS(teamId),
  );

  return response.data.data;
}


export async function cancelTeamInvitation(invitationId: string,) {
  const response = await api.delete<ApiResponse<null>>(
    ENDPOINTS.TEAM_INVITATION.CANCEL(invitationId),
  );

  return response.data.data;
}


export async function acceptTeamInvitation(token: string, data: AcceptTeamInvitationDto,) {
  const response = await api.post<
    ApiResponse<AcceptTeamInvitationResponse>
  >(
    ENDPOINTS.TEAM_INVITATION.ACCEPT(token),
    data,
  );

  return response.data.data;
}