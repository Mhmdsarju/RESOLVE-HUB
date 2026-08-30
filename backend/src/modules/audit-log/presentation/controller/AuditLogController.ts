import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreateAuditLogUseCase } from "../../domain/interface/usecase/ICreateAuditLogUseCase";
import { IGetAuditLogsUseCase } from "../../domain/interface/usecase/IGetAuditLogsUseCase";

import { GetAuditLogsDto } from "../../application/dto/GetAuditLogsDto";
import { AuditAction, AuditEntityType } from "../../domain/enums/auditLog.enum";

export class AuditLogController extends BaseController {
    constructor(
        private readonly createAuditLogUseCase: ICreateAuditLogUseCase,
        private readonly getAuditLogsUseCase: IGetAuditLogsUseCase,
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const auditLog = await this.createAuditLogUseCase.execute({
                ...req.body,
                actorId: currentUser.userId,
            });

            return ResponseHandler.success(
                res,
                "Audit log created successfully",
                auditLog,
            );
        } catch (error) {
            next(error);
        }
    }

    async getByOrganization(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const dto: GetAuditLogsDto = {
                organizationId: currentUser.organizationId,
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                search: req.query.search as string | undefined,
                action: req.query.action as AuditAction | undefined,
                entityType: req.query.entityType as AuditEntityType | undefined,
            };

            const auditLogs = await this.getAuditLogsUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Audit logs fetched successfully",
                auditLogs,
            );
        } catch (error) {
            next(error);
        }
    }
}