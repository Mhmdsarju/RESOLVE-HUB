import { GetMyTasksDto } from "@/modules/task-management/application/dto/getMyTasksDto";

import { MyTask } from "../../interfaces/ITaskRepository";

export interface IGetMyTasksUseCase {

    execute(dto:GetMyTasksDto,userId: string): Promise<{
        data: MyTask[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;

}