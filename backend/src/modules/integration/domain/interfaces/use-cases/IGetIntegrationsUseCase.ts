import { Integration } from "../../entities/integration.entity";

export interface IGetIntegrationsUseCase {
    execute(monitoringProjectId: string, organizationId: string, page: number, limit: number): Promise<{
        data: Integration[];
        total: number;
        page: number;
        limit: number;
    }>;
}