import { UpdateTaskDto } from "@/modules/task-management/application/dto/updateTaskkDto";
import { Task } from "../../entities/task.entity";

export interface IUpdateTaskUseCase {
    execute(dto: UpdateTaskDto): Promise<Task>;
}