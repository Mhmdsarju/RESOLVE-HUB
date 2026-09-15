import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { WarRoom } from "../../domain/entity/warRoom.entity";
import { IGetWarRoomByIdUseCase } from "../../domain/interface/usecase/IGetWarRoomByIdUseCase";

export class GetWarRoomByIdUseCase implements IGetWarRoomByIdUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
    ) { }

    async execute(id: string, userId: string,): Promise<WarRoom> {

        if (!id?.trim()) {
            throw new AppError("War room ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const warRoom = await this.warRoomRepository.findById(id);

        if (!warRoom) {
            throw new AppError("War room not found", HttpStatusCode.NOT_FOUND,);
        }

        return warRoom;
    }
}