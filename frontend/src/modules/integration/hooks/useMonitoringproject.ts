import { useQuery } from "@tanstack/react-query";

import { getMonitoringProjectById } from "@/modules/monitoring/api/monitoringProjectApi";

import type { MonitoringProject } from "@/modules/monitoring/types/monitoringProject.types";


export function useMonitoringProject(id: string) {
    return useQuery<MonitoringProject>({
        queryKey: ["monitoring-project", id],

        queryFn: () => getMonitoringProjectById(id),

        enabled: Boolean(id),
    });
}