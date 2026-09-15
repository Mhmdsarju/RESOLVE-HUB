import { IntegrationType } from "../../domain/enums/integrationType.enum";

export interface UpdateIntegrationDTO {
  name?: string;
  type?: IntegrationType;
  config?: Record<string, unknown>;
  isActive?: boolean;
}