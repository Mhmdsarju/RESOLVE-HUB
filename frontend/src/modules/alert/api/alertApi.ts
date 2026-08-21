import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type { Alert, CreateAlertDto, GetAlertsParams, GetAlertsResponse, } from "../types/alert.types";


export async function createAlert(projectId: string, data: CreateAlertDto,): Promise<Alert> {
  const response = await api.post<ApiResponse<Alert>>(
    ENDPOINTS.ALERT.BY_PROJECT(projectId),
    data,
  );

  return response.data.data;
}


export async function getAlerts(projectId: string, params: GetAlertsParams,): Promise<GetAlertsResponse> {
  const response = await api.get<ApiResponse<GetAlertsResponse>>(
    ENDPOINTS.ALERT.BY_PROJECT(projectId),
    {
      params,
    },
  );

  return response.data.data;
}


export async function getAlertById(id: string,): Promise<Alert> {
  const response = await api.get<ApiResponse<Alert>>(
    ENDPOINTS.ALERT.BY_ID(id),
  );

  return response.data.data;
}


export async function resolveAlert(id: string,): Promise<Alert> {
  const response = await api.patch<ApiResponse<Alert>>(
    ENDPOINTS.ALERT.RESOLVE(id),
  );

  return response.data.data;
}