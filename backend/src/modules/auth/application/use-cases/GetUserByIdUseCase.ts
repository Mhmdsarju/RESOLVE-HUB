import { IUserRepository } from "../../domain/repositories/IUserRepository";

import { User } from "../../domain/entities/User";

import { IGetUserByIdUseCase } from "../../domain/interfaces/use-cases/IGetUserByIdUseCase";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class GetUserByIdUseCase implements IGetUserByIdUseCase {

    constructor(

        private readonly userRepository: IUserRepository,

    ) { }

    async execute(userId: string, organizationId: string,): Promise<User | null> {

        const user = await this.userRepository.findById(
            userId,
        );

        if (!user) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
        }

        if (user.organizationId !== organizationId) {
            throw new AppError("User does not belong to this organization", HttpStatusCode.NOT_FOUND);
        }

        return user;

    }

}