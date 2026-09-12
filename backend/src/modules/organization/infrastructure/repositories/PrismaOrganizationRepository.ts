import { injectable } from "inversify";
import { prisma } from "../../../../config/database";

import { Organization } from "../../domain/entities/Organization";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { OrganizationMapper } from "../mappers/OrganizationMapper";
import { OrganizationDashboardStatsDTO } from "../../application/dto/OrganizationDashboardStatsDTO";
import { SuperAdminOrganizationsDTO } from "../../application/dto/SuperAdminOrganizationDTO";
import { OrganizationStatus } from "@prisma/client";

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


}