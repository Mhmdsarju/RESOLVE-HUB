import { useQuery } from "@tanstack/react-query";

import { getSuperAdminDashboard } from "../api/organizationApi"; 
export function useSuperAdminDashboard() {
  return useQuery({
    queryKey: ["super-admin-dashboard"],
    queryFn: getSuperAdminDashboard,
  });
}