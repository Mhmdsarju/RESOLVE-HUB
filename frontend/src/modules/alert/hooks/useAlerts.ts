import { useQuery } from "@tanstack/react-query";

import { getAlerts } from "../api/alertApi";

import type { GetAlertsParams, GetAlertsResponse, } from "../types/alert.types";

export function useAlerts(projectId: string, params: GetAlertsParams,) {
    return useQuery<GetAlertsResponse>({
        queryKey: ["alerts", projectId, params.page ?? 1, params.limit ?? 9,],

        queryFn: () => getAlerts(projectId, params),

        enabled: Boolean(projectId),

        refetchInterval: 3000,

        refetchIntervalInBackground: false,
    });
}