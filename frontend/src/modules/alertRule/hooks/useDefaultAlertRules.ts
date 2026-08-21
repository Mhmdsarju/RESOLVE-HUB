import { useQuery } from "@tanstack/react-query";

import { getDefaultAlertRules } from "../api/alertRuleApi";

import type { AlertRule } from "../types/alertRule.types";

export function useDefaultAlertRules() {
  return useQuery<AlertRule[]>({
    queryKey: ["alert-rules", "defaults"],
    queryFn: getDefaultAlertRules,
  });
}