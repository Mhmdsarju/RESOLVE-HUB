import { useQuery } from "@tanstack/react-query";

import { getOrganizationVerification } from "../api/organizationApi";

export function useOrganizationVerification() {
  return useQuery({
    queryKey: ["organization-verification"],
    queryFn: getOrganizationVerification,
  });
}