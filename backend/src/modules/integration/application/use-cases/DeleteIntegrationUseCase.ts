import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IIntegrationRepository } from "../../domain/interfaces/IIntegrationRepository";
import { IDeleteIntegrationUseCase } from "../../domain/interfaces/use-cases/IDeleteIntegrationUseCase";

export class DeleteIntegrationUseCase implements IDeleteIntegrationUseCase {
    constructor(
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