import { useQuery } from "@tanstack/react-query";
import { getIncidentStats } from "../api/incidentApi";
import type { IncidentStats } from "../types/incident.types";

export function useIncidentStats() {
    return useQuery<IncidentStats>({
        queryKey: ["incident-stats"],
        queryFn: getIncidentStats,
    });
}