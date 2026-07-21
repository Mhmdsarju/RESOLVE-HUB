import { prisma } from "../persistence/prisma";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { Organization } from "../../domain/entities/Organization";
import { User } from "../../domain/entities/User";

import { UserMapper } from "../mappers/UserMapper";
import { OrganizationMapper } from "../mappers/OrganizationMapper";

export class PrismaAuthRepository implements IAuthRepository {

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findOrganizationByName(name: string ): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: { name },
    });

    if (!organization) {
      return null;
    }

    return OrganizationMapper.toDomain(organization);
  }

  async createOrganization( organization: Organization ): Promise<Organization> {
    const createdOrganization = await prisma.organization.create({
      data: OrganizationMapper.toPersistence(organization),
    });

    return OrganizationMapper.toDomain(createdOrganization);
  }

  async createUser(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(createdUser);
  }
  
}