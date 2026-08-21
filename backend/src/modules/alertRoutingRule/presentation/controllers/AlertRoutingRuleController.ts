import { Request, Response, NextFunction } from "express";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { CreateAlertRoutingRuleDto } from "../../application/dto/CreateAlertRoutingRuleDto";
import { UpdateAlertRoutingRuleDto } from "../../application/dto/UpdateAlertRoutingRuleDto";

import { ICreateAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/ICreateAlertRoutingRuleUseCase";
import { IGetAlertRoutingRulesUseCase } from "../../domain/interfaces/use-case/IGetAlertRoutingRulesUseCase";
import { IGetAlertRoutingRuleByIdUseCase } from "../../domain/interfaces/use-case/IGetAlertRoutingRuleByIdUseCase";
import { IUpdateAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/IUpdateAlertRoutingRuleUseCase";
import { IDeleteAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/IDeleteAlertRoutingRuleUseCase";

export class AlertRoutingRuleController extends BaseController {
    constructor(
        private readonly createAlertRoutingRuleUseCase: ICreateAlertRoutingRuleUseCase,
        private readonly getAlertRoutingRulesUseCase: IGetAlertRoutingRulesUseCase,
        private readonly getAlertRoutingRuleByIdUseCase: IGetAlertRoutingRuleByIdUseCase,
        private readonly updateAlertRoutingRuleUseCase: IUpdateAlertRoutingRuleUseCase,
        private readonly deleteAlertRoutingRuleUseCase: IDeleteAlertRoutingRuleUseCase,
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const dto: CreateAlertRoutingRuleDto = {
                name: req.body.name,
                monitoringProjectId: req.body.monitoringProjectId,
                alertRuleId: req.body.alertRuleId,
                teamId: req.body.teamId,
                priority: req.body.priority,
            };

            const rule = await this.createAlertRoutingRuleUseCase.execute(dto, user.organizationId, user.userId,);

            return ResponseHandler.success(
                res,
                "Alert routing rule created successfully",
                rule,
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            const rules = await this.getAlertRoutingRulesUseCase.execute(user.organizationId,);

            return ResponseHandler.success(
                res,
                "Alert routing rules fetched successfully",
                rules,
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction,) {
        try {
            this.getCurrentUser(req);

            const rule = await this.getAlertRoutingRuleByIdUseCase.execute(req.params.id,);

            return ResponseHandler.success(
                res,
                "Alert routing rule fetched successfully",
                rule,
            );
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction,) {
        try {
            this.getCurrentUser(req);

            const dto: UpdateAlertRoutingRuleDto = {
                name: req.body.name,
                monitoringProjectId: req.body.monitoringProjectId,
                alertRuleId: req.body.alertRuleId,
                teamId: req.body.teamId,
                priority: req.body.priority,
                isActive: req.body.isActive,
            };

            const rule = await this.updateAlertRoutingRuleUseCase.execute(req.params.id, dto,);

            return ResponseHandler.success(
                res,
                "Alert routing rule updated successfully",
                rule,
            );
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction,) {
        try {
            this.getCurrentUser(req);

            await this.deleteAlertRoutingRuleUseCase.execute(req.params.id,);

            return ResponseHandler.success(
                res,
                "Alert routing rule deleted successfully",
                null,
            );
        } catch (error) {
            next(error);
        }
    }
}