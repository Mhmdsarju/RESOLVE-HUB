import { useQuery } from "@tanstack/react-query";

import { getAlertById } from "../api/alertApi";

import type { Alert } from "../types/alert.types";


export function useAlert(id: string) {
  return useQuery<Alert>({
    queryKey: ["alert", id],

    queryFn: () => getAlertById(id),

    enabled: Boolean(id),
  });
}