import { WarRoomMessage as PrismaWarRoomMessage } from "@prisma/client";

import { WarRoomMessage } from "../../domain/entity/warRoomMessage.entity";

export class WarRoomMessageMapper {

    static toDb(message: WarRoomMessage) {
        return {
            ...(message.id && {
                id: message.id,
            }),
            warRoomId: message.warRoomId,
            userId: message.userId,
            content: message.content,
        };
    }

    static fromDb(data: PrismaWarRoomMessage): WarRoomMessage {
        return new WarRoomMessage({
            id: data.id,
            warRoomId: data.warRoomId,
            userId: data.userId,
            content: data.content,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }
}