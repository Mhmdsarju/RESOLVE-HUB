import { useQuery } from "@tanstack/react-query";

import { getLatestAIIncidentAnalysis } from "../api/ai.api";


export function useLatestAIIncidentAnalysis(incidentId: string,) {

    return useQuery({
        queryKey: ["ai-incident-analysis", incidentId],
        queryFn: () => getLatestAIIncidentAnalysis(incidentId),
        enabled: Boolean(incidentId),
    });
}