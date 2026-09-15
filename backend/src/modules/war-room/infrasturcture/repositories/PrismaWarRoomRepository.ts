import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { WarRoom } from "../../domain/entity/warRoom.entity";
import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";

import { GetWarRoomsDto } from "../../application/dto/getWarRoomsDto";

import { WarRoomMapper } from "../mapper/WarRoomMapper";

@injectable()
export class PrismaWarRoomRepository implements IWarRoomRepository {

    async create(warRoom: WarRoom): Promise<WarRoom> {
        const createdWarRoom = await prisma.warRoom.create({
            data: WarRoomMapper.toDb(warRoom),
        });

        return WarRoomMapper.fromDb(createdWarRoom);
    }

    async findById(id: string): Promise<WarRoom | null> {
        const warRoom = await prisma.warRoom.findUnique({
            where: { id },
        });

        if (!warRoom) {
            return null;
        }

        return WarRoomMapper.fromDb(warRoom);
    }

    async findAll(): Promise<WarRoom[]> {
        const warRooms = await prisma.warRoom.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return warRooms.map(WarRoomMapper.fromDb);
    }

    async findWarRooms(dto: GetWarRoomsDto,): Promise<PaginationResult<WarRoom>> {

        const skip = (dto.page - 1) * dto.limit;

        const where = {
            incident: {
                organizationId: dto.organizationId,

                ...(dto.teamIds?.length
                    ? {
                        assignedTeamId: {
                            in: dto.teamIds,
                        },
                    }
                    : {}),
            },

            ...(dto.status && {
                status: dto.status,
            }),
        };

        const [warRooms, total] = await Promise.all([
            prisma.warRoom.findMany({
                where,

                skip,

                take: dto.limit,

                orderBy: {
                    createdAt: "desc",
                },

                include: {
                    incident: true,
                },
            }),

            prisma.warRoom.count({
                where,
            }),
        ]);

        return {
            items: warRooms.map(WarRoomMapper.fromDb),

            pagination: {
                page: dto.page,
                limit: dto.limit,
                total,
                totalPages: Math.ceil(total / dto.limit),
            },
        };
    }

    async update(id: string, data: Partial<WarRoom>,): Promise<WarRoom> {
        const updatedWarRoom = await prisma.warRoom.update({
            where: { id },
            data: {
                status: data.status,
                closedAt: data.closedAt,
            },
        });

        return WarRoomMapper.fromDb(updatedWarRoom);
    }

    async delete(id: string): Promise<void> {
        await prisma.warRoom.delete({
            where: { id },
        });
    }

    async findByIncidentId(incidentId: string,): Promise<WarRoom | null> {
        const warRoom = await prisma.warRoom.findUnique({
            where: {
                incidentId,
            },
        });

        if (!warRoom) {
            return null;
        }

        return WarRoomMapper.fromDb(warRoom);
    }
}