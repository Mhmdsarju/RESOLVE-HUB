import { useQuery } from "@tanstack/react-query";

import {
  getPendingOrganizationVerifications,
} from "../api/organizationApi";

export function usePendingOrganizationVerifications() {
  return useQuery({
    queryKey: ["organization", "pending-verifications"],
    queryFn: getPendingOrganizationVerifications,

    refetchInterval: 10000,
    refetchIntervalInBackground: true,
  });
}