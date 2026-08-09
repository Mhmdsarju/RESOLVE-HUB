import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { ICreateTaskUseCase } from "../../domain/interfaces/use-cases/ICreateTaskUseCase";
import { ResponseHandler } from "@/shared/response/response-handler";
import { IGetTasksByIncidentUseCase } from "../../domain/interfaces/use-cases/IGetTasksByIncidentUseCase";
import { TYPES } from "@/config/types";
import { IUpdateTaskStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskStatusUseCase";
import { IAssignTaskUseCase } from "../../domain/interfaces/use-cases/IAssignTaskUseCase";
import { IDeleteTaskUseCase } from "../../domain/interfaces/use-cases/IDeleteTaskUseCase";
import { TaskStatus } from "../../domain/enums/taskStatus.enum";
import { TaskPriority } from "../../domain/enums/taskPriority.enum";
import { IUpdateTaskUseCase } from "../../domain/interfaces/use-cases/IUpdateTaskUseCase";

@injectable()
export class TaskController {
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
        private readonly updateTaskUseCase:IUpdateTaskUseCase
    ) { }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await this.createTaskUseCase.execute(req.body);

            return ResponseHandler.success(
                res,
                "Task created successfully",
                task
            );
        } catch (error) {
            next(error);
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.params;

            const updatedTask = await this.updateTaskUseCase.execute(
                taskId,
                req.body
            );

            return ResponseHandler.success(
                res,
                "Task updated successfully",
                updatedTask
            );
        } catch (error) {
            next(error);
        }
    }

    async getTasksByIncident(req: Request, res: Response, next: NextFunction) {
        try {
            const { incidentId } = req.params;

            const {
                page = "1",
                limit = "10",
                status,
                priority,
                assignedTo,
            } = req.query;

            const result = await this.getTasksByIncidentUseCase.execute(
                incidentId,
                Number(page),
                Number(limit),
                {
                    status: status as TaskStatus,
                    priority: priority as TaskPriority,
                    assignedTo: assignedTo as string,
                }
            );

            return ResponseHandler.success(
                res,
                "Tasks fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.params;
            const { status } = req.body;

            const updatedTask =
                await this.updateTaskStatusUseCase.execute(taskId, status);

            return ResponseHandler.success(
                res,
                "Task status updated successfully",
                updatedTask
            );
        } catch (error) {
            next(error);
        }
    }

    async assignTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.params;
            const { userId } = req.body;

            const updatedTask =
                await this.assignTaskUseCase.execute(taskId, userId);

            return ResponseHandler.success(
                res,
                "Task assigned successfully",
                updatedTask
            );
        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.params;

            await this.deleteTaskUseCase.execute(taskId);

            return ResponseHandler.success(
                res,
                "Task deleted successfully",
                null
            );
        } catch (error) {
            next(error);
        }
    }

}