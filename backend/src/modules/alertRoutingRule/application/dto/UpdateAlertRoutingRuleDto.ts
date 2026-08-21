export interface UpdateAlertRoutingRuleDto {
  name?: string;
  monitoringProjectId?: string;
  alertRuleId?: string;
  teamId?: string;
  priority?: number;
  isActive?: boolean;
}