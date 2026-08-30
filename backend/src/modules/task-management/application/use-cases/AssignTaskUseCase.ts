import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IAssignTaskUseCase } from "../../domain/interfaces/use-cases/IAssignTaskUseCase";
import { Task } from "../../domain/entities/task.entity";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";
import { NotificationType } from "@/modules/notification/domain/enums/NotificationType";

export class AssignTaskUseCase implements IAssignTaskUseCase {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly incidentRepository: IIncidentRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
        private readonly userRepository: IUserRepository,
        private readonly createNotificationUseCase: ICreateNotificationUseCase,
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

        const assignee = await this.userRepository.findById(assignedTo);
        if (!assignee) {
            throw new AppError("Assignee user not found", HttpStatusCode.NOT_FOUND,);
        }

        if (role === "SUPER_ADMIN" || role === "ORG_ADMIN") {
            const updated = await this.taskRepository.update(
                taskId,
                {
                    assignedTo,
                },
            );

            await this.createTimelineEventUseCase.execute(
                task.incidentId,
                TimelineEventType.TASK_ASSIGNED,
                `Task "${task.title}" was assigned to ${assignee.name}`,
                assignedBy,
            );

            return updated;
        }

        const assigningMember = await this.teamMemberRepository.findMember(incident.assignedTeamId, assignedBy,);

        if (!assigningMember) {
            throw new AppError("You are not a member of the assigned team", HttpStatusCode.FORBIDDEN,);
        }

        if (assigningMember.role !== "LEAD") {
            throw new AppError("Only the team lead can assign tasks", HttpStatusCode.FORBIDDEN,);
        }

        const updated = await this.taskRepository.update(
            taskId,
            {
                assignedTo,
            },
        );

        await this.createTimelineEventUseCase.execute(
            task.incidentId,
            TimelineEventType.TASK_ASSIGNED,
            `Task "${task.title}" was assigned to ${assignee.name}`,
            assignedBy,
        );

        await this.createNotificationUseCase.execute({
            userId: assignedTo,
            type: NotificationType.TASK,
            title: "Task Assigned",
            message: `You have been assigned the task "${task.title}".`,
        });

        return updated;
    }
}