import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type {    CreateIntegrationDto,    GetIntegrationsParams,    GetIntegrationsResponse,    Integration,    UpdateIntegrationDto,} from "../types/integration.types";


export async function createIntegration(    projectId: string,    data: CreateIntegrationDto,): Promise<Integration> {
    const response = await api.post<ApiResponse<Integration>>(
        ENDPOINTS.MONITORING.INTEGRATIONS.BY_PROJECT(projectId),
        data,
    );

    return response.data.data;
}


export async function getIntegrations(    projectId: string,    params: GetIntegrationsParams,): Promise<GetIntegrationsResponse> {
    const response = await api.get<ApiResponse<GetIntegrationsResponse>>(
        ENDPOINTS.MONITORING.INTEGRATIONS.BY_PROJECT(projectId),
        {
            params,
        },
    );

    return response.data.data;
}


export async function getIntegrationById(    id: string,): Promise<Integration> {
    const response = await api.get<ApiResponse<Integration>>(
        ENDPOINTS.MONITORING.INTEGRATIONS.BY_ID(id),
    );

    return response.data.data;
}


export async function updateIntegration(    id: string,    data: UpdateIntegrationDto,): Promise<Integration> {
    const response = await api.put<ApiResponse<Integration>>(
        ENDPOINTS.MONITORING.INTEGRATIONS.BY_ID(id),
        data,
    );

    return response.data.data;
}


export async function deleteIntegration(    id: string,): Promise<null> {
    const response = await api.delete<ApiResponse<null>>(
        ENDPOINTS.MONITORING.INTEGRATIONS.BY_ID(id),
    );

    return response.data.data;
}