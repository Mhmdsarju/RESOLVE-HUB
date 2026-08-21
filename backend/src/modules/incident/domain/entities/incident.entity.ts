import { Severity } from "../enums/severity.enum";
import { Priority } from "../enums/priority.enum";
import { Status } from "../enums/status.enum";
import { IncidentType } from "../enums/incidentType.enum";

interface IncidentProps {
  id?: string;

  title: string;
  description?: string;

  severity: Severity;
  priority: Priority;
  status: Status;

  type: IncidentType;

  organizationId: string;
  createdBy?: string | null;

  assignedTeamId?: string | null;
  monitoringProjectId: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export class Incident {
  public readonly id?: string;

  public title: string;
  public description?: string;

  public severity: Severity;
  public priority: Priority;
  public status: Status;

  public type: IncidentType;

  public organizationId: string;
  public createdBy?: string | null;

  public assignedTeamId?: string | null;
  public monitoringProjectId: string;

  public readonly createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: IncidentProps) {
    this.id = props.id;

    this.title = props.title;
    this.description = props.description;

    this.severity = props.severity;
    this.priority = props.priority;
    this.status = props.status;

    this.type = props.type;

    this.organizationId = props.organizationId;
    this.createdBy = props.createdBy ?? null;

    this.assignedTeamId = props.assignedTeamId ?? null;
    this.monitoringProjectId = props.monitoringProjectId;

    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}