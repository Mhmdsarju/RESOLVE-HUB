import {
    AuditLog as PrismaAuditLog,
    AuditAction as PrismaAuditAction,
    AuditEntityType as PrismaAuditEntityType,
    Prisma,
} from "@prisma/client";

import { AuditLog } from "../../domain/entity/auditLog.entity";
import { AuditAction, AuditEntityType, } from "../../domain/enums/auditLog.enum";

export class AuditLogMapper {

    static toDb(auditLog: AuditLog) {
        return {
            organizationId: auditLog.organizationId,
            actorId: auditLog.actorId,
            action: auditLog.action as PrismaAuditAction,
            entityType: auditLog.entityType as PrismaAuditEntityType,
            entityId: auditLog.entityId,
            description: auditLog.description,
            metadata: auditLog.metadata
                ? auditLog.metadata as Prisma.InputJsonValue
                : undefined,
        };
    }

    static fromDb(data: PrismaAuditLog): AuditLog {
        return new AuditLog({
            id: data.id,
            organizationId: data.organizationId,
            actorId: data.actorId,
            action: data.action as AuditAction,
            entityType: data.entityType as AuditEntityType,
            entityId: data.entityId,
            description: data.description,
            metadata: data.metadata,
            createdAt: data.createdAt,
        });
    }
}