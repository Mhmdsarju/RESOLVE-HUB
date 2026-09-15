import { Task } from "../../entities/task.entity";

export interface IAssignTaskUseCase {
    execute(
        taskId: string,
        assignedTo: string,
        assignedBy: string,
        role: string,
    ): Promise<Task>;
}