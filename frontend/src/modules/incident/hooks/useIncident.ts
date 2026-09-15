import { useQuery } from "@tanstack/react-query";

import { getIncidentById } from "../api/incidentApi";

import type { Incident } from "../types/incident.types";

export function useIncident(id: string) {
    return useQuery<Incident>({
        queryKey: ["incident", id],
        queryFn: () => getIncidentById(id),
        enabled: Boolean(id)
    })
}