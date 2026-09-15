import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IGetOrganizationAnalyticsUseCase } from "../../domain/interfaces/IGetOrganizationAnalyticsUseCase";

export class GetOrganizationAnalyticsUseCase implements IGetOrganizationAnalyticsUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async execute(): Promise<{
    totalOrganizations: number;
    activeOrganizations: number;
    frozenOrganizations: number;
  }> {
    return this.organizationRepository.getOrganizationAnalytics();
  }
}