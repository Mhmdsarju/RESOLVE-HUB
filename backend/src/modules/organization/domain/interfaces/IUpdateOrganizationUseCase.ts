import { Organization } from "../entities/Organization";
import { UpdateOrganizationDto } from "../../application/dto/UpdateOrganizationDto";

export interface IUpdateOrganizationUseCase {
    execute(organizationId: string, dto: UpdateOrganizationDto, userId?: string | null,): Promise<Organization>;
}