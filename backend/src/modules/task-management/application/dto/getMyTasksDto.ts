import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { TaskPriority } from "../../domain/enums/taskPriority.enum";
import { TaskType } from "../../domain/enums/taskType.enum";

export interface GetMyTasksDto {

    page?: number;

    limit?: number;

    status?: TaskStatus;

    priority?: TaskPriority;

    type?: TaskType;

    search?: string;

}