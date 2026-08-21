import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { AlertRule } from "../../entities/alertRule.entity";
import { GetAlertRulesDTO } from "../../../application/dto/getAlertRulesDto";

export interface IGetAlertRulesUseCase {
    execute(dto: GetAlertRulesDTO): Promise<PaginationResult<AlertRule>>;
}