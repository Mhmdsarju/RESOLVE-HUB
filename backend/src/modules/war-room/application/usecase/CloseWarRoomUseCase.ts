import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { WarRoom } from "../../domain/entity/warRoom.entity";
import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

import { ICloseWarRoomUseCase } from "../../domain/interface/usecase/ICloseWarRoomUseCase";

export class CloseWarRoomUseCase implements ICloseWarRoomUseCase {

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

        if (warRoom.status === WarRoomStatus.CLOSED) {
            throw new AppError("War room is already closed", HttpStatusCode.BAD_REQUEST,);
        }

        const updatedWarRoom = await this.warRoomRepository.update(
            id,
            {
                status: WarRoomStatus.CLOSED,
                closedAt: new Date(),
            },
        );

        return updatedWarRoom;
    }
}