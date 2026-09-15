import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { Integration } from "../../domain/entities/integration.entity";
import { IIntegrationRepository } from "../../domain/interfaces/IIntegrationRepository";
import { ICreateIntegrationUseCase } from "../../domain/interfaces/use-cases/ICreateIntegrationUseCase";
import { CreateIntegrationDTO } from "../dto/createIntegrationDto";

export class CreateIntegrationUseCase implements ICreateIntegrationUseCase {
    constructor(
        private readonly integrationRepository: IIntegrationRepository
    ) { }

    async execute(dto: CreateIntegrationDTO): Promise<Integration> {

        const existingIntegration = await this.integrationRepository.findByProjectAndName(
            dto.monitoringProjectId,
            dto.organizationId,
            dto.name
        );

        if (existingIntegration) {
            throw new AppError("Integration already exists", HttpStatusCode.CONFLICT);
        }

        const integration = new Integration(
            crypto.randomUUID(),
            dto.monitoringProjectId,
            dto.organizationId,
            dto.name,
            dto.type,
            dto.config,
            true,
            new Date()
        );

        return await this.integrationRepository.create(integration);
    }
}