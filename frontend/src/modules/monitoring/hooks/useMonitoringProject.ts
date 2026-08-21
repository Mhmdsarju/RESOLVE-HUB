import { useQuery } from "@tanstack/react-query";

import { getMonitoringProjectById } from "../api/monitoringProjectApi";

import type { MonitoringProject } from "../types/monitoringProject.types";


export function useMonitoringProject(id: string) {
  return useQuery<MonitoringProject>({
    queryKey: ["monitoring-project", id],
    queryFn: () => getMonitoringProjectById(id),
    enabled: Boolean(id),
  });
}