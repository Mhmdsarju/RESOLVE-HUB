import { useQuery } from "@tanstack/react-query";

import { getIncidentTimeline } from "../api/timeline.api";


export function useIncidentTimeline(incidentId: string) {
    return useQuery({
        queryKey: ["incident-timeline", incidentId],
        queryFn: () => getIncidentTimeline(incidentId),
        enabled: !!incidentId,
    });
}