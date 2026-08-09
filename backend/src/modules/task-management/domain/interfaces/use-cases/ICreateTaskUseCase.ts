import { Task } from "../../entities/task.entity"; 
import { CreateTaskDto } from "@/modules/task-management/application/dto/createTaskDto"; 

export interface ICreateTaskUseCase {
  execute(dto: CreateTaskDto): Promise<Task>;
}