import { useQuery } from "@tanstack/react-query";

import { getDefaultAlertRules } from "../api/alertRuleApi";

import type { AlertRule } from "../types/alertRule.types";

export function useAlertRuleDefaults() {
  return useQuery<AlertRule[]>({
    queryKey: ["alert-rule-defaults"],
    queryFn: getDefaultAlertRules,
  });
}