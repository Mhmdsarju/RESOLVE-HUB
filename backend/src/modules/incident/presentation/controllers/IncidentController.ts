import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreateIncidentUseCase } from "../../domain/interfaces/use-cases/ICreateIncidentUseCase";
import { CreateIncidentDto } from "../../application/dto/createIncidentDto";
import { IUpdateIncidentStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateIncidentStatusUseCase";
import { IAssignTeamUseCase } from "../../domain/interfaces/use-cases/IAssignTeamUseCase";
import { IGetIncidentByIdUseCase } from "../../domain/interfaces/use-cases/IGetIncidentByIdUseCase";
import { IGetIncidentsUseCase } from "../../domain/interfaces/use-cases/IGetIncidentsUseCase";

import { Status } from "../../domain/enums/status.enum";
import { Priority } from "../../domain/enums/priority.enum";
import { Severity } from "../../domain/enums/severity.enum";
import { IGetIncidentStatsUseCase } from "../../domain/interfaces/use-cases/IGetIncidentStatsUseCase";

export class IncidentController extends BaseController {
    constructor(
        private readonly createIncidentUseCase: ICreateIncidentUseCase,
        private readonly updateIncidentStatusUseCase: IUpdateIncidentStatusUseCase,
        private readonly assignTeamUseCase: IAssignTeamUseCase,
        private readonly getIncidentByIdUseCase: IGetIncidentByIdUseCase,
        private readonly getIncidentsUseCase: IGetIncidentsUseCase,
        private readonly getIncidentStatsUseCase: IGetIncidentStatsUseCase
    ) {
        super();
    }

    async createIncident(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const dto: CreateIncidentDto = {
                title: req.body.title,
                description: req.body.description,
                severity: req.body.severity,
                priority: req.body.priority,
                type: req.body.type,
                assignedTeamId: req.body.assignedTeamId,
                monitoringProjectId: req.body.monitoringProjectId,
            };

            const incident = await this.createIncidentUseCase.execute(
                dto,
                currentUser.userId,
                currentUser.organizationId
            );

            return ResponseHandler.success(
                res,
                "Incident created successfully",
                incident
            );
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {

        try {

            const currentUser=this.getCurrentUser(req);

            const dto = {
                status: req.body.status
            }

            const incident = await this.updateIncidentStatusUseCase.execute(req.params.id, dto,currentUser.userId)

            return ResponseHandler.success(
                res, "Incident status updated Successfully", incident
            )

        } catch (error) {
            next(error);
        }

    }

    async assignTeam(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser=this.getCurrentUser(req);

            const dto = {
                teamId: req.body.teamId,
            };

            const incident = await this.assignTeamUseCase.execute(
                req.params.id,
                dto,
                currentUser.userId
            );

            return ResponseHandler.success(
                res,
                "Team assigned successfully",
                incident
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            this.getCurrentUser(req);

            const incident = await this.getIncidentByIdUseCase.execute(
                req.params.id
            );

            return ResponseHandler.success(
                res,
                "Incident fetched successfully",
                incident
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const dto = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                status: req.query.status as Status | undefined,
                priority: req.query.priority as Priority | undefined,
                severity: req.query.severity as Severity | undefined,
                assignedTeamId: req.query.assignedTeamId as string | undefined,
            };

            const result = await this.getIncidentsUseCase.execute(
                dto,
                currentUser.organizationId
            );

            return ResponseHandler.success(
                res,
                "Incidents fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const stats = await this.getIncidentStatsUseCase.execute(
                currentUser.organizationId
            );

            return ResponseHandler.success(
                res,
                "Incident stats fetched successfully",
                stats
            );
        } catch (error) {
            next(error);
        }
    }


}