import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IAssignTaskUseCase } from "../../domain/interfaces/use-cases/IAssignTaskUseCase";

import { Task } from "../../domain/entities/task.entity";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";

@injectable()
export class AssignTaskUseCase
    implements IAssignTaskUseCase {
    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskRepository: ITaskRepository,

        @inject(TYPES.IncidentRepository)
        private readonly incidentRepository: IIncidentRepository,

        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }

    async execute(taskId: string, assignedTo: string, assignedBy: string, role: string,): Promise<Task> {
        if (!taskId?.trim()) {
            throw new AppError("Task ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!assignedTo?.trim()) {
            throw new AppError("Assignee user ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!assignedBy?.trim()) {
            throw new AppError("Assigning user ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!role?.trim()) {
            throw new AppError("User role is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (role !== "SUPER_ADMIN" && role !== "ORG_ADMIN" && role !== "ENGINEER") {
            throw new AppError("You are not allowed to assign tasks", HttpStatusCode.FORBIDDEN,);
        }

        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            throw new AppError("Task not found", HttpStatusCode.NOT_FOUND,);
        }

        const incident = await this.incidentRepository.findById(task.incidentId,);

        if (!incident) {
            throw new AppError("Incident not found", HttpStatusCode.NOT_FOUND,);
        }

        if (!incident.assignedTeamId) {
            throw new AppError("Incident is not assigned to a team", HttpStatusCode.BAD_REQUEST,);
        }

        const targetMember = await this.teamMemberRepository.findMember(incident.assignedTeamId, assignedTo,);

        if (!targetMember) {
            throw new AppError("The selected user is not a member of this team", HttpStatusCode.BAD_REQUEST,);
        }

        if (role === "SUPER_ADMIN" || role === "ORG_ADMIN") {
            return await this.taskRepository.update(
                taskId,
                {
                    assignedTo,
                },
            );
        }

        const assigningMember = await this.teamMemberRepository.findMember(incident.assignedTeamId, assignedBy,);

        if (!assigningMember) {
            throw new AppError("You are not a member of the assigned team", HttpStatusCode.FORBIDDEN,);
        }

        if (assigningMember.role !== "LEAD") {
            throw new AppError("Only the team lead can assign tasks", HttpStatusCode.FORBIDDEN,);
        }

        return await this.taskRepository.update(
            taskId,
            {
                assignedTo,
            },
        );
    }
}