import { injectable } from "inversify";
import { prisma } from "../persistence/prisma";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { UserMapper } from "../mappers/UserMapper";

@injectable()
export class PrismaUserRepository implements IUserRepository {

  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return UserMapper.toDomain(createdUser);
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return UserMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(UserMapper.toDomain);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: UserMapper.toPersistence({
        ...data,
        id,
      } as User),
    });

    return UserMapper.toDomain(updatedUser);
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

    return UserMapper.toDomain(user);
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