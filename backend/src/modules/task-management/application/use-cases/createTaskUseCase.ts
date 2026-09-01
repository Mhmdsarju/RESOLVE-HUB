import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { Task } from "../../domain/entities/task.entity";
import { CreateTaskDto } from "../dto/createTaskDto";
import { ICreateTaskUseCase } from "../../domain/interfaces/use-cases/ICreateTaskUseCase";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { TaskType } from "../../domain/enums/taskType.enum";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";

export class CreateTaskUseCase  implements ICreateTaskUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly incidentRepository: IIncidentRepository,
    private readonly teamMemberRepository: ITeamMemberRepository,
    private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
  ) { }

  async execute(dto: CreateTaskDto, userId?: string, role?: string,): Promise<Task> {
    const isAutomatic = dto.type === TaskType.AUTOMATIC;

    if (!isAutomatic) {
      if (!userId?.trim()) {
        throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
      }

      if (!role?.trim()) {
        throw new AppError("User role is required", HttpStatusCode.BAD_REQUEST,);
      }

      if (role !== "SUPER_ADMIN" && role !== "ORG_ADMIN" && role !== "ENGINEER") {
        throw new AppError("You are not allowed to create tasks", HttpStatusCode.FORBIDDEN,);
      }
    }

    if (!dto.title?.trim()) {
      throw new AppError("Task title is required", HttpStatusCode.BAD_REQUEST,);
    }

    if (!dto.incidentId?.trim()) {
      throw new AppError("Incident ID is required", HttpStatusCode.BAD_REQUEST,);
    }

    const title = dto.title.trim();

    const incident = await this.incidentRepository.findById(dto.incidentId,);

    if (!incident) {
      throw new AppError("Incident not found", HttpStatusCode.NOT_FOUND,);
    }

    if (!incident.assignedTeamId) {
      throw new AppError("Incident is not assigned to a team", HttpStatusCode.BAD_REQUEST,);
    }

    if (!isAutomatic && role === "ENGINEER") {
      const teamMember = await this.teamMemberRepository.findMember(incident.assignedTeamId, userId!,);

      if (!teamMember) {
        throw new AppError("You are not a member of the assigned team", HttpStatusCode.FORBIDDEN,);
      }

      if (teamMember.role !== "LEAD") {
        throw new AppError("Only the team lead can create tasks", HttpStatusCode.FORBIDDEN,);
      }
    }

    const existingTask = await this.taskRepository.findByTitleAndIncident(title, dto.incidentId,);

    if (existingTask) {
      throw new AppError("A task with this title already exists for this incident", HttpStatusCode.CONFLICT,);
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

    let dueDate: Date | undefined;

    if (dto.dueDate) {
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

    const task = new Task({
      title,
      description: dto.description?.trim(),
      incidentId: dto.incidentId,
      assignedTo: dto.assignedTo,
      type: dto.type,
      priority: dto.priority,
      dueDate,
    });

    const createdTask = await this.taskRepository.create(task);

    await this.createTimelineEventUseCase.execute(
      createdTask.incidentId,
      TimelineEventType.TASK_CREATED,
      `Task "${createdTask.title}" was created`,
      userId ?? null,
    );

    return createdTask;
  }
}