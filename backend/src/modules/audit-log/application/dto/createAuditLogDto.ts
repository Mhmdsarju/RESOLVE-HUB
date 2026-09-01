import { AuditAction, AuditEntityType, } from "../../domain/enums/auditLog.enum";

export interface CreateAuditLogDto {
    organizationId: string;
    action: AuditAction;
    entityType: AuditEntityType;
    description: string;
    actorId?: string | null;
    entityId?: string | null;
    metadata?: unknown;
}