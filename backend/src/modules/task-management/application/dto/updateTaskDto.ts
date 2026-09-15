import { TaskStatus } from "../../domain/enums/taskStatus.enum";

export interface UpdateTaskStatusDto {
  taskId: string;
  status: TaskStatus;
}