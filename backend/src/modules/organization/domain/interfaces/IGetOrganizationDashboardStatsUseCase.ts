import { OrganizationDashboardStatsDTO } from "../../application/dto/OrganizationDashboardStatsDTO";

export interface IGetOrganizationDashboardStatsUseCase {
  execute(organizationId: string): Promise<OrganizationDashboardStatsDTO>;
}