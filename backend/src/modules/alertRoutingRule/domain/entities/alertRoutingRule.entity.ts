interface AlertRoutingRuleProps {
  id?: string;

  organizationId: string;
  monitoringProjectId: string;
  alertRuleId: string;
  teamId: string;
  createdBy: string;

  name: string;
  priority: number;
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export class AlertRoutingRule {
  public readonly id?: string;

  public organizationId: string;
  public monitoringProjectId: string;
  public alertRuleId: string;
  public teamId: string;
  public createdBy: string;

  public name: string;
  public priority: number;
  public isActive: boolean;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: AlertRoutingRuleProps) {
    this.id = props.id;

    this.organizationId = props.organizationId;
    this.monitoringProjectId = props.monitoringProjectId;
    this.alertRuleId = props.alertRuleId;
    this.teamId = props.teamId;
    this.createdBy = props.createdBy;

    this.name = props.name;
    this.priority = props.priority;
    this.isActive = props.isActive;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}