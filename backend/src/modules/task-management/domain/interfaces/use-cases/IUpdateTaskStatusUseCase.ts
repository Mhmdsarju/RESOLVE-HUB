import { Task } from "../../entities/task.entity";
import { TaskStatus } from "../../enums/taskStatus.enum";

export interface IUpdateTaskStatusUseCase {
    execute(
        taskId: string,
        status: TaskStatus,
        userId: string,
        role: string,
    ): Promise<Task>;
}