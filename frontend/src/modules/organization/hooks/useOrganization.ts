import { useQuery } from "@tanstack/react-query";

import { getOrganization } from "../api/organizationApi";

export function useOrganization() {
  return useQuery({
    queryKey: ["organization"],
    queryFn: getOrganization,
  });
}