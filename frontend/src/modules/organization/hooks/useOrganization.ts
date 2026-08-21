import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/modules/auth/store/authStore";

import { getOrganization } from "../api/organizationApi";

export function useOrganization() {
  const role = useAuthStore((state) => state.user?.role);

  return useQuery({
    queryKey: ["organization"],
    queryFn: getOrganization,
    enabled: role !== "SUPER_ADMIN",
  });
}