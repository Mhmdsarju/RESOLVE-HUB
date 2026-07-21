import {
  Organization as PrismaOrganization,
  OrganizationStatus as PrismaOrganizationStatus,
} from "@prisma/client";

import { Organization } from "../../domain/entities/Organization";
import { OrganizationStatus } from "../../domain/enums/OrganizationStatus";

export class OrganizationMapper {
  static toDomain( organization: PrismaOrganization ): Organization {
    return new Organization({
      id: organization.id,
      name: organization.name,
      industry: organization.industry,
      companySize: organization.companySize,
      status:
        organization.status === PrismaOrganizationStatus.ACTIVE
          ? OrganizationStatus.ACTIVE
          : OrganizationStatus.INACTIVE,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    });
  }

  static toPersistence( organization: Organization ) {
    return {
      name: organization.name,
      industry: organization.industry,
      companySize: organization.companySize,
      status:
        organization.status === OrganizationStatus.ACTIVE
          ? PrismaOrganizationStatus.ACTIVE
          : PrismaOrganizationStatus.INACTIVE,
    };
  }
}