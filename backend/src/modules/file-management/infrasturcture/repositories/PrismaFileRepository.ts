import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { File } from "../../domain/entity/file.entity"; 
import { IFileRepository } from "../../domain/interface/IFileRepository";
import { FileMapper } from "../mapper/FileMapper"; 

@injectable()
export class PrismaFileRepository implements IFileRepository {

    async create(file: File,): Promise<File> {
        const created = await prisma.file.create({
            data: FileMapper.toDb(file),
        });

        return FileMapper.fromDb(created);
    }

    async findById(id: string,): Promise<File | null> {
        const file = await prisma.file.findUnique({
            where: { id },
        });

        if (!file) {
            return null;
        }

        return FileMapper.fromDb(file);
    }

    async findAll(): Promise<File[]> {
        const files = await prisma.file.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return files.map(FileMapper.fromDb);
    }

    async update(id: string, data: Partial<File>,): Promise<File> {
        const updated = await prisma.file.update({
            where: { id },
            data: FileMapper.toDb({
                ...(data as File),
            }),
        });

        return FileMapper.fromDb(updated);
    }

    async delete(id: string,): Promise<void> {
        await prisma.file.delete({
            where: { id },
        });
    }

    async findByTaskId(taskId: string,): Promise<File[]> {
        const files = await prisma.file.findMany({
            where: {
                taskId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return files.map(FileMapper.fromDb);
    }
}