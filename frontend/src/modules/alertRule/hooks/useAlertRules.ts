import { useQuery } from "@tanstack/react-query";

import { getAlertRules } from "../api/alertRuleApi";

import type { GetAlertRulesParams, GetAlertRulesResponse, UseAlertRulesParams } from "../types/alertRule.types";

export function useAlertRules({ projectId, page = 1, limit = 100, }: UseAlertRulesParams) {
    const params: GetAlertRulesParams = { page, limit, };

    return useQuery<GetAlertRulesResponse>({
        queryKey: ["alert-rules", projectId, page, limit],
        queryFn: () => getAlertRules(projectId, params),
        enabled: Boolean(projectId),
    });
}