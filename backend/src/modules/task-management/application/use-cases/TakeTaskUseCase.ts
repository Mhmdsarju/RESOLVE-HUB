import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Task } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { ITakeTaskUseCase } from "../../domain/interfaces/use-cases/ITakeTaskUseCase";

import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";

@injectable()
export class TakeTaskUseCase implements ITakeTaskUseCase {
    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository,

        @inject(TYPES.IncidentRepository)
        private readonly incidentRepository: IIncidentRepository,

        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }

    async execute(taskId: string, userId: string,): Promise<Task> {

        if (!taskId?.trim()) {
            throw new AppError("Task ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new AppError("Task not found", HttpStatusCode.NOT_FOUND,);
        }

        if (task.assignedTo) {
            throw new AppError("Task is already assigned", HttpStatusCode.CONFLICT,);
        }

        const incident = await this.incidentRepository.findById(task.incidentId,);

        if (!incident) {
            throw new AppError("Incident not found", HttpStatusCode.NOT_FOUND,);
        }

        if (!incident.assignedTeamId) {
            throw new AppError("Incident is not assigned to a team", HttpStatusCode.BAD_REQUEST,);
        }

        const teamLead = await this.teamMemberRepository.findTeamLead(incident.assignedTeamId,);

        if (!teamLead) {
            throw new AppError("Team lead not found", HttpStatusCode.NOT_FOUND,);
        }

        if (teamLead.userId !== userId) {
            throw new AppError("Only the assigned team lead can take this task", HttpStatusCode.FORBIDDEN,);
        }

        return await this.taskRepository.update(taskId, { assignedTo: userId, },
        );
    }
}