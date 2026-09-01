import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { GetWarRoomsDto } from "../dto/getWarRoomsDto";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { WarRoom } from "../../domain/entity/warRoom.entity";
import { IGetWarRoomsUseCase } from "../../domain/interface/usecase/IGetWarRoomsUseCase";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export class GetWarRoomsUseCase implements IGetWarRoomsUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
    ) { }

    async execute(dto: GetWarRoomsDto, userId: string,): Promise<PaginationResult<WarRoom>> {

        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const page = dto.page ?? 1;
        const limit = dto.limit ?? 6;

        if (page < 1) {
            throw new AppError("Page must be greater than 0", HttpStatusCode.BAD_REQUEST,);
        }

        if (limit < 1) {
            throw new AppError("Limit must be greater than 0", HttpStatusCode.BAD_REQUEST,);
        }

        const result = await this.warRoomRepository.findWarRooms({
            ...dto,
            page,
            limit,
        });

        return result;
    }
}