import { TaskPriority } from "../../domain/enums/taskPriority.enum";
import { TaskType } from "../../domain/enums/taskType.enum";

export interface CreateTaskDto {
    title: string;
    description?: string;

    incidentId: string;

    assignedTo?: string;

    type?: TaskType;

    priority?: TaskPriority;

    dueDate?: Date;
}