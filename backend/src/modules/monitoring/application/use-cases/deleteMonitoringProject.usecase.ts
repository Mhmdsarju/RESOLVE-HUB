import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";

import { IMonitoringProjectRepository } from "../../domain/interfaces/IMonitoringProjectRepository";
import { IDeleteMonitoringProjectUseCase } from "../../domain/interfaces/use-cases/IDeleteMonitoringProjectUseCase";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class DeleteMonitoringProjectUseCase  implements IDeleteMonitoringProjectUseCase {

  constructor(
    @inject(TYPES.MonitoringProjectRepository)
    private repo: IMonitoringProjectRepository
  ) {}

  async execute(id: string, organizationId: string): Promise<void> {

    const project = await this.repo.findById(id);

    if (!project) {
      throw new AppError("Project not Found", HttpStatusCode.NOT_FOUND);
    }

    if (project.organizationId !== organizationId) {
      throw new AppError("Access denied", HttpStatusCode.FORBIDDEN);
    }

    await this.repo.delete(id);
  }
}