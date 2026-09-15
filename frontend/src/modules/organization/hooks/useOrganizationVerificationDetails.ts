import { useQuery } from "@tanstack/react-query";

import {
  getOrganizationVerificationDetails,
} from "../api/organizationApi";

export function useOrganizationVerificationDetails(
  organizationId: string,
) {
  return useQuery({
    queryKey: [
      "organization",
      "verification",
      organizationId,
    ],
    queryFn: () =>
      getOrganizationVerificationDetails(
        organizationId,
      ),
    enabled: Boolean(organizationId),
  });
}