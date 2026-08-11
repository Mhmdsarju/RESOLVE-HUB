import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { AlertRule } from "../../domain/entities/alertRule.entity";
import { IAlertRuleRepository } from "../../domain/interfaces/IAlertRuleRepository";
import { IGetAlertRulesUseCase } from "../../domain/interfaces/use-case/IGetAlertRulesUseCase";
import { GetAlertRulesDTO } from "../dto/getAlertRulesDto";

@injectable()
export class GetAlertRulesUseCase implements IGetAlertRulesUseCase {
    constructor(
        @inject(TYPES.AlertRuleRepository)
        private readonly alertRuleRepository: IAlertRuleRepository
    ) { }

    async execute(dto: GetAlertRulesDTO): Promise<PaginationResult<AlertRule>> {
        return await this.alertRuleRepository.findAlertRules(dto);
    }
}