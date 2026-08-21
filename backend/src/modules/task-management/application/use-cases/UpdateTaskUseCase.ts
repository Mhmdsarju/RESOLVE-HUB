import { IUpdateTaskUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskUseCase";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { UpdateTaskDto } from "../dto/updateTaskkDto";
import { Task } from "../../domain/entities/task.entity";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";

export class UpdateTaskUseCase implements IUpdateTaskUseCase {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly incidentRepository: IIncidentRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }

    async execute(dto: UpdateTaskDto): Promise<Task> {
        if (!dto.taskId?.trim()) {
            throw new AppError(
                "Task ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (!dto.userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.role?.trim()) {
            throw new AppError("User role is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.role !== "SUPER_ADMIN" && dto.role !== "ORG_ADMIN" && dto.role !== "ENGINEER") {
            throw new AppError("You are not allowed to update tasks", HttpStatusCode.FORBIDDEN,);
        }

        const existingTask = await this.taskRepository.findById(dto.taskId);

        if (!existingTask) {
            throw new AppError("Task not found", HttpStatusCode.NOT_FOUND,);
        }

        const incident = await this.incidentRepository.findById(existingTask.incidentId,);

        if (!incident) {
            throw new AppError("Incident not found", HttpStatusCode.NOT_FOUND,);
        }

        if (!incident.assignedTeamId) {
            throw new AppError("Incident is not assigned to a team", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.role === "ENGINEER") {
            const teamMember = await this.teamMemberRepository.findMember(incident.assignedTeamId, dto.userId,);

            if (!teamMember) {
                throw new AppError("You are not a member of the assigned team", HttpStatusCode.FORBIDDEN,);
            }

            if (teamMember.role !== "LEAD") {
                throw new AppError("Only the team lead can update tasks", HttpStatusCode.FORBIDDEN,);
            }
        }

        const title = dto.title?.trim();

        if (dto.title !== undefined && !title) {
            throw new AppError("Task title cannot be empty", HttpStatusCode.BAD_REQUEST,);
        }

        if (title && title.toLowerCase() !== existingTask.title.toLowerCase()) {
            const duplicateTask = await this.taskRepository.findByTitleAndIncident(title, existingTask.incidentId,);

            if (duplicateTask && duplicateTask.id !== existingTask.id) {
                throw new AppError("A task with this title already exists for this incident", HttpStatusCode.CONFLICT,);
            }
        }

        let dueDate: Date | undefined;

        if (dto.dueDate !== undefined) {
            dueDate = new Date(dto.dueDate);

            if (Number.isNaN(dueDate.getTime())) {
                throw new AppError("Invalid due date", HttpStatusCode.BAD_REQUEST,);
            }

            const today = new Date();

            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);

            if (dueDate < today) {
                throw new AppError("Due date cannot be in the past", HttpStatusCode.BAD_REQUEST,);
            }
        }

        if (dto.assignedTo !== undefined) {
            if (!dto.assignedTo.trim()) {
                throw new AppError("Assignee user ID cannot be empty", HttpStatusCode.BAD_REQUEST,);
            }

            const targetMember = await this.teamMemberRepository.findMember(incident.assignedTeamId, dto.assignedTo,);

            if (!targetMember) {
                throw new AppError("The selected user is not a member of this team", HttpStatusCode.BAD_REQUEST,);
            }
        }

        return await this.taskRepository.update(
            dto.taskId,
            {
                ...(dto.title !== undefined && {
                    title,
                }),

                ...(dto.description !== undefined && {
                    description:
                        dto.description?.trim(),
                }),

                ...(dto.assignedTo !== undefined && {
                    assignedTo: dto.assignedTo,
                }),

                ...(dto.status !== undefined && {
                    status: dto.status,
                }),

                ...(dto.priority !== undefined && {
                    priority: dto.priority,
                }),

                ...(dto.dueDate !== undefined && {
                    dueDate,
                }),

                updatedAt: new Date(),
            },
        );
    }
}