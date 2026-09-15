import { RevenueAnalyticsDTO } from "../../application/dto/RevenueAnalyticsDTO";

export interface IGetRevenueAnalyticsUseCase {
    execute(): Promise<RevenueAnalyticsDTO>;
}