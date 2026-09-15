import { useQuery } from "@tanstack/react-query";

import { getOrganizationDashboardStats } from "../api/organizationApi"; 
export function useOrganizationDashboardStats() {
  return useQuery({
    queryKey: ["organization-dashboard-stats"],
    queryFn: getOrganizationDashboardStats,
  });
}