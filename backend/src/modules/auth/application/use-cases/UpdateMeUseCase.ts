import { inject, injectable } from "inversify";

import { IUpdateMeUseCase } from "../../domain/interfaces/use-cases/IUpdateMeUseCase";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

import { UpdateMeDto } from "../dto/updateMe.dto";

import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class UpdateMeUseCase implements IUpdateMeUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(dto: UpdateMeDto): Promise<User> {
        if (!dto.userId?.trim()) {
            throw new AppError(                "User ID is required",                HttpStatusCode.BAD_REQUEST,            );
        }

        if (dto.name !== undefined) {
            const name = dto.name.trim();

            if (!name) {
                throw new AppError(                    "Name cannot be empty",                    HttpStatusCode.BAD_REQUEST,                );
            }

            if (name.length < 2) {
                throw new AppError(                    "Name must be at least 2 characters",                    HttpStatusCode.BAD_REQUEST, );
            }

            dto.name = name;
        }

        const existingUser =            await this.userRepository.findById(dto.userId);

        if (!existingUser) {
            throw new AppError(                "User not found",                HttpStatusCode.NOT_FOUND,            );
        }

        return await this.userRepository.update(
            dto.userId,
            {
                ...(dto.name !== undefined && {
                    name: dto.name,
                }),
                updatedAt: new Date(),
            },
        );
    }
}