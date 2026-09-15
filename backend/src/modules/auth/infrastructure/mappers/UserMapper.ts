import { User as PrismaUser } from "@prisma/client";
import { User } from "../../domain/entities/User";
import { UserRole } from "../../domain/enums/UserRole";
import { UserRole as PrismaUserRole } from "@prisma/client";

export class UserMapper {
  //Converts a database object into a domain entity
  static fromDb(user: PrismaUser): User {
    return new User({
      id: user.id,
      name: user.fullName,
      email: user.email,
      password: user.passwordHash,
      organizationId: user.organizationId,
      role:
        user.role === PrismaUserRole.SUPER_ADMIN
          ? UserRole.SUPER_ADMIN
          : user.role === PrismaUserRole.ORG_ADMIN
            ? UserRole.ORG_ADMIN
            : UserRole.ENGINEER,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  //Converts a domain entity into a database object
  static toDb(user: User) {
    return {
      fullName: user.name,
      email: user.email,
      passwordHash: user.password,
      organizationId: user.organizationId,
      role:
        user.role === UserRole.SUPER_ADMIN
          ? PrismaUserRole.SUPER_ADMIN
          : user.role === UserRole.ORG_ADMIN
            ? PrismaUserRole.ORG_ADMIN
            : PrismaUserRole.ENGINEER,
    };
  }

  static toUpdateDb(data: Partial<User>) {
    return {
      ...(data.name !== undefined && {
        fullName: data.name,
      }),

      ...(data.email !== undefined && {
        email: data.email,
      }),

      ...(data.password !== undefined && {
        passwordHash: data.password,
      }),

      ...(data.organizationId !== undefined && {
        organizationId: data.organizationId,
      }),

      ...(data.role !== undefined && {
        role:
          data.role === UserRole.SUPER_ADMIN
            ? PrismaUserRole.SUPER_ADMIN
            : data.role === UserRole.ORG_ADMIN
              ? PrismaUserRole.ORG_ADMIN
              : PrismaUserRole.ENGINEER,
      }),

      ...(data.updatedAt !== undefined && {
        updatedAt: data.updatedAt,
      }),
    };
  }
}