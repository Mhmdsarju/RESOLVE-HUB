import { injectable } from "inversify";
import { prisma } from "../persistence/prisma";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserMapper } from "../mappers/UserMapper";

@injectable()
export class PrismaUserRepository implements IUserRepository {

  async create(user: User): Promise<User> {

    const createdUser = await prisma.user.create({
      data: UserMapper.toDb(user),
    });

    return UserMapper.fromDb(createdUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return UserMapper.fromDb(user);
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(UserMapper.fromDb);
  }

  async findUsersByOrganizationId(organizationId: string,): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: {
        organizationId,
      },
    });

    return users.map(UserMapper.fromDb);
  }

  async findOrganizationAdminByOrganizationId(organizationId: string,): Promise<User | null> {
    const admin = await prisma.user.findFirst({
      where: {
        organizationId,
        role: "ORG_ADMIN",
        isActive: true,
      },
    });

    if (!admin) {
      return null;
    }

    return UserMapper.fromDb(admin);
  }

  async update(id: string, data: Partial<User>,): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: UserMapper.toUpdateDb(data),
    });

    return UserMapper.fromDb(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return UserMapper.fromDb(user);
  }

  async updatePassword(email: string, password: string): Promise<void> {
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash: password,
      },
    });
  }
}