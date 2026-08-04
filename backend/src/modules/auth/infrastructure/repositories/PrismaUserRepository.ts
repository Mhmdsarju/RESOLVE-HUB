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

  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: UserMapper.toDb({
        ...data,
        id,
      } as User),
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