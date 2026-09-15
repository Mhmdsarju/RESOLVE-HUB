import { Integration } from "../../entities/integration.entity";
import { CreateIntegrationDTO } from "../../../application/dto/createIntegrationDto";

export interface ICreateIntegrationUseCase {
  execute(dto: CreateIntegrationDTO): Promise<Integration>;
}