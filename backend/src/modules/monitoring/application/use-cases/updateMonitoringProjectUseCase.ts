import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";

import { IMonitoringProjectRepository } from "../../domain/interfaces/IMonitoringProjectRepository";
import { IUpdateMonitoringProjectUseCase } from "../../domain/interfaces/use-cases/IUpdateMonitoringProjectUseCase";
import { UpdateMonitoringProjectDTO } from "../dto/updateMonitoringProject.dto";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class UpdateMonitoringProjectUseCase  implements IUpdateMonitoringProjectUseCase {

  constructor(
    @inject(TYPES.MonitoringProjectRepository)
    private repo: IMonitoringProjectRepository
  ) {}

  async execute(id: string, organizationId: string, dto: UpdateMonitoringProjectDTO) {

    const project = await this.repo.findById(id);

    if (!project) {
      throw new AppError("Project Not Found", HttpStatusCode.NOT_FOUND);
    }

    if (project.organizationId !== organizationId) {
      throw new AppError("Access denied", HttpStatusCode.FORBIDDEN);
    }

    const updated = await this.repo.update(id, dto);

    return updated;
  }
}