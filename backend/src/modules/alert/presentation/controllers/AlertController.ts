import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

import { TYPES } from "@/config/types";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreateAlertUseCase } from "../../domain/interfaces/use-case/ICreateAlertUseCase";
import { IGetAlertsUseCase } from "../../domain/interfaces/use-case/IGetAlertsUseCase";
import { IGetAlertByIdUseCase } from "../../domain/interfaces/use-case/IGetAlertByIdUseCase";
import { IResolveAlertUseCase } from "../../domain/interfaces/use-case/IResolveAlertUseCase";
import { AlertSource } from "../../domain/enums/alertSource.enum";
import { AlertStatus } from "../../domain/enums/alertStatus.enum";
import { CreateAlertDTO } from "../../application/dto/createAlertDto";
import { BaseController } from "@/shared/base/controllers/BaseController";

import { IIntegrationRepository } from "@/modules/integration/domain/interfaces/IIntegrationRepository";
import { IntegrationType } from "@/modules/integration/domain/enums/integrationType.enum";
// import { AlertSource } from "../../domain/enums/alertSource.enum";
// import { AlertStatus } from "../../domain/enums/alertStatus.enum";

@injectable()
export class AlertController extends BaseController {
    constructor(
        @inject(TYPES.CreateAlertUseCase)
        private readonly createAlertUseCase: ICreateAlertUseCase,

        @inject(TYPES.GetAlertsUseCase)
        private readonly getAlertsUseCase: IGetAlertsUseCase,

        @inject(TYPES.GetAlertByIdUseCase)
        private readonly getAlertByIdUseCase: IGetAlertByIdUseCase,

        @inject(TYPES.ResolveAlertUseCase)
        private readonly resolveAlertUseCase: IResolveAlertUseCase,
        @inject(TYPES.IntegrationRepository)
        private readonly integrationRepository: IIntegrationRepository
    ) { super(); }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: CreateAlertDTO = {
                organizationId: user.organizationId,
                monitoringProjectId: req.params.projectId,
                integrationId: req.body.integrationId,
                createdBy: user.userId,
                source: AlertSource.MANUAL,
                title: req.body.title,
                message: req.body.message,
                status: req.body.status as AlertStatus | undefined,
                payload: req.body.payload ?? {},
                incidentId: req.body.incidentId,
            };

            const alert = await this.createAlertUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Alert created successfully",
                alert
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const page = Math.max(1, Number(req.query.page) || 1);

            const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));

            const result = await this.getAlertsUseCase.execute(
                req.params.projectId,
                user.organizationId,
                page,
                limit
            );

            return ResponseHandler.success(
                res,
                "Alerts fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const alert = await this.getAlertByIdUseCase.execute(
                req.params.id,
                user.organizationId
            );

            return ResponseHandler.success(
                res,
                "Alert fetched successfully",
                alert
            );
        } catch (error) {
            next(error);
        }
    }

    async resolve(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const alert = await this.resolveAlertUseCase.execute(
                req.params.id,
                user.organizationId
            );

            return ResponseHandler.success(
                res,
                "Alert resolved successfully",
                alert
            );
        } catch (error) {
            next(error);
        }
    }

    async prometheusWebhook(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const integration =
                await this.integrationRepository.findById(
                    req.params.integrationId
                );

            if (!integration) {
                return res.status(404).json({
                    success: false,
                    message: "Integration not found",
                });
            }

            if (integration.type !== IntegrationType.PROMETHEUS) {
                return res.status(400).json({
                    success: false,
                    message: "Integration is not a Prometheus integration",
                });
            }

            if (!integration.isActive) {
                return res.status(400).json({
                    success: false,
                    message: "Integration is inactive",
                });
            }

            const alerts = Array.isArray(req.body.alerts)
                ? req.body.alerts
                : [];

            const results = [];

            for (const alert of alerts) {
                const status =
                    alert.status === "firing"
                        ? AlertStatus.FIRING
                        : AlertStatus.RESOLVED;

                const createdAlert =
                    await this.createAlertUseCase.execute({
                        organizationId: integration.organizationId,
                        monitoringProjectId:
                            integration.monitoringProjectId,
                        integrationId: integration.id,

                        source: AlertSource.AUTOMATIC,

                        title:
                            alert.labels?.alertname ??
                            "Prometheus Alert",

                        message:
                            alert.annotations?.description ??
                            alert.annotations?.summary ??
                            "Prometheus alert received",

                        status,

                        payload: {
                            labels: alert.labels ?? {},
                            annotations: alert.annotations ?? {},
                            startsAt: alert.startsAt,
                            endsAt: alert.endsAt,
                            generatorURL: alert.generatorURL,
                        },
                    });

                results.push(createdAlert);
            }

            return ResponseHandler.success(
                res,
                "Prometheus alerts processed successfully",
                results
            );
        } catch (error) {
            next(error);
        }
    }


}