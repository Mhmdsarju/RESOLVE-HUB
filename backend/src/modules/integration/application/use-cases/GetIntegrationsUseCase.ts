import { Integration } from "../../domain/entities/integration.entity";
import { IIntegrationRepository } from "../../domain/interfaces/IIntegrationRepository";
import { IGetIntegrationsUseCase } from "../../domain/interfaces/use-cases/IGetIntegrationsUseCase";

export class GetIntegrationsUseCase implements IGetIntegrationsUseCase {
    constructor(
        private readonly integrationRepository: IIntegrationRepository
    ) { }

    async execute(
        monitoringProjectId: string,
        organizationId: string,
        page: number,
        limit: number
    ): Promise<{
        data: Integration[];
        total: number;
        page: number;
        limit: number;
    }> {
        const skip = (page - 1) * limit;

        const result =
            await this.integrationRepository.findAllByMonitoringProject(
                monitoringProjectId,
                organizationId,
                skip,
                limit
            );

        return {
            data: result.data,
            total: result.total,
            page,
            limit,
        };
    }
}