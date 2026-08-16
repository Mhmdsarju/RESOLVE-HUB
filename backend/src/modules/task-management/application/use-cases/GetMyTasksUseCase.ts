import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { ITaskRepository, MyTask } from "../../domain/interfaces/ITaskRepository";
import { IGetMyTasksUseCase } from "../../domain/interfaces/use-cases/IGetMyTasksUseCase";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class GetMyTasksUseCase implements IGetMyTasksUseCase {
    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository,
    ) { }

    async execute(userId: string): Promise<MyTask[]> {
        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        return await this.taskRepository.findAllByAssignedTo(userId,);
    }
}