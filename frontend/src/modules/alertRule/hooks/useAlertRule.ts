import { useQuery } from "@tanstack/react-query";

import { getAlertRuleById } from "../api/alertRuleApi";

import type { AlertRule } from "../types/alertRule.types";

export function useAlertRule(id: string) {
  return useQuery<AlertRule>({
    queryKey: ["alert-rule", id],
    queryFn: () => getAlertRuleById(id),
    enabled: Boolean(id),
  });
}