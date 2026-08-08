import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Incident } from "../entities/incident.entity";

import { Status } from "../enums/status.enum";
import { Priority } from "../enums/priority.enum";
import { Severity } from "../enums/severity.enum";

export interface IIncidentRepository extends IBaseRepository<Incident> {

  findAllWithPagination(params: {
    organizationId: string;
    skip: number;
    take: number;
    filters?: {
      status?: Status;
      priority?: Priority;
      severity?: Severity;
      assignedTeamId?: string;
    };
  }): Promise<{
    data: Incident[];
    total: number;
  }>;

}