export interface RevenueAnalyticsDTO {
    totalRevenue: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
    freeSubscriptions: number;
    paidSubscriptions: number;
    planWiseSubscriptions: {
        plan: string;
        count: number;
    }[];
    revenueByPlan: {
        plan: string;
        revenue: number;
    }[];
}