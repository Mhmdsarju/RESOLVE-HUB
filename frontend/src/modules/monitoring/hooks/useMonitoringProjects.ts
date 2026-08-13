import { useQuery } from "@tanstack/react-query";

import { getMonitoringProjects } from "../api/monitoringProjectApi";

import type {
  GetMonitoringProjectsParams,
  GetMonitoringProjectsResponse,
} from "../types/monitoringProject.types";


export function useMonitoringProjects(
  params?: GetMonitoringProjectsParams,
) {
  return useQuery<GetMonitoringProjectsResponse>({
    queryKey: ["monitoring-projects", params],
    queryFn: () => getMonitoringProjects(params),
  });
}