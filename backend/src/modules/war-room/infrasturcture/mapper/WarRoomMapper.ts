import { WarRoom as PrismaWarRoom } from "@prisma/client";

import { WarRoom } from "../../domain/entity/warRoom.entity";
import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

export class WarRoomMapper {

    static toDb(warRoom: WarRoom) {
        return {
            ...(warRoom.id && {
                id: warRoom.id,
            }),
            incidentId: warRoom.incidentId,
            createdBy: warRoom.createdBy,
            status: warRoom.status,
            ...(warRoom.closedAt && {
                closedAt: warRoom.closedAt,
            }),
        };
    }

    static fromDb(data: PrismaWarRoom): WarRoom {
        return new WarRoom({
            id: data.id,
            incidentId: data.incidentId,
            createdBy: data.createdBy,
            status: data.status as WarRoomStatus,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            closedAt: data.closedAt,
        });
    }
}