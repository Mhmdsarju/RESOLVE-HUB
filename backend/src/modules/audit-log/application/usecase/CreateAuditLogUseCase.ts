import { ICreateAuditLogUseCase } from "../../domain/interface/usecase/ICreateAuditLogUseCase";
import { IAuditLogRepository } from "../../domain/interface/IAuditLogRepository"; 

import { AuditLog } from "../../domain/entity/auditLog.entity"; 
import { CreateAuditLogDto } from "../dto/createAuditLogDto";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class CreateAuditLogUseCase implements ICreateAuditLogUseCase {

    constructor(
        private readonly auditLogRepository: IAuditLogRepository,
    ) { }

    async execute(dto: CreateAuditLogDto): Promise<AuditLog> {

        if (!dto.organizationId?.trim()) {
            throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.action) {
            throw new AppError("Audit action is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.entityType) {
            throw new AppError("Audit entity type is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.description?.trim()) {
            throw new AppError("Audit description is required", HttpStatusCode.BAD_REQUEST,);
        }

        const auditLog = new AuditLog({
            organizationId: dto.organizationId,
            actorId: dto.actorId ?? null,
            action: dto.action,
            entityType: dto.entityType,
            entityId: dto.entityId ?? null,
            description: dto.description.trim(),
            metadata: dto.metadata,
        });

        return await this.auditLogRepository.create(auditLog);
    }
}