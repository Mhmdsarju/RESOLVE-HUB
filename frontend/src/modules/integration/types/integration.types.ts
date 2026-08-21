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

export interface CreateIntegrationModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteIntegrationModalProps {
  integration: Integration | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface EditIntegrationModalProps {
  integration: Integration | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface EditIntegrationFormProps {
  integration: Integration;
  onClose: () => void;
  isSubmitting: boolean;
  onUpdate: (data: UpdateIntegrationDto) => void;
}

export interface IntegrationCardProps {
  integration: Integration;
  onClick: (integration: Integration) => void;
  onEdit: (integration: Integration) => void;
  onDelete: (integration: Integration) => void;
}

export interface IntegrationListProps {
  integrations: Integration[];
  isLoading: boolean;
  isError: boolean;
  onIntegrationClick: (integration: Integration) => void;
  onIntegrationEdit: (integration: Integration) => void;
  onIntegrationDelete: (integration: Integration) => void;
}

export interface UpdateIntegrationVariables {
    id: string;
    data: UpdateIntegrationDto;
}