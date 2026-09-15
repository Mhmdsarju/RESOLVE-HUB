import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { ApiResponse } from "@/core/types/api.types";

import type {    AlertRoutingRule,    CreateAlertRoutingRuleDto,    UpdateAlertRoutingRuleDto,} from "../types/alertRoutingRule.types";

export async function createAlertRoutingRule(    data: CreateAlertRoutingRuleDto,): Promise<AlertRoutingRule> {
    const response = await api.post<ApiResponse<AlertRoutingRule>>(
        ENDPOINTS.ALERT_ROUTING_RULE.BASE,
        data,
    );

    return response.data.data;
}

export async function getAlertRoutingRules(): Promise<AlertRoutingRule[]> {
    const response = await api.get<ApiResponse<AlertRoutingRule[]>>(
        ENDPOINTS.ALERT_ROUTING_RULE.BASE,
    );

    return response.data.data;
}

export async function getAlertRoutingRuleById(
    id: string,
): Promise<AlertRoutingRule> {
    const response = await api.get<ApiResponse<AlertRoutingRule>>(
        ENDPOINTS.ALERT_ROUTING_RULE.BY_ID(id),
    );

    return response.data.data;
}

export async function updateAlertRoutingRule(
    id: string,
    data: UpdateAlertRoutingRuleDto,
): Promise<AlertRoutingRule> {
    const response = await api.put<ApiResponse<AlertRoutingRule>>(
        ENDPOINTS.ALERT_ROUTING_RULE.BY_ID(id),
        data,
    );

    return response.data.data;
}

export async function deleteAlertRoutingRule(
    id: string,
): Promise<null> {
    const response = await api.delete<ApiResponse<null>>(
        ENDPOINTS.ALERT_ROUTING_RULE.BY_ID(id),
    );

    return response.data.data;
}