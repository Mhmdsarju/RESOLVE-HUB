import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Task } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IGetTeamTasksUseCase } from "../../domain/interfaces/use-cases/IGetTeamTasksUseCase";

import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";

@injectable()
export class GetTeamTasksUseCase implements IGetTeamTasksUseCase {

    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository,

        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }

    async execute(userId: string): Promise<Task[]> {
        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const teams = await this.teamMemberRepository.findTeamsByUserId(userId,);

        if (teams.length === 0) {
            return [];
        }

        const teamTasks = await Promise.all(
            teams.map((item) => this.taskRepository.findAllByTeam(item.team.id,),),
        );

        return teamTasks.flat();
    }
}