import { useQuery } from "@tanstack/react-query";
import { getOrganizationAnalytics } from "../api/organizationApi"; 

export function useOrganizationAnalytics() {
  return useQuery({
    queryKey: ["super-admin-organization-analytics"],
    queryFn: getOrganizationAnalytics,
  });
}