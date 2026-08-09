import { Task } from "../../domain/entities/task.entity";

import {
  Task as PrismaTask,
  TaskStatus as PrismaTaskStatus,
  TaskPriority as PrismaTaskPriority,
} from "@prisma/client";

import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { TaskPriority } from "../../domain/enums/taskPriority.enum";

export class TaskMapper {

  static toDb(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description ?? null,

      incidentId: task.incidentId,
      assignedTo: task.assignedTo ?? null,

      status: task.status as PrismaTaskStatus,
      priority: task.priority as PrismaTaskPriority,

      dueDate: task.dueDate ?? null,

      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  static fromDb(data: PrismaTask): Task {
    return new Task({
      id: data.id,
      title: data.title,
      description: data.description ?? undefined,

      incidentId: data.incidentId,
      assignedTo: data.assignedTo ?? undefined,

      status: data.status as TaskStatus,
      priority: data.priority as TaskPriority,

      dueDate: data.dueDate ?? undefined,

      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

}