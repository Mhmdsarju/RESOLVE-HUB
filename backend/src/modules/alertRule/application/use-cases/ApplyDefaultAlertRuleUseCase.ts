import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { AlertRule } from "../../domain/entities/alertRule.entity";
import { IAlertRuleRepository } from "../../domain/interfaces/IAlertRuleRepository";
import { IApplyDefaultAlertRuleUseCase } from "../../domain/interfaces/use-case/IApplyDefaultAlertRuleUseCase";

import { ApplyDefaultAlertRuleDTO } from "../dto/applyDefaultAlertRuleDto";
import { DEFAULT_ALERT_RULES } from "../constants/defaultAlertRules";

@injectable()
export class ApplyDefaultAlertRuleUseCase implements IApplyDefaultAlertRuleUseCase {
    constructor(
        @inject(TYPES.AlertRuleRepository)
        private readonly alertRuleRepository: IAlertRuleRepository
    ) { }

    async execute(dto: ApplyDefaultAlertRuleDTO): Promise<AlertRule> {
        const defaultRule = DEFAULT_ALERT_RULES.find((rule) => rule.name === dto.defaultRuleName);

        if (!defaultRule) {
            throw new AppError("Default alert rule not found", HttpStatusCode.NOT_FOUND);
        }

        const alertRule = new AlertRule(
            crypto.randomUUID(),
            dto.monitoringProjectId,
            dto.organizationId,
            defaultRule.name,
            defaultRule.metric,
            defaultRule.operator,
            defaultRule.threshold,
            defaultRule.severity,
            defaultRule.priority,
            defaultRule.autoCreateIncident,
            true,
            true,
            new Date(),
            new Date()
        );

        return await this.alertRuleRepository.create(alertRule);
    }
}