import { GetAuditLogsDto } from "@/modules/audit-log/application/dto/GetAuditLogsDto"; 
import { AuditLog } from "../../entity/auditLog.entity";
export interface IGetAuditLogsUseCase {

    execute(dto: GetAuditLogsDto): Promise<{
        data: AuditLog[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;

}