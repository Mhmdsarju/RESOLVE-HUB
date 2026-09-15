import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { Alert } from "../entities/alert.entity";
import { GetAlertsDTO } from "../../application/dto/getAlertsDto";

export interface IAlertRepository extends IBaseRepository<Alert> {
    findAlerts(dto: GetAlertsDTO): Promise<PaginationResult<Alert>>;
    findActiveAlertByIncidentAndAlertRule(incidentId: string, alertRuleId: string,): Promise<Alert | null>;
    findActiveAlertByIncidentAndTitle(incidentId: string, title: string,): Promise<Alert | null>;
}