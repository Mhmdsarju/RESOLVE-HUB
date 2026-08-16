import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreateTaskUseCase } from "../../domain/interfaces/use-cases/ICreateTaskUseCase";
import { IGetTasksByIncidentUseCase } from "../../domain/interfaces/use-cases/IGetTasksByIncidentUseCase";
import { IUpdateTaskStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskStatusUseCase";
import { IAssignTaskUseCase } from "../../domain/interfaces/use-cases/IAssignTaskUseCase";
import { IDeleteTaskUseCase } from "../../domain/interfaces/use-cases/IDeleteTaskUseCase";
import { IUpdateTaskUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskUseCase";
import { IGetMyTasksUseCase } from "../../domain/interfaces/use-cases/IGetMyTasksUseCase";
import { IGetTeamTasksUseCase } from "../../domain/interfaces/use-cases/IGetTeamTasksUseCase";
import { ITakeTaskUseCase } from "../../domain/interfaces/use-cases/ITakeTaskUseCase";

import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { TaskPriority } from "../../domain/enums/taskPriority.enum";

@injectable()
export class TaskController extends BaseController {
    constructor(
        @inject(TYPES.CreateTaskUseCase)
        private readonly createTaskUseCase: ICreateTaskUseCase,

        @inject(TYPES.GetTasksByIncidentUseCase)
        private readonly getTasksByIncidentUseCase: IGetTasksByIncidentUseCase,

        @inject(TYPES.UpdateTaskStatusUseCase)
        private readonly updateTaskStatusUseCase: IUpdateTaskStatusUseCase,

        @inject(TYPES.AssignTaskUseCase)
        private readonly assignTaskUseCase: IAssignTaskUseCase,

        @inject(TYPES.DeleteTaskUseCase)
        private readonly deleteTaskUseCase: IDeleteTaskUseCase,

        @inject(TYPES.UpdateTaskUseCase)
        private readonly updateTaskUseCase: IUpdateTaskUseCase,

        @inject(TYPES.GetMyTasksUseCase)
        private readonly getMyTasksUseCase: IGetMyTasksUseCase,

        @inject(TYPES.GetTeamTasksUseCase)
        private readonly getTeamTasksUseCase: IGetTeamTasksUseCase,
        @inject(TYPES.TakeTaskUseCase)
        private readonly takeTaskUseCase: ITakeTaskUseCase,

    ) {
        super();
    }

    async createTask(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const task = await this.createTaskUseCase.execute(req.body, user.userId, user.role,);

            return ResponseHandler.success(
                res,
                "Task created successfully",
                task,
            );
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const { taskId } = req.params;

            const updatedTask = await this.updateTaskUseCase.execute({
                taskId,
                ...req.body,
                userId: user.userId,
                role: user.role,
            });

            return ResponseHandler.success(res, "Task updated successfully", updatedTask,);
            
        } catch (error) {
            next(error);
        }
    }

    async getTasksByIncident(req: Request, res: Response, next: NextFunction,) {
        try {
            const { incidentId } = req.params;

            const { page = "1", limit = "10", status, priority, assignedTo, search, } = req.query;

            const result = await this.getTasksByIncidentUseCase.execute({
                incidentId,
                page: Number(page),
                limit: Number(limit),
                filters: {
                    status: status as TaskStatus,
                    priority: priority as TaskPriority,
                    assignedTo: assignedTo as string,
                    search: search as string,
                },
            });

            return ResponseHandler.success(
                res,
                "Tasks fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }

    async getMyTasks(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const tasks = await this.getMyTasksUseCase.execute(user.userId,);

            return ResponseHandler.success(
                res,
                "My tasks fetched successfully",
                tasks,
            );
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const { taskId } = req.params;
            const { status } = req.body;

            const updatedTask = await this.updateTaskStatusUseCase.execute(taskId, status, user.userId, user.role,);

            return ResponseHandler.success(
                res,
                "Task status updated successfully",
                updatedTask,
            );
        } catch (error) {
            next(error);
        }
    }

    async assignTask(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const { taskId } = req.params;
            const { userId } = req.body;

            const updatedTask = await this.assignTaskUseCase.execute(taskId, userId, user.userId, user.role,);

            return ResponseHandler.success(
                res,
                "Task assigned successfully",
                updatedTask,
            );
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction,) {
        try {
            const { taskId } = req.params;

            await this.deleteTaskUseCase.execute(taskId);

            return ResponseHandler.success(
                res,
                "Task deleted successfully",
                null,
            );
        } catch (error) {
            next(error);
        }
    }

    async getTeamTasks(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const tasks = await this.getTeamTasksUseCase.execute(user.userId,);

            return ResponseHandler.success(
                res,
                "Team tasks fetched successfully",
                tasks,
            );
        } catch (error) {
            next(error);
        }
    }

    async takeTask(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const { taskId } = req.params;

            const task = await this.takeTaskUseCase.execute(taskId, user.userId,);

            return ResponseHandler.success(
                res,
                "Task taken successfully",
                task,
            );
        } catch (error) {
            next(error);
        }
    }

}