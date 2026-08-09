import { Task } from "../../entities/task.entity";
import { TaskStatus } from "../../enums/taskStatus.enum";
import { TaskPriority } from "../../enums/taskPriority.enum";

export interface IGetTasksByIncidentUseCase {
  execute(
    incidentId: string,
    page: number,
    limit: number,
    filters?: {
      assignedTo?: string;
      status?: TaskStatus;
      priority?: TaskPriority;
    }
  ): Promise<{
    data: Task[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}