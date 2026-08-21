import { IntegrationType } from "../../domain/enums/integrationType.enum";

export interface CreateIntegrationDTO {
  monitoringProjectId: string;
  organizationId: string;
  name: string;
  type: IntegrationType;
  config: Record<string, unknown>;
}