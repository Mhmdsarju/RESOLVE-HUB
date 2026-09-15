import { useQuery } from "@tanstack/react-query";

import { getIntegrationById } from "../api/integrationApi";

import type { Integration } from "../types/integration.types";


export function useIntegration(id: string) {
    return useQuery<Integration>({
        queryKey: ["integration", id],

        queryFn: () => getIntegrationById(id),

        enabled: Boolean(id),
    });
}