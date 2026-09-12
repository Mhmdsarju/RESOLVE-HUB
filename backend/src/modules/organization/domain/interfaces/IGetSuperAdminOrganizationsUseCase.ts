import { GetSuperAdminOrganizationsDTO } from "../../application/dto/GetSuperAdminOrganizationsDTO";
import { SuperAdminOrganizationsDTO } from "../../application/dto/SuperAdminOrganizationDTO"; 

export interface IGetSuperAdminOrganizationsUseCase {
    execute(dto: GetSuperAdminOrganizationsDTO): Promise<SuperAdminOrganizationsDTO>;
}