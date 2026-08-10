import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Integration } from "../../domain/entities/integration.entity";
import { IIntegrationRepository } from "../../domain/interfaces/IIntegrationRepository";
import { IGetIntegrationByIdUseCase } from "../../domain/interfaces/use-cases/IGetIntegrationByIdUseCase";

@injectable()
export class GetIntegrationByIdUseCase implements IGetIntegrationByIdUseCase {
    constructor(
        @inject(TYPES.IntegrationRepository)
        private readonly integrationRepository: IIntegrationRepository
    ) { }

    async execute(id: string, organizationId: string): Promise<Integration> {
        const integration = await this.integrationRepository.findById(id);

        if (!integration || integration.organizationId !== organizationId
        ) {
            throw new AppError("Integration not found", HttpStatusCode.NOT_FOUND);
        }

        return integration;
    }
}