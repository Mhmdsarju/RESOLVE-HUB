import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Integration } from "../../domain/entities/integration.entity";
import { IIntegrationRepository } from "../../domain/interfaces/IIntegrationRepository";
import { IUpdateIntegrationUseCase } from "../../domain/interfaces/use-cases/IUpdateIntegrationUseCase";
import { UpdateIntegrationDTO } from "../dto/updateIntegrationDto";

export class UpdateIntegrationUseCase implements IUpdateIntegrationUseCase {
    constructor(
        private readonly integrationRepository: IIntegrationRepository
    ) { }

    async execute(id: string, organizationId: string, dto: UpdateIntegrationDTO): Promise<Integration> {
        const integration = await this.integrationRepository.findById(id);

        if (!integration || integration.organizationId !== organizationId) {
            throw new AppError("Integration not found", HttpStatusCode.NOT_FOUND);
        }

        return await this.integrationRepository.update(id, dto);
    }
}