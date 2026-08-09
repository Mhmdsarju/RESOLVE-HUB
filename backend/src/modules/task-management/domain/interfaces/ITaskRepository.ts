import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Task } from "../entities/task.entity";

import { TaskStatus } from "../enums/taskStatus.enum";
import { TaskPriority } from "../enums/taskPriority.enum";

export interface ITaskRepository extends IBaseRepository<Task> {

    findAllByIncident(incidentId: string): Promise<Task[]>;

    findAllWithFilters(filters?: {
        incidentId?: string;
        assignedTo?: string;
        status?: TaskStatus;
        priority?: TaskPriority;
    }): Promise<Task[]>;

    findAllWithPagination(params: {
        incidentId: string;
        skip: number;
        take: number;
        filters?: {
            assignedTo?: string;
            status?: TaskStatus;
            priority?: TaskPriority;
        };
    }): Promise<{
        data: Task[];
        total: number;
    }>;

    findByIncidentId(incidentId: string): Promise<Task[]>;
}