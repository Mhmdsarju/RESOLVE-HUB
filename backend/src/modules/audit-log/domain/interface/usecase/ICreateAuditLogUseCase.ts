import { AuditLog } from "../../entity/auditLog.entity";
import { CreateAuditLogDto } from "@/modules/audit-log/application/dto/createAuditLogDto";

export interface ICreateAuditLogUseCase {
    execute(dto: CreateAuditLogDto): Promise<AuditLog>;
}