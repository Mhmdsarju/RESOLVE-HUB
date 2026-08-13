export type IntegrationType =
  | "PROMETHEUS"
  | "GRAFANA"
  | "WEBHOOK";


export interface Integration {
  id: string;
  monitoringProjectId: string;
  organizationId: string;
  name: string;
  type: IntegrationType;
  config: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
}


export interface CreateIntegrationDto {
  name: string;
  type: IntegrationType;
  config: Record<string, unknown>;
}


export interface UpdateIntegrationDto {
  name?: string;
  type?: IntegrationType;
  config?: Record<string, unknown>;
  isActive?: boolean;
}


export interface GetIntegrationsParams {
  page?: number;
  limit?: number;
}


export interface GetIntegrationsResponse {
  data: Integration[];
  total: number;
  page: number;
  limit: number;
}