import { injectable } from "inversify";
import { prisma } from "../../../../config/database";

import { Organization } from "../../domain/entities/Organization";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { OrganizationMapper } from "../mappers/OrganizationMapper";
import { OrganizationDashboardStatsDTO } from "../../application/dto/OrganizationDashboardStatsDTO";
import { SuperAdminOrganizationsDTO } from "../../application/dto/SuperAdminOrganizationDTO";
import { OrganizationStatus } from "@prisma/client";
import { RevenueAnalyticsDTO } from "../../application/dto/RevenueAnalyticsDTO";
import { PaymentStatus } from "@/modules/payment/domain/enums/paymentStatus.enum";
import { PaymentHistoryDTO } from "../../application/dto/PaymentHistoryDTO";
import { SuperAdminDashboardDTO } from "../../application/dto/SuperAdminDashboardDTO";

@injectable()
export class PrismaOrganizationRepository implements IOrganizationRepository {

  async create(organization: Organization): Promise<Organization> {
    const createdOrganization = await prisma.organization.create({
      data: OrganizationMapper.toDb(organization),
    });

    return OrganizationMapper.fromDb(createdOrganization);
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: { id },
    });

    if (!organization) {
      return null;
    }

    return OrganizationMapper.fromDb(organization);
  }

  async findAll(): Promise<Organization[]> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, data: Partial<Organization>): Promise<Organization> {
    const updatedOrganization = await prisma.organization.update({
      where: {
        id,
      },
      data,
    });

    return OrganizationMapper.fromDb(updatedOrganization);
  }

  async delete(id: string): Promise<void> {
    console.log(id);
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: { name },
    });

    if (!organization) {
      return null;
    }

    return OrganizationMapper.fromDb(organization);
  }

  async getDashboardStats(organizationId: string): Promise<OrganizationDashboardStatsDTO> {
    const [teams, members, incidents, warRooms, subscription] = await Promise.all([
      prisma.team.count({
        where: {
          organizationId,
          deletedAt: null,
        },
      }),

      prisma.user.count({
        where: {
          organizationId,
        },
      }),

      prisma.incident.count({
        where: {
          organizationId,
        },
      }),

      prisma.warRoom.count({
        where: {
          incident: {
            organizationId,
          },
        },
      }),

      prisma.subscription.findUnique({
        where: {
          organizationId,
        },
        include: {
          plan: true,
        },
      }),
    ]);

    return {
      teams,
      members,
      incidents,
      warRooms,
      plan: subscription?.plan.name ?? "FREE",
    };
  }

  async getOrganizationAnalytics(): Promise<{
    totalOrganizations: number;
    activeOrganizations: number;
    frozenOrganizations: number;
  }> {
    const [totalOrganizations, activeOrganizations, frozenOrganizations] =
      await Promise.all([
        prisma.organization.count(),
        prisma.organization.count({
          where: {
            accessStatus: "ACTIVE",
          },
        }),
        prisma.organization.count({
          where: {
            accessStatus: "FROZEN",
          },
        }),
      ]);

    return {
      totalOrganizations,
      activeOrganizations,
      frozenOrganizations,
    };
  }


  async getSuperAdminOrganizations(
    page: number,
    limit: number,
    search?: string,
    status?: string,
  ): Promise<SuperAdminOrganizationsDTO> {
    const where = {
      ...(search && {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      }),
      ...(status && {
        status: status as OrganizationStatus,
      }),
    };

    const skip = (page - 1) * limit;

    const [organizations, total] = await Promise.all([
      prisma.organization.findMany({
        where,
        select: {
          id: true,
          name: true,
          industry: true,
          companySize: true,
          country: true,
          state: true,
          city: true,
          status: true,
          accessStatus: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.organization.count({
        where,
      }),
    ]);

    return {
      organizations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getRevenueAnalytics(): Promise<RevenueAnalyticsDTO> {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    );

    const startOfYear = new Date(
      now.getFullYear(),
      0,
      1,
    );

    const [totalRevenue, monthlyRevenue, yearlyRevenue, freeSubscriptions, paidSubscriptions, planWiseSubscriptionsData, revenueByPlanData] =
      await Promise.all([
        prisma.payment.aggregate({
          where: {
            status: "SUCCESS",
          },
          _sum: {
            amount: true,
          },
        }),
        prisma.payment.aggregate({
          where: {
            status: "SUCCESS",
            paidAt: {
              gte: startOfMonth,
              lte: now,
            },
          },
          _sum: {
            amount: true,
          },
        }),
        prisma.payment.aggregate({
          where: {
            status: "SUCCESS",
            paidAt: {
              gte: startOfYear,
              lte: now,
            },
          },
          _sum: {
            amount: true,
          },
        }),
        prisma.subscription.count({
          where: {
            status: "ACTIVE",
            plan: {
              name: "FREE",
            },
          },
        }),
        prisma.subscription.count({
          where: {
            status: "ACTIVE",
            plan: {
              name: "PREMIUM",
            },
          },
        }),
        prisma.subscription.groupBy({
          by: ["planId"],
          where: {
            status: "ACTIVE",
          },
          _count: {
            planId: true,
          },
        }),
        prisma.payment.groupBy({
          by: ["planId"],
          where: {
            status: "SUCCESS",
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

    const planIds = [
      ...new Set([
        ...planWiseSubscriptionsData.map((item) => item.planId),
        ...revenueByPlanData.map((item) => item.planId),
      ]),
    ];

    const plans = await prisma.plan.findMany({
      where: {
        id: {
          in: planIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const planMap = new Map(
      plans.map((plan) => [plan.id, plan.name]),
    );

    return {
      totalRevenue: totalRevenue._sum.amount ?? 0,
      monthlyRevenue: monthlyRevenue._sum.amount ?? 0,
      yearlyRevenue: yearlyRevenue._sum.amount ?? 0,
      freeSubscriptions,
      paidSubscriptions,
      planWiseSubscriptions: planWiseSubscriptionsData.map((item) => ({
        plan: planMap.get(item.planId) ?? "UNKNOWN",
        count: item._count.planId,
      })),
      revenueByPlan: revenueByPlanData.map((item) => ({
        plan: planMap.get(item.planId) ?? "UNKNOWN",
        revenue: item._sum.amount ?? 0,
      })),
    };
  }

  async getPaymentHistory(
    page: number,
    limit: number,
    search?: string,
    status?: string,
    period?: "MONTHLY" | "YEARLY" | "CUSTOM",
    year?: number,
    month?: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<PaymentHistoryDTO> {

    let dateFilter;

    // Monthly filter
    if (period === "MONTHLY" && year && month) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);

      dateFilter = {
        gte: start,
        lt: end,
      };
    }

    // Yearly filter
    if (period === "YEARLY" && year) {
      const start = new Date(year, 0, 1);
      const end = new Date(year + 1, 0, 1);

      dateFilter = {
        gte: start,
        lt: end,
      };
    }

    // Custom date filter
    if (period === "CUSTOM" && startDate && endDate) {
      const end = new Date(endDate);

      end.setHours(23, 59, 59, 999);

      dateFilter = {
        gte: startDate,
        lte: end,
      };
    }

    const where = {
      ...(search && {
        OR: [
          {
            organization: {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          },
          {
            transactionId: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            razorpayOrderId: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }),

      ...(status && {
        status: status as PaymentStatus,
      }),

      ...(dateFilter && {
        createdAt: dateFilter,
      }),
    };

    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        select: {
          id: true,
          amount: true,
          currency: true,
          status: true,
          transactionId: true,
          razorpayOrderId: true,
          paidAt: true,
          createdAt: true,

          organization: {
            select: {
              name: true,
            },
          },

          plan: {
            select: {
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.payment.count({
        where,
      }),
    ]);

    return {
      payments: payments.map((payment) => ({
        id: payment.id,
        organizationName: payment.organization.name,
        plan: payment.plan.name,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        transactionId: payment.transactionId,
        razorpayOrderId: payment.razorpayOrderId,
        paidAt: payment.paidAt,
        createdAt: payment.createdAt,
      })),

      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSuperAdminDashboard(): Promise<SuperAdminDashboardDTO> {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    );

    const startOfYear = new Date(
      now.getFullYear(),
      0,
      1,
    );

    const startOfRevenueTrend = new Date(
      now.getFullYear(),
      now.getMonth() - 11,
      1,
    );

    const [
      totalOrganizations,
      activeOrganizations,
      frozenOrganizations,
      totalRevenue,
      monthlyRevenue,
      yearlyRevenue,
      freeSubscriptions,
      paidSubscriptions,
      subscriptionDistributionData,
      revenueByPlanData,
      revenueTrendPayments,
      recentPayments,
    ] = await Promise.all([
      prisma.organization.count(),

      prisma.organization.count({
        where: {
          accessStatus: "ACTIVE",
        },
      }),

      prisma.organization.count({
        where: {
          accessStatus: "FROZEN",
        },
      }),

      prisma.payment.aggregate({
        where: {
          status: "SUCCESS",
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.payment.aggregate({
        where: {
          status: "SUCCESS",
          paidAt: {
            gte: startOfMonth,
            lte: now,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.payment.aggregate({
        where: {
          status: "SUCCESS",
          paidAt: {
            gte: startOfYear,
            lte: now,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.subscription.count({
        where: {
          status: "ACTIVE",
          plan: {
            name: "FREE",
          },
        },
      }),

      prisma.subscription.count({
        where: {
          status: "ACTIVE",
          plan: {
            name: "PREMIUM",
          },
        },
      }),

      prisma.subscription.groupBy({
        by: ["planId"],
        where: {
          status: "ACTIVE",
        },
        _count: {
          planId: true,
        },
      }),

      prisma.payment.groupBy({
        by: ["planId"],
        where: {
          status: "SUCCESS",
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.payment.findMany({
        where: {
          status: "SUCCESS",
          paidAt: {
            gte: startOfRevenueTrend,
            lte: now,
          },
        },
        select: {
          amount: true,
          paidAt: true,
        },
        orderBy: {
          paidAt: "asc",
        },
      }),

      prisma.payment.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          amount: true,
          currency: true,
          status: true,
          paidAt: true,
          organization: {
            select: {
              name: true,
            },
          },
          plan: {
            select: {
              name: true,
            },
          },
        },
      }),
    ]);

    const subscriptionPlanIds = subscriptionDistributionData.map(
      (item) => item.planId,
    );

    const revenuePlanIds = revenueByPlanData.map(
      (item) => item.planId,
    );

    const planIds = [
      ...new Set([
        ...subscriptionPlanIds,
        ...revenuePlanIds,
      ]),
    ];

    const plans = await prisma.plan.findMany({
      where: {
        id: {
          in: planIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const planMap = new Map(
      plans.map((plan) => [plan.id, plan.name]),
    );

    const revenueTrendMap = new Map<string, number>();

    for (let index = 11; index >= 0; index--) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - index,
        1,
      );

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}`;

      revenueTrendMap.set(monthKey, 0);
    }

    revenueTrendPayments.forEach((payment) => {
      if (!payment.paidAt) {
        return;
      }

      const monthKey = `${payment.paidAt.getFullYear()}-${String(
        payment.paidAt.getMonth() + 1,
      ).padStart(2, "0")}`;

      revenueTrendMap.set(
        monthKey,
        (revenueTrendMap.get(monthKey) ?? 0) + payment.amount,
      );
    });

    const revenueTrend = Array.from(
      revenueTrendMap.entries(),
    ).map(([month, revenue]) => ({
      month,
      revenue,
    }));

    return {
      totalOrganizations,
      activeOrganizations,
      frozenOrganizations,
      totalRevenue: totalRevenue._sum.amount ?? 0,
      monthlyRevenue: monthlyRevenue._sum.amount ?? 0,
      yearlyRevenue: yearlyRevenue._sum.amount ?? 0,
      freeSubscriptions,
      paidSubscriptions,
      revenueTrend,
      subscriptionDistribution: subscriptionDistributionData.map(
        (item) => ({
          plan: planMap.get(item.planId) ?? "UNKNOWN",
          count: item._count.planId,
        }),
      ),
      revenueByPlan: revenueByPlanData.map(
        (item) => ({
          plan: planMap.get(item.planId) ?? "UNKNOWN",
          revenue: item._sum.amount ?? 0,
        }),
      ),
      recentPayments: recentPayments.map((payment) => ({
        organizationName: payment.organization.name,
        plan: payment.plan.name,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        paidAt: payment.paidAt,
      })),
    };
  }

}