import { AlertRoutingCondition } from "../../domain/entities/alertRoutingRule.entity";

export interface UpdateAlertRoutingRuleDto {
  name?: string;
  monitoringProjectId?: string;
  teamId?: string;
  conditions?: AlertRoutingCondition;
  priority?: number;
  isActive?: boolean;
}