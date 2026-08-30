import { IAuditLogRepository } from "@/modules/audit-log/domain/interface/IAuditLogRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CreateAuditLogUseCase } from "@/modules/audit-log/application/usecase/CreateAuditLogUseCase";
import { GetAuditLogsUseCase } from "@/modules/audit-log/application/usecase/GetAuditLogsUseCase";
import { AuditLogController } from "@/modules/audit-log/presentation/controller/AuditLogController";
import { createAuditLogRoutes } from "@/modules/audit-log/presentation/routes/auditLog.routes";

export function bindAuditLog(container:Container){

    const auditLogRepository=container.get<IAuditLogRepository>(TYPES.AuditlogRepository);

    const createAuditLogUseCase=new CreateAuditLogUseCase(
        auditLogRepository
    );

    const getAuditLogsUseCase=new GetAuditLogsUseCase(
        auditLogRepository
    )

    const auditLogController=new AuditLogController(
        createAuditLogUseCase,
        getAuditLogsUseCase
    );

    const auditLogRouter=createAuditLogRoutes(
        auditLogController
    );

    return {
        auditLogRouter,
        createAuditLogUseCase
    }


}