import { GetAuditLogsDto } from "../../application/dto/GetAuditLogsDto";
import { AuditLog } from "../entity/auditLog.entity";

export interface IAuditLogRepository {
    create(auditLog: AuditLog): Promise<AuditLog>;

    findByOrganizationId(dto: GetAuditLogsDto,): Promise<{ data: AuditLog[]; total: number; }>;
}