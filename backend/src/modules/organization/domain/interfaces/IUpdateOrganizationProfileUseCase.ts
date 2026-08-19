import { UpdateOrganizationProfileDto } from "../../application/dto/UpdateOrganizationProfileDto";

export interface IUpdateOrganizationProfileUseCase {
  execute(organizationId: string, data: UpdateOrganizationProfileDto,): Promise<void>;
}