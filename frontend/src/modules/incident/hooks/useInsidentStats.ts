import { useQuery } from "@tanstack/react-query";
import { getIncidentStats } from "../api/incidentApi";

export function useIncidentStats() {
    return useQuery({
        queryKey: ["incident-stats"],
        queryFn: getIncidentStats
    })
} 