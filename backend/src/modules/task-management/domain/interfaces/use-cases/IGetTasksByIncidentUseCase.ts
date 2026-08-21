import { Task } from "../../entities/task.entity";
import { GetTasksByIncidentDto } from "@/modules/task-management/application/dto/getTaskDto";

export interface IGetTasksByIncidentUseCase {
    execute(dto: GetTasksByIncidentDto): Promise<{
        data: Task[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}