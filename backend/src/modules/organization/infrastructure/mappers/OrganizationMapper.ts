import { Organization as PrismaOrganization } from "@prisma/client";

import { Organization } from "../../domain/entities/Organization";

import type { OrganizationStatus } from "../../domain/enums/organizationStatus.enum";
import type { OrganizationAccessStatus } from "../../domain/enums/organizationAccessStatus.enum";

export class OrganizationMapper {

  static fromDb(organization: PrismaOrganization): Organization {

    return new Organization({
      id: organization.id,
      name: organization.name,
      industry: organization.industry,
      companySize: organization.companySize,
      website: organization.website,
      description: organization.description,
      phone: organization.phone,
      country: organization.country,
      state: organization.state,
      city: organization.city,
      address: organization.address,
      status: organization.status as OrganizationStatus,
      accessStatus: organization.accessStatus as OrganizationAccessStatus,
      createdAt: organization.createdAt,
      updatedAt: organization.updatedAt,
    });

  }

  static toDb(organization: Organization) {
    return {
      name: organization.name,
      industry: organization.industry,
      companySize: organization.companySize,
      website: organization.website,
      description: organization.description,
      phone: organization.phone,
      country: organization.country,
      state: organization.state,
      city: organization.city,
      address: organization.address,
      status: organization.status,
      accessStatus: organization.accessStatus,
    };
  }

}