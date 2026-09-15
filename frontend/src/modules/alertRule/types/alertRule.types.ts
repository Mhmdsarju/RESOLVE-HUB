import type { PaginationMeta } from "@/core/types/pagination.types";

import type {    IncidentPriority,    IncidentSeverity,} from "@/modules/incident/types/incident.types";

export type AlertOperator =    | "GT"    | "LT"    | "GTE"    | "LTE"    | "EQ";

export interface AlertRule {
    id: string;
    monitoringProjectId: string;
    organizationId: string;
    name: string;
    metric: string;
    operator: AlertOperator;
    threshold: number;
    severity: IncidentSeverity;
    priority: IncidentPriority;
    autoCreateIncident: boolean;
    isPredefined: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateAlertRuleDto {
    name: string;
    metric: string;
    operator: AlertOperator;
    threshold: number;
    severity: IncidentSeverity;
    priority: IncidentPriority;
    autoCreateIncident: boolean;
}

export interface UpdateAlertRuleDto {
    name?: string;
    metric?: string;
    operator?: AlertOperator;
    threshold?: number;
    severity?: IncidentSeverity;
    priority?: IncidentPriority;
    autoCreateIncident?: boolean;
    isActive?: boolean;
}

export interface GetAlertRulesParams {
    page?: number;
    limit?: number;
}

export interface GetAlertRulesResponse {
    items: AlertRule[];
    pagination: PaginationMeta;
}

export interface ApplyDefaultAlertRuleDto {
    defaultRuleName: string;
}

export interface AlertRuleCardProps {
  rule: AlertRule;
  onClick: (rule: AlertRule) => void;
  onEdit: (rule: AlertRule) => void;
  onDelete: (rule: AlertRule) => void;
}


export interface AlertRuleListProps {
  rules: AlertRule[];
  isLoading: boolean;
  isError: boolean;
  onRuleClick: (rule: AlertRule) => void;
  onRuleEdit: (rule: AlertRule) => void;
  onRuleDelete: (rule: AlertRule) => void;
}

export interface CreateAlertRuleModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface DefaultAlertRulesModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteAlertRuleModalProps {
  rule: AlertRule | null;
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export interface EditAlertRuleModalProps {
  rule: AlertRule | null;
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface UseAlertRulesParams {
    projectId: string;
    page?: number;
    limit?: number;
}

export interface ApplyDefaultAlertRuleVariables {
  projectId: string;
  data: ApplyDefaultAlertRuleDto;
}

export interface CreateAlertRuleVariables {
  projectId: string;
  data: CreateAlertRuleDto;
}

export interface DeleteAlertRuleVariables {
  id: string;
  projectId: string;
}

export interface UpdateAlertRuleVariables {
  id: string;
  projectId: string;
  data: UpdateAlertRuleDto;
}