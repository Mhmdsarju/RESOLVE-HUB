import { Alert } from "../../entities/alert.entity";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export interface IGetAlertsUseCase {
    execute(monitoringProjectId: string, organizationId: string, page: number, limit: number): Promise<PaginationResult<Alert>>;
}