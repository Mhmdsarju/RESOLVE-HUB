import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { WarRoomParticipant } from "../../domain/entity/warRoomParticipant";
import { IWarRoomParticipantRepository } from "../../domain/interface/IWarRoomParticipantRepository";

import { WarRoomParticipantMapper } from "../mapper/WarRoomParticipantMapper";

@injectable()
export class PrismaWarRoomParticipantRepository implements IWarRoomParticipantRepository {

    async create(participant: WarRoomParticipant,): Promise<WarRoomParticipant> {

        const createdParticipant = await prisma.warRoomParticipant.create({
            data: WarRoomParticipantMapper.toDb(participant),
        });

        return WarRoomParticipantMapper.fromDb(
            createdParticipant,
        );
    }

    async findById(id: string,): Promise<WarRoomParticipant | null> {

        const participant = await prisma.warRoomParticipant.findUnique({
            where: { id },
        });

        if (!participant) {
            return null;
        }

        return WarRoomParticipantMapper.fromDb(
            participant,
        );
    }

    async findAll(): Promise<WarRoomParticipant[]> {

        const participants = await prisma.warRoomParticipant.findMany({
            orderBy: {
                joinedAt: "desc",
            },
        });

        return participants.map(
            WarRoomParticipantMapper.fromDb,
        );
    }

    async findByWarRoomAndUser(warRoomId: string, userId: string,): Promise<WarRoomParticipant | null> {

        const participant = await prisma.warRoomParticipant.findUnique({
            where: {
                warRoomId_userId: {
                    warRoomId,
                    userId,
                },
            },
        });

        if (!participant) {
            return null;
        }

        return WarRoomParticipantMapper.fromDb(
            participant,
        );
    }

    async findActiveParticipants(warRoomId: string,): Promise<WarRoomParticipant[]> {

        const participants = await prisma.warRoomParticipant.findMany({
            where: {
                warRoomId,
                leftAt: null,
            },
            orderBy: {
                joinedAt: "asc",
            },
        });

        return participants.map(
            WarRoomParticipantMapper.fromDb,
        );
    }

    async update(id: string, data: Partial<WarRoomParticipant>,): Promise<WarRoomParticipant> {

        const updatedParticipant = await prisma.warRoomParticipant.update({
            where: { id },
            data: {
                leftAt: data.leftAt,
            },
        });

        return WarRoomParticipantMapper.fromDb(
            updatedParticipant,
        );
    }

    async delete(id: string,): Promise<void> {

        await prisma.warRoomParticipant.delete({
            where: { id },
        });
    }
}