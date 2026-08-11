export interface GetAlertRulesDTO {
  organizationId: string;
  monitoringProjectId: string;
  page: number;
  limit: number;
}