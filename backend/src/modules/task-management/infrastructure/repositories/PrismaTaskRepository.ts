import { injectable } from "inversify";
import { prisma } from "@/config/database";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { Task } from "../../domain/entities/task.entity";
import { TaskMapper } from "../mappers/TaskMapper";

import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { TaskPriority } from "../../domain/enums/taskPriority.enum";

@injectable()
export class PrismaTaskRepository implements ITaskRepository {

    async create(task: Task): Promise<Task> {
        const created = await prisma.task.create({
            data: TaskMapper.toDb(task),
        });

        return TaskMapper.fromDb(created);
    }

    async findById(id: string): Promise<Task | null> {
        const data = await prisma.task.findUnique({
            where: { id },
        });

        if (!data) return null;

        return TaskMapper.fromDb(data);
    }

    async findAll(): Promise<Task[]> {
        const data = await prisma.task.findMany({
            orderBy: { createdAt: "desc" },
        });

        return data.map(TaskMapper.fromDb);
    }

    async findAllByIncident(incidentId: string): Promise<Task[]> {
        const data = await prisma.task.findMany({
            where: { incidentId },
            orderBy: { createdAt: "desc" },
        });

        return data.map(TaskMapper.fromDb);
    }

    async findAllWithFilters(filters?: {
        incidentId?: string;
        assignedTo?: string;
        status?: TaskStatus;
        priority?: TaskPriority;
    }): Promise<Task[]> {

        const data = await prisma.task.findMany({
            where: {
                incidentId: filters?.incidentId,
                assignedTo: filters?.assignedTo,
                status: filters?.status,
                priority: filters?.priority,
            },
            orderBy: { createdAt: "desc" },
        });

        return data.map(TaskMapper.fromDb);
    }

    async findAllWithPagination(params: {
        incidentId: string;
        skip: number;
        take: number;
        filters?: {
            assignedTo?: string;
            status?: TaskStatus;
            priority?: TaskPriority;
        };
    }): Promise<{ data: Task[]; total: number }> {

        const where = {
            incidentId: params.incidentId,
            assignedTo: params.filters?.assignedTo,
            status: params.filters?.status,
            priority: params.filters?.priority,
        };

        const [data, total] = await Promise.all([
            prisma.task.findMany({
                where,
                skip: params.skip,
                take: params.take,
                orderBy: { createdAt: "desc" },
            }),
            prisma.task.count({ where }),
        ]);

        return {
            data: data.map(TaskMapper.fromDb),
            total,
        };
    }

    async update(id: string, data: Partial<Task>): Promise<Task> {
        const updated = await prisma.task.update({
            where: { id },
            data: {
                ...data,
            },
        });

        return TaskMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({
            where: { id },
        });
    }

    async findByIncidentId(incidentId: string): Promise<Task[]> {
        const data = await prisma.task.findMany({
            where: { incidentId },
            orderBy: { createdAt: "desc" },
        });

        return data.map(TaskMapper.fromDb);
    }

}