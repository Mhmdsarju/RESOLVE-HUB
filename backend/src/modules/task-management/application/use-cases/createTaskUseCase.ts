import { inject, injectable } from "inversify";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { Task } from "../../domain/entities/task.entity";

import { CreateTaskDto } from "../dto/createTaskDto"; 
import { ICreateTaskUseCase } from "../../domain/interfaces/use-cases/ICreateTaskUseCase"; 

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TYPES } from "@/config/types";

@injectable()
export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    @inject(TYPES.TaskRepository)
    private readonly taskRepository: ITaskRepository
  ) {}

  async execute(dto: CreateTaskDto): Promise<Task> {

    
    if (!dto.title) {
      throw new AppError("Task title is required", HttpStatusCode.BAD_REQUEST);
    }

    if (!dto.incidentId) {
      throw new AppError("Incident ID is required", HttpStatusCode.BAD_REQUEST);
    }

    const task = new Task({
      title: dto.title,
      description: dto.description,

      incidentId: dto.incidentId,
      assignedTo: dto.assignedTo,

      priority: dto.priority,
      dueDate: dto.dueDate,
    });

    return await this.taskRepository.create(task);
  }
}