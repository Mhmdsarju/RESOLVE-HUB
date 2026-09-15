import { Status } from "../../domain/enums/status.enum";
import { Priority } from "../../domain/enums/priority.enum";
import { Severity } from "../../domain/enums/severity.enum";

export interface GetIncidentsDto {
  page?: number;
  limit?: number;

  status?: Status;
  priority?: Priority;
  severity?: Severity;

  assignedTeamId?: string;
}