import {  Alert as PrismaAlert,
  AlertSource as PrismaAlertSource,
  AlertStatus as PrismaAlertStatus,
  Prisma,
} from "@prisma/client";

import { Alert } from "../../domain/entities/alert.entity";
import { AlertSource } from "../../domain/enums/alertSource.enum";
import { AlertStatus } from "../../domain/enums/alertStatus.enum";

export class AlertMapper {
  static fromDb(data: PrismaAlert): Alert {
    return new Alert({
      id: data.id,
      organizationId: data.organizationId,
      monitoringProjectId: data.monitoringProjectId,
      integrationId: data.integrationId ?? undefined,
      createdBy: data.createdBy ?? undefined,
      source: data.source as AlertSource,
      title: data.title,
      message: data.message ?? undefined,
      status: data.status as AlertStatus,
      payload: data.payload as Record<string, unknown>,
      incidentId: data.incidentId ?? undefined,
      createdAt: data.createdAt,
    });
  }

  static toDb(alert: Alert) {
    return {
      organizationId: alert.organizationId,
      monitoringProjectId: alert.monitoringProjectId,
      integrationId: alert.integrationId ?? null,
      createdBy: alert.createdBy ?? null,
      source: alert.source as PrismaAlertSource,
      title: alert.title,
      message: alert.message ?? null,
      status: alert.status as PrismaAlertStatus,
      payload: alert.payload as Prisma.InputJsonValue,
      incidentId: alert.incidentId ?? null,
      createdAt: alert.createdAt,
    };
  }
}