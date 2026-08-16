import { Task } from "../../entities/task.entity";

export interface ITakeTaskUseCase {
    execute(
        taskId: string,
        userId: string,
    ): Promise<Task>;
}