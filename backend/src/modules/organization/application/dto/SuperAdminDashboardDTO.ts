export interface SuperAdminDashboardDTO {
    totalOrganizations: number;
    activeOrganizations: number;
    frozenOrganizations: number;

    totalRevenue: number;
    monthlyRevenue: number;
    yearlyRevenue: number;

    freeSubscriptions: number;
    paidSubscriptions: number;

    revenueTrend: {
        month: string;
        revenue: number;
    }[];

    subscriptionDistribution: {
        plan: string;
        count: number;
    }[];

    revenueByPlan: {
        plan: string;
        revenue: number;
    }[];

    recentPayments: {
        organizationName: string;
        plan: string;
        amount: number;
        currency: string;
        status: string;
        paidAt: Date | null;
    }[];
}