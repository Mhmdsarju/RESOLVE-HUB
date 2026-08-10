import { inject, injectable } from "inversify";
import { IMonitoringProjectRepository } from "../../domain/interfaces/IMonitoringProjectRepository";
import { MonitoringProject } from "../../domain/entities/monitoringProject.entity";
import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { CreateMonitoringProjectDTO } from "../dto/createMonitoringProjectDto";

@injectable()
export class CreateMonitoringProjectUseCase {
    constructor(
        @inject(TYPES.MonitoringProjectRepository)
        private monitoringRepo: IMonitoringProjectRepository
    ) { }

    async execute(dto: CreateMonitoringProjectDTO) {
        const { name, description, organizationId, createdBy } = dto;

        const existing = await this.monitoringRepo.findByName(
            name,
            organizationId
        );

        if (existing) {
            throw new AppError("Monitoring project with this name already exists", HttpStatusCode.CONFLICT);
        }
        const project = new MonitoringProject(
            crypto.randomUUID(),
            name,
            description || null,
            organizationId,
            createdBy,
            new Date(),
            new Date()
        );

        return await this.monitoringRepo.create(project);
    }
}