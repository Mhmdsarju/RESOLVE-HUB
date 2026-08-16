import { inject, injectable } from "inversify";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IUpdateTaskStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskStatusUseCase";

import { Task } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enums/taskStatus.enum";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TYPES } from "@/config/types";

import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";

@injectable()
export class UpdateTaskStatusUseCase implements IUpdateTaskStatusUseCase {

    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository,

        @inject(TYPES.IncidentRepository)
        private readonly incidentRepository: IIncidentRepository,

        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }

    async execute(taskId: string, status: TaskStatus, userId: string, role: string,): Promise<Task> {

        if (!taskId?.trim()) {
            throw new AppError("Task ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!status) {
            throw new AppError("Status is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!role?.trim()) {
            throw new AppError("User role is required", HttpStatusCode.BAD_REQUEST,);
        }

        const existingTask = await this.taskRepository.findById(taskId);

        if (!existingTask) {
            throw new AppError("Task not found", HttpStatusCode.NOT_FOUND,);
        }

        if (role === "ORG_ADMIN") {
            return await this.taskRepository.update(
                taskId,
                {
                    status,
                },
            );
        }

        const incident = await this.incidentRepository.findById(existingTask.incidentId,);

        if (!incident) {
            throw new AppError("Incident not found", HttpStatusCode.NOT_FOUND,);
        }

        if (!incident.assignedTeamId) {
            throw new AppError("Incident is not assigned to a team", HttpStatusCode.BAD_REQUEST,);
        }

        if (role === "LEAD") {
            const teamLead = await this.teamMemberRepository.findTeamLead(incident.assignedTeamId,);

            if (!teamLead) {
                throw new AppError("Team lead not found", HttpStatusCode.NOT_FOUND,);
            }

            if (teamLead.userId !== userId) {
                throw new AppError("You are not the lead of this task's team", HttpStatusCode.FORBIDDEN,);
            }

            return await this.taskRepository.update(
                taskId,
                {
                    status,
                },
            );
        }

        if (role === "ENGINEER") {
            if (existingTask.assignedTo !== userId) {
                throw new AppError("You can only update the status of tasks assigned to you", HttpStatusCode.FORBIDDEN,);
            }

            return await this.taskRepository.update(
                taskId,
                {
                    status,
                },
            );
        }

        throw new AppError("You are not allowed to update task status", HttpStatusCode.FORBIDDEN,);
    }
}