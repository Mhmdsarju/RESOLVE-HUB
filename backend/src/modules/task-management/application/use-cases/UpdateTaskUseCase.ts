import { inject, injectable } from "inversify";

import { IUpdateTaskUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskUseCase";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";

import { TYPES } from "@/config/types";
import { UpdateTaskDto } from "../dto/updateTaskkDto";
import { Task } from "../../domain/entities/task.entity";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class UpdateTaskUseCase implements IUpdateTaskUseCase {
    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(
        taskId: string,
        dto: UpdateTaskDto
    ): Promise<Task> {
        if (!taskId) {
            throw new AppError(
                "Task ID is required",
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
            title: dto.title,
            description: dto.description,
            assignedTo: dto.assignedTo,
            status: dto.status,
            priority: dto.priority,
            dueDate: dto.dueDate,
            updatedAt: new Date(),
        });
    }
}