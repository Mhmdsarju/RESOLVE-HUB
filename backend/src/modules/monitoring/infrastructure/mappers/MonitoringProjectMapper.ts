import { MonitoringProject } from "../../domain/entities/monitoringProject.entity";
import { MonitoringProject as PrismaMonitoringProject } from "@prisma/client";

export class MonitoringProjectMapper {

  static fromDB(data: PrismaMonitoringProject): MonitoringProject {
    return new MonitoringProject(
      data.id,
      data.name,
      data.description,
      data.organizationId,
      data.createdBy,
      data.createdAt,
      data.updatedAt
    );
  }

  static toDB(entity: MonitoringProject) {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      organizationId: entity.organizationId,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}