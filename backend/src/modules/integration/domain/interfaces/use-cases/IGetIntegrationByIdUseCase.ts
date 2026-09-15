import { Integration } from "../../entities/integration.entity";

export interface IGetIntegrationByIdUseCase {
    execute(id: string, organizationId: string): Promise<Integration>;
}