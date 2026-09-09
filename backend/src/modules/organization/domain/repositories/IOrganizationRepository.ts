import { IBaseRepository } from "../../../../shared/base/repositories/IBaseRepository";
import { OrganizationDashboardStatsDTO } from "../../application/dto/OrganizationDashboardStatsDTO";
import { Organization } from "../entities/Organization";

export interface IOrganizationRepository extends IBaseRepository<Organization>{

  findByName(name: string): Promise<Organization | null>;
  getDashboardStats(organizationId: string): Promise<OrganizationDashboardStatsDTO>;

}