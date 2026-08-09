import { TaskPriority } from "../../domain/enums/taskPriority.enum"; 

export interface CreateTaskDto {
  title: string;
  description?: string;

  incidentId: string;

  assignedTo?: string;

  priority?: TaskPriority;

  dueDate?: Date;
}