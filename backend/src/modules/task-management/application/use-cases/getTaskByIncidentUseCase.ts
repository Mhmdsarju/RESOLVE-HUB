import { inject, injectable } from "inversify";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IGetTasksByIncidentUseCase } from "../../domain/interfaces/use-cases/IGetTasksByIncidentUseCase";

import { Task } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { TaskPriority } from "../../domain/enums/taskPriority.enum";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TYPES } from "@/config/types";

@injectable()
export class GetTasksByIncidentUseCase implements IGetTasksByIncidentUseCase {
    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository
    ) { }

    async execute(
        incidentId: string,
        page: number = 1,
        limit: number = 10,
        filters?: {
            assignedTo?: string;
            status?: TaskStatus;
            priority?: TaskPriority;
        }
    ): Promise<{
        data: Task[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {

        if (!incidentId) {
            throw new AppError("Incident ID is required", HttpStatusCode.BAD_REQUEST);
        }

        const safePage = page > 0 ? page : 1;
        const safeLimit = limit > 0 ? limit : 10;

        const skip = (safePage - 1) * safeLimit;
        const take = safeLimit;

        const result = await this.taskRepository.findAllWithPagination({
            incidentId,
            skip,
            take,
            filters,
        });

        return {
            data: result.data,
            total: result.total,
            page: safePage,
            limit: safeLimit,
            totalPages: Math.ceil(result.total / safeLimit),
        };
    }
}