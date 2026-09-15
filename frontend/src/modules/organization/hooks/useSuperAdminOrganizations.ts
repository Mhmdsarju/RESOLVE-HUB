import { useQuery } from "@tanstack/react-query";
import { getSuperAdminOrganizations } from "../api/organizationApi"; 

export function useSuperAdminOrganizations(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ["super-admin-organizations", params],
    queryFn: () => getSuperAdminOrganizations(params),
  });
}