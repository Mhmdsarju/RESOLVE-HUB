import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { IWarRoomParticipantRepository } from "../../domain/interface/IWarRoomParticipantRepository";
import { IWarRoomMessageRepository } from "../../domain/interface/IWarRoomMessageRepository";

import { WarRoomMessage } from "../../domain/entity/warRoomMessage.entity";

import { IGetWarRoomMessagesUseCase } from "../../domain/interface/usecase/IGetWarRoomMessagesUseCase";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export class GetWarRoomMessagesUseCase implements IGetWarRoomMessagesUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
        private readonly warRoomParticipantRepository: IWarRoomParticipantRepository,
        private readonly warRoomMessageRepository: IWarRoomMessageRepository,
    ) { }

    async execute(warRoomId: string, userId: string, page: number, limit: number,): Promise<PaginationResult<WarRoomMessage>> {

        if (!warRoomId?.trim()) {
            throw new AppError("War room ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (page < 1) {
            throw new AppError("Page must be greater than 0", HttpStatusCode.BAD_REQUEST,);
        }

        if (limit < 1) {
            throw new AppError("Limit must be greater than 0", HttpStatusCode.BAD_REQUEST,);
        }

        const warRoom = await this.warRoomRepository.findById(
            warRoomId,
        );

        if (!warRoom) {
            throw new AppError("War room not found", HttpStatusCode.NOT_FOUND,);
        }

        const participant = await this.warRoomParticipantRepository.findByWarRoomAndUser(
            warRoomId,
            userId,
        );

        if (!participant) {
            throw new AppError("You are not a participant of this war room", HttpStatusCode.FORBIDDEN,);
        }

        return await this.warRoomMessageRepository.findByWarRoomId(
            warRoomId,
            page,
            limit,
        );
    }
}