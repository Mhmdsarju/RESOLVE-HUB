export interface IGetOrganizationAnalyticsUseCase {
  execute(): Promise<{
    totalOrganizations: number;
    activeOrganizations: number;
    frozenOrganizations: number;
  }>;
}