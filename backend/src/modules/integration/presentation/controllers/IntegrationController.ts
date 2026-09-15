
import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "@/shared/response/response-handler";

import { CreateIntegrationDTO } from "../../application/dto/createIntegrationDto";
import { ICreateIntegrationUseCase } from "../../domain/interfaces/use-cases/ICreateIntegrationUseCase";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { IGetIntegrationsUseCase } from "../../domain/interfaces/use-cases/IGetIntegrationsUseCase";
import { IGetIntegrationByIdUseCase } from "../../domain/interfaces/use-cases/IGetIntegrationByIdUseCase";
import { IUpdateIntegrationUseCase } from "../../domain/interfaces/use-cases/IUpdateIntegrationUseCase";
import { IDeleteIntegrationUseCase } from "../../domain/interfaces/use-cases/IDeleteIntegrationUseCase";
import { UpdateIntegrationDTO } from "../../application/dto/updateIntegrationDto";

export class IntegrationController extends BaseController {
    constructor(
        private readonly createIntegrationUseCase: ICreateIntegrationUseCase,
        private readonly getIntegrationsUseCase: IGetIntegrationsUseCase,
        private readonly getIntegrationByIdUseCase: IGetIntegrationByIdUseCase,
        private readonly updateIntegrationUseCase: IUpdateIntegrationUseCase,
        private readonly deleteIntegrationUseCase: IDeleteIntegrationUseCase
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: CreateIntegrationDTO = {
                monitoringProjectId: req.params.projectId,
                organizationId: user.organizationId!,
                name: req.body.name,
                type: req.body.type,
                config: req.body.config,
            };

            const integration = await this.createIntegrationUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Integration created successfully",
                integration
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const page = Math.max(
                1,
                Number(req.query.page) || 1
            );

            const limit = Math.min(
                100,
                Math.max(1, Number(req.query.limit) || 10)
            );

            const result = await this.getIntegrationsUseCase.execute(
                req.params.projectId,
                user.organizationId!,
                page,
                limit
            );

            return ResponseHandler.success(
                res,
                "Integrations fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const integration = await this.getIntegrationByIdUseCase.execute(
                req.params.id,
                user.organizationId!
            );

            return ResponseHandler.success(
                res,
                "Integration fetched successfully",
                integration
            );
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: UpdateIntegrationDTO = {
                name: req.body.name,
                type: req.body.type,
                config: req.body.config,
                isActive: req.body.isActive,
            };

            const integration = await this.updateIntegrationUseCase.execute(
                req.params.id,
                user.organizationId!,
                dto
            );

            return ResponseHandler.success(
                res,
                "Integration updated successfully",
                integration
            );
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            await this.deleteIntegrationUseCase.execute(
                req.params.id,
                user.organizationId!
            );

            return ResponseHandler.success(
                res,
                "Integration deleted successfully",
                null
            );
        } catch (error) {
            next(error);
        }
    }


}