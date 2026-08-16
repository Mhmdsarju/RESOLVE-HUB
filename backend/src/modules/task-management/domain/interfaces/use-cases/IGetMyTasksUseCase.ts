import { Task } from "../../entities/task.entity";

export interface IGetMyTasksUseCase {
    execute(userId: string): Promise<Task[]>;
}