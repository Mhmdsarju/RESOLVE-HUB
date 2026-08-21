import { useQuery } from "@tanstack/react-query";

import { getAlertRoutingRuleById } from "../api/alertRoutingRuleApi";

import type { AlertRoutingRule } from "../types/alertRoutingRule.types";

export function useAlertRoutingRule(id: string) {
  return useQuery<AlertRoutingRule>({
    queryKey: ["alert-routing-rule", id],
    queryFn: () => getAlertRoutingRuleById(id),
    enabled: Boolean(id),
  });
}