export interface AlertRoutingRule {
  id: string;

  organizationId: string;
  monitoringProjectId: string;
  alertRuleId: string;
  teamId: string;
  createdBy: string;

  name: string;
  priority: number;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface CreateAlertRoutingRuleDto {
  name: string;
  monitoringProjectId: string;
  alertRuleId: string;
  teamId: string;
  priority?: number;
}

export interface UpdateAlertRoutingRuleDto {
  name?: string;
  monitoringProjectId?: string;
  alertRuleId?: string;
  teamId?: string;
  priority?: number;
  isActive?: boolean;
}

export interface AlertRoutingRuleListProps {
  rules: AlertRoutingRule[];
  isLoading: boolean;
  isError: boolean;
  onRuleClick: (rule: AlertRoutingRule) => void;
  onRuleEdit: (rule: AlertRoutingRule) => void;
  onRuleDelete: (rule: AlertRoutingRule) => void;
}

export interface CreateAlertRoutingRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteAlertRoutingRuleModalProps {
  rule: AlertRoutingRule | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted?: () => void;
}

export interface EditAlertRoutingRuleModalProps {
  rule: AlertRoutingRule | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface UpdateAlertRoutingRuleVariables {
  id: string;
  data: UpdateAlertRoutingRuleDto;
}