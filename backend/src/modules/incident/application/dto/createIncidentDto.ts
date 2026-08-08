import { Severity } from "../../domain/enums/severity.enum";
import { Priority } from "../../domain/enums/priority.enum";
import { IncidentType } from "../../domain/enums/incidentType.enum";

export interface CreateIncidentDto {
  title: string;
  description?: string;

  severity: Severity;
  priority?: Priority;

  assignedTeamId?: string;

  type: IncidentType;
}