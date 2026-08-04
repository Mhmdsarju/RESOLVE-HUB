import { injectable } from "inversify";
import { prisma } from "../../../../config/database";

import { Organization } from "../../domain/entities/Organization";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { OrganizationMapper } from "../mappers/OrganizationMapper";

@injectable()
export class PrismaOrganizationRepository  implements IOrganizationRepository {
  
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
}