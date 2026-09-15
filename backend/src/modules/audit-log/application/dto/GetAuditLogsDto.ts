import { AuditAction, AuditEntityType } from "../../domain/enums/auditLog.enum";

export interface GetAuditLogsDto {

    organizationId: string;

    page: number;

    limit: number;

    search?: string;

    action?: AuditAction;

    entityType?: AuditEntityType;

}