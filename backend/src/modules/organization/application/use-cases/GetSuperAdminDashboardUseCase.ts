import { SuperAdminDashboardDTO } from "../dto/SuperAdminDashboardDTO";
import { IGetSuperAdminDashboardUseCase } from "../../domain/interfaces/IGetSuperAdminDashboardUseCase";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";


export class GetSuperAdminDashboardUseCase implements IGetSuperAdminDashboardUseCase {
    constructor(
        private readonly organizationRepository: IOrganizationRepository,
    ) { }

    async execute(): Promise<SuperAdminDashboardDTO> {
        return await this.organizationRepository.getSuperAdminDashboard();
    }
}