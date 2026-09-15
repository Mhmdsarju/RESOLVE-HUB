import { GetSuperAdminOrganizationsDTO } from "../dto/GetSuperAdminOrganizationsDTO";
import { SuperAdminOrganizationsDTO } from "../dto/SuperAdminOrganizationDTO";

import { IGetSuperAdminOrganizationsUseCase } from "../../domain/interfaces/IGetSuperAdminOrganizationsUseCase";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository"; 

export class GetSuperAdminOrganizationsUseCase implements IGetSuperAdminOrganizationsUseCase {
    constructor(
        private readonly organizationRepository: IOrganizationRepository,
    ) { }

    async execute(dto: GetSuperAdminOrganizationsDTO): Promise<SuperAdminOrganizationsDTO> {
        return await this.organizationRepository.getSuperAdminOrganizations(
            dto.page,
            dto.limit,
            dto.search,
            dto.status,
        );
    }
}