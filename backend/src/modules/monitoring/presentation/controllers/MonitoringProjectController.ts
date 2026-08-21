import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "@/shared/response/response-handler";
import { CreateMonitoringProjectDTO } from "../../application/dto/createMonitoringProjectDto";
import { ICreateMonitoringProjectUseCase } from "../../domain/interfaces/use-cases/ICreateMonitoringProjectUseCase";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { IGetMonitoringProjectsUseCase } from "../../domain/interfaces/use-cases/IGetMonitoringProjectsUseCase";
import { IGetMonitoringProjectByIdUseCase } from "../../domain/interfaces/use-cases/IGetMonitoringProjectByIdUseCase";
import { IUpdateMonitoringProjectUseCase } from "../../domain/interfaces/use-cases/IUpdateMonitoringProjectUseCase";
import { IDeleteMonitoringProjectUseCase } from "../../domain/interfaces/use-cases/IDeleteMonitoringProjectUseCase";

export class MonitoringProjectController extends BaseController {
    constructor(
        private readonly createMonitoringProjectUseCase: ICreateMonitoringProjectUseCase,
        private readonly getMonitoringProjectsUseCase: IGetMonitoringProjectsUseCase,
        private readonly getMonitoringProjectByIdUseCase: IGetMonitoringProjectByIdUseCase,
        private readonly updateMonitoringProjectUseCase: IUpdateMonitoringProjectUseCase,
        private readonly deleteMonitoringProjectUseCase: IDeleteMonitoringProjectUseCase
    ) { super() }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: CreateMonitoringProjectDTO = {
                name: req.body.name,
                description: req.body.description,
                organizationId: user.organizationId,
                createdBy: user.userId,
            };

            const project = await this.createMonitoringProjectUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Monitoring project created successfully",
                project
            );
        } catch (error) {
            next(error);
        }
    }


    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto = {
                organizationId: user.organizationId,
                page: Math.max(1, Number(req.query.page) || 1),
                limit: Math.min(100, Math.max(1, Number(req.query.limit) || 10)),
            };

            const result = await this.getMonitoringProjectsUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Monitoring projects fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const project = await this.getMonitoringProjectByIdUseCase.execute(
                req.params.id,
                user.organizationId
            );

            return ResponseHandler.success(
                res,
                "Monitoring project fetched successfully",
                project
            );

        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto = {
                name: req.body.name,
                description: req.body.description,
            };

            const project = await this.updateMonitoringProjectUseCase.execute(
                req.params.id,
                user.organizationId,
                dto
            );

            return ResponseHandler.success(
                res,
                "Monitoring project updated successfully",
                project
            );

        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            await this.deleteMonitoringProjectUseCase.execute(
                req.params.id,
                user.organizationId
            );

            return ResponseHandler.success(
                res,
                "Monitoring project deleted successfully",
                null
            );

        } catch (error) {
            next(error);
        }
    }

}