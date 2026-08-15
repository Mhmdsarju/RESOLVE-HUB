import { inject, injectable } from "inversify";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IUpdateTaskStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskStatusUseCase";

import { Task } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enums/taskStatus.enum";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TYPES } from "@/config/types";

@injectable()
export class UpdateTaskStatusUseCase
    implements IUpdateTaskStatusUseCase
{
    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(
        taskId: string,
        status: TaskStatus
    ): Promise<Task> {
        if (!taskId) {
            throw new AppError(
                "Task ID is required",
                HttpStatusCode.BAD_REQUEST
            );
        }

        if (!status) {
            throw new AppError(
                "Status is required",
                HttpStatusCode.BAD_REQUEST
            );
        }

        const existingTask =
            await this.taskRepository.findById(taskId);

        if (!existingTask) {
            throw new AppError(
                "Task not found",
                HttpStatusCode.NOT_FOUND
            );
        }

        return await this.taskRepository.update(taskId, {
            status,
        });
    }
}