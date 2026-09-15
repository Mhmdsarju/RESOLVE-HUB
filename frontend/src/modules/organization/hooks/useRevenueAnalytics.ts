import { useQuery } from "@tanstack/react-query";

import { getRevenueAnalytics } from "../api/organizationApi";

export function useRevenueAnalytics() {
  return useQuery({
    queryKey: ["super-admin-revenue-analytics"],
    queryFn: getRevenueAnalytics,
  });
}