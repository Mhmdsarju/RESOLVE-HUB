import { prisma } from "../../../../config/database";

import { Organization } from "../../../auth/domain/entities/Organization";
import { OrganizationMapper } from "../../../auth/infrastructure/mappers/OrganizationMapper";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";

export class PrismaOrganizationRepository
  implements IOrganizationRepository
{
  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (!organization) {
      return null;
    }

    return OrganizationMapper.toDomain(organization);
  }
}