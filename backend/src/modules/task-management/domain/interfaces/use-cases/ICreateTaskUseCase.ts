import { Task } from "../../entities/task.entity";
import { CreateTaskDto } from "../../../application/dto/createTaskDto";

export interface ICreateTaskUseCase {
    execute(
        dto: CreateTaskDto,
        userId?: string,
        role?: string,
    ): Promise<Task>;
}