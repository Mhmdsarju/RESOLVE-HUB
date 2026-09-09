import { OrganizationDashboardStatsDTO } from "../dto/OrganizationDashboardStatsDTO";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IGetOrganizationDashboardStatsUseCase } from "../../domain/interfaces/IGetOrganizationDashboardStatsUseCase";

export class GetOrganizationDashboardStatsUseCase implements IGetOrganizationDashboardStatsUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async execute(organizationId: string): Promise<OrganizationDashboardStatsDTO> {
    return this.organizationRepository.getDashboardStats(organizationId);
  }
}