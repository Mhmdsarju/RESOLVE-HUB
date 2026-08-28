import { WarRoomParticipant } from "../../domain/entity/warRoomParticipant";

export class WarRoomParticipantMapper {

    static toDb(participant: WarRoomParticipant) {
        return {
            ...(participant.id && {
                id: participant.id,
            }),
            warRoomId: participant.warRoomId,
            userId: participant.userId,
            ...(participant.joinedAt && {
                joinedAt: participant.joinedAt,
            }),
            ...(participant.leftAt !== undefined && {
                leftAt: participant.leftAt,
            }),
        };
    }

    static fromDb(data: {
        id: string;
        warRoomId: string;
        userId: string;
        joinedAt: Date;
        leftAt: Date | null;
    }): WarRoomParticipant {
        return new WarRoomParticipant({
            id: data.id,
            warRoomId: data.warRoomId,
            userId: data.userId,
            joinedAt: data.joinedAt,
            leftAt: data.leftAt,
        });
    }
}