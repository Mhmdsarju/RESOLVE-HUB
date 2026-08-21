import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { IGetMeUseCase } from "../../domain/interfaces/use-cases/IGetMeUseCase";

export class GetMeUseCase implements IGetMeUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(userId: string): Promise<User> {
        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND,);
        }

        return user;
    }
}