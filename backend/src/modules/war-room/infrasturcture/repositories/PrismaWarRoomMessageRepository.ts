import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { WarRoomMessage } from "../../domain/entity/warRoomMessage.entity";
import { IWarRoomMessageRepository } from "../../domain/interface/IWarRoomMessageRepository";

import { WarRoomMessageMapper } from "../mapper/WarRoomMessageMapper";

@injectable()
export class PrismaWarRoomMessageRepository implements IWarRoomMessageRepository {

    async create(message: WarRoomMessage): Promise<WarRoomMessage> {
        const createdMessage = await prisma.warRoomMessage.create({
            data: WarRoomMessageMapper.toDb(message),
        });

        return WarRoomMessageMapper.fromDb(createdMessage);
    }

    async findById(id: string): Promise<WarRoomMessage | null> {
        const message = await prisma.warRoomMessage.findUnique({
            where: { id },
        });

        if (!message) {
            return null;
        }

        return WarRoomMessageMapper.fromDb(message);
    }

    async findAll(): Promise<WarRoomMessage[]> {
        const messages = await prisma.warRoomMessage.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return messages.map(WarRoomMessageMapper.fromDb);
    }

    async findByWarRoomId(warRoomId: string, page: number, limit: number,): Promise<PaginationResult<WarRoomMessage>> {

        const skip = (page - 1) * limit;

        const where = {
            warRoomId,
        };

        const [messages, total] = await Promise.all([
            prisma.warRoomMessage.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.warRoomMessage.count({
                where,
            }),
        ]);

        return {
            items: messages.map(WarRoomMessageMapper.fromDb),

            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async update(id: string, data: Partial<WarRoomMessage>,): Promise<WarRoomMessage> {

        const updatedMessage = await prisma.warRoomMessage.update({
            where: { id },
            data: {
                content: data.content,
            },
        });

        return WarRoomMessageMapper.fromDb(updatedMessage);
    }

    async delete(id: string): Promise<void> {
        await prisma.warRoomMessage.delete({
            where: { id },
        });
    }

}