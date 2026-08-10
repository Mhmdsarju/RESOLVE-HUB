import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IIntegrationRepository } from "../../domain/interfaces/IIntegrationRepository";
import { IDeleteIntegrationUseCase } from "../../domain/interfaces/use-cases/IDeleteIntegrationUseCase";

@injectable()
export class DeleteIntegrationUseCase implements IDeleteIntegrationUseCase {
    constructor(
        @inject(TYPES.IntegrationRepository)
        private readonly integrationRepository: IIntegrationRepository
    ) { }

    async execute(id: string, organizationId: string): Promise<void> {
        const integration = await this.integrationRepository.findById(id);

        if (!integration || integration.organizationId !== organizationId) {
            throw new AppError("Integration not found", HttpStatusCode.NOT_FOUND);
        }

        await this.integrationRepository.delete(id);
    }
}