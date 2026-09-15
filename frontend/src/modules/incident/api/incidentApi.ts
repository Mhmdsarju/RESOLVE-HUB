import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";
import type { ApiResponse } from "@/core/types/api.types";

import type { Incident, CreateIncidentDto, GetIncidentsParams, GetIncidentsResponse, UpdateIncidentStatusDto, AssignIncidentTeamDto, IncidentStats, } from "../types/incident.types";


export async function createIncident(data: CreateIncidentDto,): Promise<Incident> {
    const response = await api.post<ApiResponse<Incident>>(
        ENDPOINTS.INCIDENT.BASE,
        data,
    );

    return response.data.data;
}


export async function getIncidents(params?: GetIncidentsParams,): Promise<GetIncidentsResponse> {
    const response = await api.get<ApiResponse<GetIncidentsResponse>>(
        ENDPOINTS.INCIDENT.BASE,
        {
            params,
        },
    );

    return response.data.data;
}


export async function getIncidentById(id: string,): Promise<Incident> {
    const response = await api.get<ApiResponse<Incident>>(
        ENDPOINTS.INCIDENT.BY_ID(id),
    );

    return response.data.data;
}


export async function getIncidentStats(): Promise<IncidentStats> {
  const response = await api.get<ApiResponse<IncidentStats>>(
    ENDPOINTS.INCIDENT.STATS,
  );

  return response.data.data;
}


export async function updateIncidentStatus(id: string, data: UpdateIncidentStatusDto,): Promise<Incident> {
    const response = await api.patch<ApiResponse<Incident>>(
        ENDPOINTS.INCIDENT.STATUS(id),
        data,
    );

    return response.data.data;
}


export async function assignIncidentTeam(id: string, data: AssignIncidentTeamDto,): Promise<Incident> {
    const response = await api.patch<ApiResponse<Incident>>(
        ENDPOINTS.INCIDENT.ASSIGN(id),
        data,
    );

    return response.data.data;
}

