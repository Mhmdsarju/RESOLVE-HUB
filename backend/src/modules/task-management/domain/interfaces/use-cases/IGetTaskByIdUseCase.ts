import { Task } from "../../entities/task.entity";

export interface IGetTaskByIdUseCase {
    execute(taskId: string): Promise<Task>;
}