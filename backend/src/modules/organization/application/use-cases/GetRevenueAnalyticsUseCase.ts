import { RevenueAnalyticsDTO } from "../dto/RevenueAnalyticsDTO";

import { IGetRevenueAnalyticsUseCase } from "../../domain/interfaces/IGetRevenueAnalyticsUseCase";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository"; 

export class GetRevenueAnalyticsUseCase implements IGetRevenueAnalyticsUseCase {
    constructor(
        private readonly organizationRepository: IOrganizationRepository,
    ) { }

    async execute(): Promise<RevenueAnalyticsDTO> {
        return await this.organizationRepository.getRevenueAnalytics();
    }
}