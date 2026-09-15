import { IBaseRepository } from "../../../../shared/base/repositories/IBaseRepository";
import { OrganizationDashboardStatsDTO } from "../../application/dto/OrganizationDashboardStatsDTO";
import { PaymentHistoryDTO } from "../../application/dto/PaymentHistoryDTO";
import { RevenueAnalyticsDTO } from "../../application/dto/RevenueAnalyticsDTO";
import { SuperAdminDashboardDTO } from "../../application/dto/SuperAdminDashboardDTO";
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

  getRevenueAnalytics(): Promise<RevenueAnalyticsDTO>;
  getPaymentHistory(
    page: number,
    limit: number,
    search?: string,
    status?: string,
  ): Promise<PaymentHistoryDTO>;

  getSuperAdminDashboard(): Promise<SuperAdminDashboardDTO>;
}