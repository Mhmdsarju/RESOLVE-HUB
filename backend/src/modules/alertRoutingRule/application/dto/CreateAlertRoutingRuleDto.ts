export interface CreateAlertRoutingRuleDto {
  name: string;
  monitoringProjectId: string;
  alertRuleId: string;
  teamId: string;
  priority?: number;
}