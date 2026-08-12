import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type { Team, CreateTeamDto, UpdateTeamDto, GetTeamsParams, } from "../types/team.types";
import type { PaginationMeta } from "@/core/types/pagination.types";

export async function getTeams(params?: GetTeamsParams,) {
    const response = await api.get<ApiResponse<{ items: Team[]; pagination: PaginationMeta; }>>(
        ENDPOINTS.TEAM.BASE, { params, }
    );

    return response.data.data;
}

export async function getTeam(teamId: string,) {
    const response = await api.get<ApiResponse<Team>>(`${ENDPOINTS.TEAM.BASE}/${teamId}`,);
    return response.data.data;
}

export async function createTeam(dto: CreateTeamDto,) {
    const response = await api.post<ApiResponse<Team>>(ENDPOINTS.TEAM.BASE, dto,);
    return response.data.data;
}

export async function updateTeam(teamId: string, dto: UpdateTeamDto,) {
    const response = await api.put<ApiResponse<Team>>(`${ENDPOINTS.TEAM.BASE}/${teamId}`, dto,);
    return response.data.data;
}

export async function deleteTeam(teamId: string,) {
    const response = await api.delete<ApiResponse<null>>(`${ENDPOINTS.TEAM.BASE}/${teamId}`,);
    return response.data;
}