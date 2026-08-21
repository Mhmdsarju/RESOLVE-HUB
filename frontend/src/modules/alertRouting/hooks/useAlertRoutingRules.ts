import { useQuery } from "@tanstack/react-query";

import { getAlertRoutingRules } from "../api/alertRoutingRuleApi";

import type { AlertRoutingRule } from "../types/alertRoutingRule.types";

export function useAlertRoutingRules() {
  return useQuery<AlertRoutingRule[]>({
    queryKey: ["alert-routing-rules"],
    queryFn: getAlertRoutingRules,
  });
}