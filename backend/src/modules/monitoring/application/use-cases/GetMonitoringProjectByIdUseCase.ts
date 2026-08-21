import { IMonitoringProjectRepository } from "../../domain/interfaces/IMonitoringProjectRepository";
import { IGetMonitoringProjectByIdUseCase } from "../../domain/interfaces/use-cases/IGetMonitoringProjectByIdUseCase";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class GetMonitoringProjectByIdUseCase implements IGetMonitoringProjectByIdUseCase {
    constructor(
        private repo: IMonitoringProjectRepository
    ) { }

    async execute(id: string, organizationId: string) {

        const project = await this.repo.findById(id);

        if (!project) {
            throw new AppError("Project Not Found", HttpStatusCode.NOT_FOUND);
        }


        if (project.organizationId !== organizationId) {
            throw new AppError("Access denied", HttpStatusCode.FORBIDDEN);
        }

        return project;
    }
}