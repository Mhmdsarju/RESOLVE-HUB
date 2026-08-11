import { AlertRoutingCondition } from "../../domain/entities/alertRoutingRule.entity";

export interface CreateAlertRoutingRuleDto {
  name: string;
  monitoringProjectId: string;
  teamId: string;
  conditions: AlertRoutingCondition;
  priority?: number;
}