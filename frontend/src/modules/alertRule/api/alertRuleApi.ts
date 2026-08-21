import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type {
    AlertRule,
    ApplyDefaultAlertRuleDto,
    CreateAlertRuleDto,
    GetAlertRulesParams,
    GetAlertRulesResponse,
    UpdateAlertRuleDto,
} from "../types/alertRule.types";

export async function createAlertRule(projectId: string, data: CreateAlertRuleDto,): Promise<AlertRule> {
    const response = await api.post<ApiResponse<AlertRule>>(
        ENDPOINTS.MONITORING.ALERT_RULES.BY_PROJECT(projectId),
        data,
    );

    return response.data.data;
}

export async function getAlertRules(projectId: string, params: GetAlertRulesParams,): Promise<GetAlertRulesResponse> {
    const response = await api.get<ApiResponse<GetAlertRulesResponse>>(
        ENDPOINTS.MONITORING.ALERT_RULES.BY_PROJECT(projectId),
        {
            params,
        },
    );

    return response.data.data;
}

export async function getAlertRuleById(id: string,): Promise<AlertRule> {
    const response = await api.get<ApiResponse<AlertRule>>(
        ENDPOINTS.MONITORING.ALERT_RULES.BY_ID(id),
    );

    return response.data.data;
}

export async function updateAlertRule(id: string, data: UpdateAlertRuleDto,): Promise<AlertRule> {
    const response = await api.put<ApiResponse<AlertRule>>(
        ENDPOINTS.MONITORING.ALERT_RULES.BY_ID(id),
        data,
    );

    return response.data.data;
}

export async function deleteAlertRule(id: string,): Promise<null> {
    const response = await api.delete<ApiResponse<null>>(
        ENDPOINTS.MONITORING.ALERT_RULES.BY_ID(id),
    );

    return response.data.data;
}

export async function getDefaultAlertRules(): Promise<AlertRule[]> {
    const response = await api.get<ApiResponse<AlertRule[]>>(
        ENDPOINTS.MONITORING.ALERT_RULES.DEFAULTS,
    );

    return response.data.data;
}

export async function applyDefaultAlertRule(projectId: string, data: ApplyDefaultAlertRuleDto,): Promise<AlertRule> {
    const response = await api.post<ApiResponse<AlertRule>>(
        ENDPOINTS.MONITORING.ALERT_RULES.APPLY_DEFAULT(projectId),
        data,
    );

    return response.data.data;
}