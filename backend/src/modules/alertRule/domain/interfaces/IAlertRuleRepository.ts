import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { AlertRule } from "../entities/alertRule.entity";
import { GetAlertRulesDTO } from "../../application/dto/getAlertRulesDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export interface IAlertRuleRepository extends IBaseRepository<AlertRule> {

    findAlertRules(dto: GetAlertRulesDTO): Promise<PaginationResult<AlertRule>>;
}