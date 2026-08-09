import { inject, injectable } from "inversify";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IDeleteTaskUseCase } from "../../domain/interfaces/use-cases/IDeleteTaskUseCase";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TYPES } from "@/config/types";

@injectable()
export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository)
    private readonly taskRepository: ITaskRepository
  ) {}

  async execute(taskId: string): Promise<void> {

    if (!taskId) {
      throw new AppError("Task ID is required", HttpStatusCode.BAD_REQUEST);
    }

    const existing = await this.taskRepository.findById(taskId);

    if (!existing) {
      throw new AppError("Task not found", HttpStatusCode.NOT_FOUND);
    }

    await this.taskRepository.delete(taskId);
  }
}