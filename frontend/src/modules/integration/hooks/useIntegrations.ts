import { useQuery } from "@tanstack/react-query";

import { getIntegrations } from "../api/integrationApi";

import type {
    GetIntegrationsResponse,
} from "../types/integration.types";


interface UseIntegrationsParams {
    projectId: string;
    page?: number;
    limit?: number;
}


export function useIntegrations({
    projectId,
    page = 1,
    limit = 10,
}: UseIntegrationsParams) {
    return useQuery<GetIntegrationsResponse>({
        queryKey: [
            "integrations",
            projectId,
            page,
            limit,
        ],

        queryFn: () =>
            getIntegrations(projectId, {
                page,
                limit,
            }),

        enabled: Boolean(projectId),
    });
}