import { Task } from "../../entities/task.entity";

export interface IGetTeamTasksUseCase {
    execute(userId: string): Promise<Task[]>;
}