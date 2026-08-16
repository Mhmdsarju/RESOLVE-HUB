import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Task } from "../entities/task.entity";

import { TaskStatus } from "../enums/taskStatus.enum";
import { TaskPriority } from "../enums/taskPriority.enum";

export interface MyTask extends Task {
    teamId: string;
    teamRole: "LEAD" | "MEMBER";
}

export interface ITaskRepository extends IBaseRepository<Task> {

    findAllByIncident(incidentId: string,): Promise<Task[]>;

    findAllWithFilters(filters?: {
        incidentId?: string;
        assignedTo?: string;
        status?: TaskStatus;
        priority?: TaskPriority;
        search?: string;
    }): Promise<Task[]>;

    findAllWithPagination(params: {
        incidentId: string;
        skip: number;
        take: number;
        filters?: {
            assignedTo?: string;
            status?: TaskStatus;
            priority?: TaskPriority;
            search?: string;
        };
    }): Promise<{
        data: Task[];
        total: number;
    }>;

    findByIncidentId(incidentId: string,): Promise<Task[]>;

    findByTitleAndIncident(title: string, incidentId: string,): Promise<Task | null>;

    findAllByAssignedTo(userId: string,): Promise<MyTask[]>;

    findAllByTeam(teamId: string,): Promise<Task[]>;
}