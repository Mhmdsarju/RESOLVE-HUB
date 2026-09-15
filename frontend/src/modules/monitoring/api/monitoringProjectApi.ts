import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";
import type { ApiResponse } from "@/core/types/api.types";

import type {
    MonitoringProject, CreateMonitoringProjectDto,
    UpdateMonitoringProjectDto,
    GetMonitoringProjectsParams,
    GetMonitoringProjectsResponse,
} from "../types/monitoringProject.types";


export async function createMonitoringProject(    data: CreateMonitoringProjectDto,): Promise<MonitoringProject> {
    const response = await api.post<        ApiResponse<MonitoringProject>    >(
        ENDPOINTS.MONITORING_PROJECT.BASE,
        data,
    );
    return response.data.data;
}


export async function getMonitoringProjects(    params?: GetMonitoringProjectsParams,): Promise<GetMonitoringProjectsResponse> {
    const response = await api.get<        ApiResponse<GetMonitoringProjectsResponse>    >(
        ENDPOINTS.MONITORING_PROJECT.BASE,
        {
            params,
        },
    );

    return response.data.data;
}


export async function getMonitoringProjectById(    id: string,): Promise<MonitoringProject> {
    const response = await api.get<        ApiResponse<MonitoringProject>    >(
        ENDPOINTS.MONITORING_PROJECT.BY_ID(id),
    );

    return response.data.data;
}


export async function updateMonitoringProject(    id: string,    data: UpdateMonitoringProjectDto,): Promise<MonitoringProject> {
    const response = await api.put<        ApiResponse<MonitoringProject>    >(
        ENDPOINTS.MONITORING_PROJECT.BY_ID(id),
        data,
    );

    return response.data.data;
}


export async function deleteMonitoringProject(    id: string,): Promise<null> {
    const response = await api.delete<        ApiResponse<null>    >(
        ENDPOINTS.MONITORING_PROJECT.BY_ID(id),
    );

    return response.data.data;
}