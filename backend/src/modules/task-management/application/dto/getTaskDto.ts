import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { TaskPriority } from "../../domain/enums/taskPriority.enum";

export interface GetTasksByIncidentDto {
    incidentId: string;
    page?: number;
    limit?: number;
    filters?: {
        assignedTo?: string;
        status?: TaskStatus;
        priority?: TaskPriority;
        search?: string;
    };
}