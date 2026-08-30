import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IUpdateTaskStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskStatusUseCase";
import { Task } from "../../domain/entities/task.entity";
import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";
import { NotificationType } from "@/modules/notification/domain/enums/NotificationType";

export class UpdateTaskStatusUseCase implements IUpdateTaskStatusUseCase {
    constructor(
        private readonly taskRepository: ITaskRepository,
        private readonly incidentRepository: IIncidentRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
        private readonly createNotificationUseCase: ICreateNotificationUseCase,
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
            const updated = await this.taskRepository.update(
                taskId,
                {
                    status,
                },
            );

            await this.createTimelineEventUseCase.execute(
                existingTask.incidentId,
                status === TaskStatus.DONE
                    ? TimelineEventType.TASK_COMPLETED
                    : TimelineEventType.TASK_STATUS_CHANGED,
                status === TaskStatus.DONE
                    ? `Task "${existingTask.title}" was completed`
                    : `Task "${existingTask.title}" status changed from ${existingTask.status} to ${status}`,
                userId,
            );

            return updated;
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

            const updated = await this.taskRepository.update(
                taskId,
                {
                    status,
                },
            );

            await this.createTimelineEventUseCase.execute(
                existingTask.incidentId,
                status === TaskStatus.DONE
                    ? TimelineEventType.TASK_COMPLETED
                    : TimelineEventType.TASK_STATUS_CHANGED,
                status === TaskStatus.DONE
                    ? `Task "${existingTask.title}" was completed`
                    : `Task "${existingTask.title}" status changed from ${existingTask.status} to ${status}`,
                userId,
            );

            return updated;
        }

        if (role === "ENGINEER") {
            if (existingTask.assignedTo !== userId) {
                throw new AppError("You can only update the status of tasks assigned to you", HttpStatusCode.FORBIDDEN,);
            }

            const updated = await this.taskRepository.update(
                taskId,
                {
                    status,
                },
            );

            await this.createTimelineEventUseCase.execute(
                existingTask.incidentId,
                status === TaskStatus.DONE
                    ? TimelineEventType.TASK_COMPLETED
                    : TimelineEventType.TASK_STATUS_CHANGED,
                status === TaskStatus.DONE
                    ? `Task "${existingTask.title}" was completed`
                    : `Task "${existingTask.title}" status changed from ${existingTask.status} to ${status}`,
                userId,
            );

            if (existingTask.assignedTo && existingTask.assignedTo !== userId) {
                await this.createNotificationUseCase.execute({
                    userId: existingTask.assignedTo,
                    type: NotificationType.TASK,
                    title: status === TaskStatus.DONE
                        ? "Task Completed"
                        : "Task Status Updated",
                    message: status === TaskStatus.DONE
                        ? `Task "${existingTask.title}" was completed.`
                        : `Task "${existingTask.title}" status changed from ${existingTask.status} to ${status}.`,
                });
            }

            return updated;
        }

        throw new AppError("You are not allowed to update task status", HttpStatusCode.FORBIDDEN,);
    }
}