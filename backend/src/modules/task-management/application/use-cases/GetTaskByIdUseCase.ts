import { AppError } from "@/shared/errors/AppError";
import { Task } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IGetTaskByIdUseCase } from "../../domain/interfaces/use-cases/IGetTaskByIdUseCase";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class GetTaskByIdUseCase implements IGetTaskByIdUseCase{
    constructor(
        private readonly taskRepository:ITaskRepository
    ){}

    async execute(taskId: string): Promise<Task> {

        const task=await this.taskRepository.findById(taskId);

        if(!task){
            throw new AppError("Task not Found",HttpStatusCode.NOT_FOUND);
        }

        return task;
        
    }
}