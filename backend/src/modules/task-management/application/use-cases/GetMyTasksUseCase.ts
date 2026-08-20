import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { ITaskRepository, MyTask } from "../../domain/interfaces/ITaskRepository";
import { IGetMyTasksUseCase } from "../../domain/interfaces/use-cases/IGetMyTasksUseCase";

import { GetMyTasksDto } from "../dto/getMyTasksDto";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class GetMyTasksUseCase implements IGetMyTasksUseCase {
    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository,
    ) { }

    async execute(dto: GetMyTasksDto, userId: string,): Promise<{
        data: MyTask[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const page = dto.page ?? 1;
        const limit = dto.limit ?? 6;

        const skip = (page - 1) * limit;

        const result =
            await this.taskRepository.findAllByAssignedToWithPagination({
                userId,
                skip,
                take: limit,
                filters: {
                    status: dto.status,
                    priority: dto.priority,
                    type: dto.type,
                    search: dto.search,
                },
            });

        return {
            data: result.data,
            total: result.total,
            page,
            limit,
            totalPages: Math.ceil(result.total / limit),
        };
    }
}