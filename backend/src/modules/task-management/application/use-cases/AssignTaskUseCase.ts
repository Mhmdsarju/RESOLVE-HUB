import { inject, injectable } from "inversify";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IAssignTaskUseCase } from "../../domain/interfaces/use-cases/IAssignTaskUseCase";

import { Task } from "../../domain/entities/task.entity";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TYPES } from "@/config/types";

@injectable()
export class AssignTaskUseCase implements IAssignTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository)
    private readonly taskRepository: ITaskRepository
  ) {}

  async execute(taskId: string, userId: string): Promise<Task> {
    
    if (!taskId) {
      throw new AppError("Task ID is required", HttpStatusCode.BAD_REQUEST);
    }

    if (!userId) {
      throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST);
    }

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new AppError("Task not found", HttpStatusCode.NOT_FOUND);
    }

    return await this.taskRepository.update(taskId, {
      assignedTo: userId,
    });
  }
}