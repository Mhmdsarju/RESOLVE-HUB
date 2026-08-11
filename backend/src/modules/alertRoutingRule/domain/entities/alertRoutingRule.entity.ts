export interface AlertRoutingCondition {
  all?: AlertRoutingCondition[];
  any?: AlertRoutingCondition[];
  field?: string;
  operator?: string;
  value?: string | number | boolean;
}

interface AlertRoutingRuleProps {
  id?: string;
  organizationId: string;
  monitoringProjectId: string;
  teamId: string;
  createdBy: string;

  name: string;
  conditions: AlertRoutingCondition;
  priority: number;
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export class AlertRoutingRule {
  public readonly id?: string;

  public organizationId: string;
  public monitoringProjectId: string;
  public teamId: string;
  public createdBy: string;

  public name: string;
  public conditions: AlertRoutingCondition;
  public priority: number;
  public isActive: boolean;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: AlertRoutingRuleProps) {
    this.id = props.id;

    this.organizationId = props.organizationId;
    this.monitoringProjectId = props.monitoringProjectId;
    this.teamId = props.teamId;
    this.createdBy = props.createdBy;

    this.name = props.name;
    this.conditions = props.conditions;
    this.priority = props.priority;
    this.isActive = props.isActive;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}