import type { PaginationMeta } from "@/core/types/pagination.types";

export type AlertSource =  | "MANUAL"  | "AUTOMATIC";

export type AlertStatus =  | "FIRING"  | "RESOLVED";

export interface Alert {
  id: string;
  organizationId: string;
  monitoringProjectId: string;
  integrationId?: string;
  createdBy?: string;
  source: AlertSource;
  title: string;
  message?: string;
  status: AlertStatus;
  payload: Record<string, unknown>;
  incidentId?: string;
  createdAt: string;
}

export interface CreateAlertDto {
  title: string;
  message?: string;
  status?: AlertStatus;
  payload: Record<string, unknown>;
  integrationId?: string;
  incidentId?: string;
}

export interface GetAlertsParams {
  page?: number;
  limit?: number;
}

export interface GetAlertsResponse {
  items: Alert[];
  pagination: PaginationMeta;
}

export interface AlertListProps {
  alerts: Alert[];
  isLoading: boolean;
  isError: boolean;
  onAlertClick: (alert: Alert) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface AlertCardProps {
  alert: Alert;
  onClick: (alert: Alert) => void;
}

export interface AlertPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CreateAlertModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateAlertVariables {
    projectId: string;
    data: CreateAlertDto;
}

export interface ResolveAlertVariables {
  id: string;
  projectId: string;
}