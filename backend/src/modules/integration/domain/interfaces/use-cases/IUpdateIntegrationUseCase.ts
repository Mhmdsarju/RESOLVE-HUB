import { Integration } from "../../entities/integration.entity";
import { UpdateIntegrationDTO } from "../../../application/dto/updateIntegrationDto";

export interface IUpdateIntegrationUseCase {
    execute(id: string, organizationId: string, dto: UpdateIntegrationDTO): Promise<Integration>;
}