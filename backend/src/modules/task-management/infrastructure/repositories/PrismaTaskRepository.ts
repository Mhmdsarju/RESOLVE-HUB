import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { ITaskRepository, MyTask, } from "../../domain/interfaces/ITaskRepository";

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
            where: {
                id,
            },
        });

        if (!data) {
            return null;
        }

        return TaskMapper.fromDb(data);
    }

    async findAll(): Promise<Task[]> {
        const data = await prisma.task.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return data.map(TaskMapper.fromDb);
    }

    async findAllByAssignedTo(userId: string,): Promise<MyTask[]> {
        const data = await prisma.task.findMany({
            where: {
                assignedTo: userId,
            },
            include: {
                incident: {
                    select: {
                        assignedTeamId: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        if (data.length === 0) {
            return [];
        }

        const teamIds = [
            ...new Set(data.map((task) => task.incident.assignedTeamId,).filter((teamId,): teamId is string => Boolean(teamId),),),
        ];

        if (teamIds.length === 0) {
            return data.map((task) => ({
                ...TaskMapper.fromDb(task),
                teamId: "",
                teamRole: "MEMBER" as const,
            }));
        }

        const teamMembers =
            await prisma.teamMember.findMany({
                where: {
                    teamId: {
                        in: teamIds,
                    },
                    userId,
                },
                select: {
                    teamId: true,
                    role: true,
                },
            });

        const teamRoleMap = new Map<string, "LEAD" | "MEMBER">();

        for (const member of teamMembers) {
            teamRoleMap.set(
                member.teamId,
                member.role,
            );
        }

        return data.map((task) => {
            const mappedTask = TaskMapper.fromDb(task);

            const teamId = task.incident.assignedTeamId ?? "";

            return {
                ...mappedTask,
                teamId,
                teamRole:
                    teamRoleMap.get(teamId) ??
                    "MEMBER",
            };
        });
    }

    async findAllByTeam(teamId: string,): Promise<Task[]> {
        const data = await prisma.task.findMany({
            where: {
                incident: {
                    assignedTeamId: teamId,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return data.map(TaskMapper.fromDb);
    }

    async findAllByIncident(incidentId: string,): Promise<Task[]> {
        const data = await prisma.task.findMany({
            where: {
                incidentId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return data.map(TaskMapper.fromDb);
    }

    async findAllWithFilters(filters?: {
        incidentId?: string;
        assignedTo?: string;
        status?: TaskStatus;
        priority?: TaskPriority;
        search?: string;
    }): Promise<Task[]> {
        const search = filters?.search?.trim();

        const data = await prisma.task.findMany({
            where: {
                incidentId: filters?.incidentId,
                assignedTo: filters?.assignedTo,
                status: filters?.status,
                priority: filters?.priority,

                ...(search
                    ? {
                        OR: [
                            {
                                title: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                            {
                                description: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        ],
                    }
                    : {}),
            },
            orderBy: {
                createdAt: "desc",
            },
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
            search?: string;
        };
    }): Promise<{ data: Task[]; total: number; }> {
        const search = params.filters?.search?.trim();

        const where = {
            incidentId: params.incidentId,
            assignedTo: params.filters?.assignedTo,
            status: params.filters?.status,
            priority: params.filters?.priority,

            ...(search
                ? {
                    OR: [
                        {
                            title: {
                                contains: search,
                                mode: "insensitive" as const,
                            },
                        },
                        {
                            description: {
                                contains: search,
                                mode: "insensitive" as const,
                            },
                        },
                    ],
                }
                : {}),
        };

        const [data, total] = await Promise.all([
            prisma.task.findMany({
                where,
                skip: params.skip,
                take: params.take,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.task.count({
                where,
            }),
        ]);

        return { data: data.map(TaskMapper.fromDb), total, };
    }

    async update(id: string, data: Partial<Task>,): Promise<Task> {
        const updated = await prisma.task.update({
            where: { id, },
            data: { ...data, },
        });

        return TaskMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({
            where: { id, },
        });
    }

    async findByIncidentId(incidentId: string,): Promise<Task[]> {
        const data = await prisma.task.findMany({
            where: {
                incidentId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return data.map(TaskMapper.fromDb);
    }

    async findByTitleAndIncident(title: string, incidentId: string,): Promise<Task | null> {
        const data = await prisma.task.findFirst({
            where: {
                incidentId,
                title: {
                    equals: title,
                    mode: "insensitive",
                },
            },
        });

        if (!data) {
            return null;
        }

        return TaskMapper.fromDb(data);
    }
}