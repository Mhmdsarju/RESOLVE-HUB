import { Incident } from "../../domain/entities/incident.entity";

import {
  Incident as PrismaIncident,
  IncidentSeverity as PrismaSeverity,
  IncidentPriority as PrismaPriority,
  IncidentStatus as PrismaStatus,
  IncidentType as PrismaType,
} from "@prisma/client";

import { IncidentType } from "../../domain/enums/incidentType.enum";
import { Priority } from "../../domain/enums/priority.enum";
import { Severity } from "../../domain/enums/severity.enum";
import { Status } from "../../domain/enums/status.enum";

export class IncidentMapper {
  static toDb(incident: Incident) {
    return {
      title: incident.title,
      description: incident.description,

      severity: incident.severity as PrismaSeverity,
      priority: incident.priority as PrismaPriority,
      status: incident.status as PrismaStatus,
      type: incident.type as PrismaType,

      organization: {
        connect: {
          id: incident.organizationId,
        },
      },

      creator: incident.createdBy
        ? {
          connect: {
            id: incident.createdBy,
          },
        }
        : undefined,

      assignedTeam: incident.assignedTeamId
        ? {
          connect: {
            id: incident.assignedTeamId,
          },
        }
        : undefined,

      monitoringProject: incident.monitoringProjectId
        ? {
          connect: {
            id: incident.monitoringProjectId,
          },
        }
        : undefined,
    };
  }
  static fromDb(data: PrismaIncident): Incident {
    return new Incident({
      id: data.id,
      title: data.title,
      description: data.description ?? undefined,

      severity: data.severity as Severity,
      priority: data.priority as Priority,
      status: data.status as Status,
      type: data.type as IncidentType,

      organizationId: data.organizationId,
      createdBy: data.createdBy ?? undefined,
      assignedTeamId: data.assignedTeamId ?? undefined,

      monitoringProjectId: data.monitoringProjectId,

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}