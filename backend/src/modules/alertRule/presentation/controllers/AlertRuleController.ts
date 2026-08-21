import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "@/shared/response/response-handler";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { CreateAlertRuleDTO } from "../../application/dto/createAlertRuleDto";
import { GetAlertRulesDTO } from "../../application/dto/getAlertRulesDto";
import { UpdateAlertRuleDTO } from "../../application/dto/updateAlertRuleDto";
import { ApplyDefaultAlertRuleDTO } from "../../application/dto/applyDefaultAlertRuleDto";

import { ICreateAlertRuleUseCase } from "../../domain/interfaces/use-case/ICreateAlertRuleUseCase";
import { IGetAlertRulesUseCase } from "../../domain/interfaces/use-case/IGetAlertRulesUseCase";
import { IGetAlertRuleByIdUseCase } from "../../domain/interfaces/use-case/IGetAlertRuleByIdUseCase";
import { IUpdateAlertRuleUseCase } from "../../domain/interfaces/use-case/IUpdateAlertRuleUseCase";
import { IDeleteAlertRuleUseCase } from "../../domain/interfaces/use-case/IDeleteAlertRuleUseCase";
import { IGetDefaultAlertRulesUseCase } from "../../domain/interfaces/use-case/IGetDefaultAlertRulesUseCase";
import { IApplyDefaultAlertRuleUseCase } from "../../domain/interfaces/use-case/IApplyDefaultAlertRuleUseCase";

export class AlertRuleController extends BaseController {
    constructor(
        private readonly createAlertRuleUseCase: ICreateAlertRuleUseCase,
        private readonly getAlertRulesUseCase: IGetAlertRulesUseCase,
        private readonly getAlertRuleByIdUseCase: IGetAlertRuleByIdUseCase,
        private readonly updateAlertRuleUseCase: IUpdateAlertRuleUseCase,
        private readonly deleteAlertRuleUseCase: IDeleteAlertRuleUseCase,
        private readonly getDefaultAlertRulesUseCase: IGetDefaultAlertRulesUseCase,
        private readonly applyDefaultAlertRuleUseCase: IApplyDefaultAlertRuleUseCase
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: CreateAlertRuleDTO = {
                monitoringProjectId: req.params.projectId,
                organizationId: user.organizationId,
                name: req.body.name,
                metric: req.body.metric,
                operator: req.body.operator,
                threshold: req.body.threshold,
                severity: req.body.severity,
                priority: req.body.priority,
                autoCreateIncident: req.body.autoCreateIncident,
            };

            const alertRule = await this.createAlertRuleUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Alert rule created successfully",
                alertRule
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const page = Math.max(1, Number(req.query.page) || 1);

            const limit = Math.min(
                100,
                Math.max(
                    1,
                    Number(req.query.limit) || 10
                )
            );

            const dto: GetAlertRulesDTO = {
                monitoringProjectId: req.params.projectId,
                organizationId: user.organizationId,
                page,
                limit,
            };

            const result = await this.getAlertRulesUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Alert rules fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const alertRule = await this.getAlertRuleByIdUseCase.execute(
                req.params.id,
                user.organizationId
            );

            return ResponseHandler.success(
                res,
                "Alert rule fetched successfully",
                alertRule
            );
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: UpdateAlertRuleDTO = {
                name: req.body.name,
                metric: req.body.metric,
                operator: req.body.operator,
                threshold: req.body.threshold,
                severity: req.body.severity,
                priority: req.body.priority,
                autoCreateIncident: req.body.autoCreateIncident,
                isActive: req.body.isActive,
            };

            const alertRule = await this.updateAlertRuleUseCase.execute(
                req.params.id,
                user.organizationId,
                dto
            );

            return ResponseHandler.success(
                res,
                "Alert rule updated successfully",
                alertRule
            );
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            await this.deleteAlertRuleUseCase.execute(
                req.params.id,
                user.organizationId
            );

            return ResponseHandler.success(
                res,
                "Alert rule deleted successfully",
                null
            );
        } catch (error) {
            next(error);
        }
    }

    async getDefaults(req: Request, res: Response, next: NextFunction) {
        try {
            this.getCurrentUser(req);

            const rules = await this.getDefaultAlertRulesUseCase.execute();

            return ResponseHandler.success(
                res,
                "Default alert rules fetched successfully",
                rules
            );
        } catch (error) {
            next(error);
        }
    }

    async applyDefault(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: ApplyDefaultAlertRuleDTO = {
                monitoringProjectId: req.params.projectId,
                organizationId: user.organizationId,
                defaultRuleName: req.body.defaultRuleName,
            };

            const alertRule = await this.applyDefaultAlertRuleUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Default alert rule applied successfully",
                alertRule
            );
        } catch (error) {
            next(error);
        }
    }
}