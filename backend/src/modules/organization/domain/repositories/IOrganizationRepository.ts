import { IBaseRepository } from "../../../../shared/base/repositories/IBaseRepository";
import { OrganizationDashboardStatsDTO } from "../../application/dto/OrganizationDashboardStatsDTO";
import { SuperAdminOrganizationsDTO } from "../../application/dto/SuperAdminOrganizationDTO";
import { Organization } from "../entities/Organization";

export interface IOrganizationRepository extends IBaseRepository<Organization> {

  findByName(name: string): Promise<Organization | null>;
  getDashboardStats(organizationId: string): Promise<OrganizationDashboardStatsDTO>;

  getOrganizationAnalytics(): Promise<{
    totalOrganizations: number;
    activeOrganizations: number;
    frozenOrganizations: number;
  }>;
  getSuperAdminOrganizations(
    page: number,
    limit: number,
    search?: string,
    status?: string,
  ): Promise<SuperAdminOrganizationsDTO>;


}