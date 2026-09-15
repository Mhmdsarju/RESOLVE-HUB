import { useQuery } from "@tanstack/react-query";
import { getIncidents } from "../api/incidentApi";

import type { GetIncidentsParams, GetIncidentsResponse } from "../types/incident.types";

export function useIncidents(params?: GetIncidentsParams) {
    return useQuery<GetIncidentsResponse>({
        queryKey: ["incidents", params],
        queryFn: () => getIncidents(params),
    })
}