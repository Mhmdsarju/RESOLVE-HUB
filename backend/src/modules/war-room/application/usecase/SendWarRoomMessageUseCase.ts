import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { IWarRoomParticipantRepository } from "../../domain/interface/IWarRoomParticipantRepository";
import { IWarRoomMessageRepository } from "../../domain/interface/IWarRoomMessageRepository";

import { WarRoomMessage } from "../../domain/entity/warRoomMessage.entity";
import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

import { ISendWarRoomMessageUseCase } from "../../domain/interface/usecase/ISendWarRoomMessageUseCase";

export class SendWarRoomMessageUseCase implements ISendWarRoomMessageUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
        private readonly warRoomParticipantRepository: IWarRoomParticipantRepository,
        private readonly warRoomMessageRepository: IWarRoomMessageRepository,
    ) { }

    async execute(warRoomId: string, userId: string, content: string,): Promise<WarRoomMessage> {

        if (!warRoomId?.trim()) {
            throw new AppError("War room ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!content?.trim()) {
            throw new AppError("Message content is required", HttpStatusCode.BAD_REQUEST,);
        }

        const warRoom = await this.warRoomRepository.findById(
            warRoomId,
        );

        if (!warRoom) {
            throw new AppError("War room not found", HttpStatusCode.NOT_FOUND,);
        }

        if (warRoom.status === WarRoomStatus.CLOSED) {
            throw new AppError("Cannot send message to a closed war room", HttpStatusCode.BAD_REQUEST,);
        }

        const participant = await this.warRoomParticipantRepository.findByWarRoomAndUser(
            warRoomId,
            userId,
        );

        if (!participant || participant.leftAt) {
            throw new AppError("You are not an active participant of this war room", HttpStatusCode.FORBIDDEN,);
        }

        const message = new WarRoomMessage({
            warRoomId,
            userId,
            content: content.trim(),
        });

        return await this.warRoomMessageRepository.create(
            message,
        );
    }
}