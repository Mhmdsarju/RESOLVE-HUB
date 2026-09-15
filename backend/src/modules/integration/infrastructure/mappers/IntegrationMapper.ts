import { Integration as PrismaIntegration, Prisma } from "@prisma/client";

import { Integration } from "../../domain/entities/integration.entity";
import { IntegrationType } from "../../domain/enums/integrationType.enum";

export class IntegrationMapper {

  static fromDb(data: PrismaIntegration): Integration {
    return new Integration(
      data.id,
      data.monitoringProjectId,
      data.organizationId,
      data.name,
      data.type as IntegrationType,
      data.config as Record<string, unknown>,
      data.isActive,
      data.createdAt
    );
  }

  static toDb(data: Integration): Prisma.IntegrationCreateInput {
    return {
      id: data.id,
      monitoringProject: {
        connect: {
          id: data.monitoringProjectId,
        },
      },
      organization: {
        connect: {
          id: data.organizationId,
        },
      },
      name: data.name,
      type: data.type,
      config: data.config as Prisma.InputJsonValue,
      isActive: data.isActive,
      createdAt: data.createdAt,
    };
  }
}