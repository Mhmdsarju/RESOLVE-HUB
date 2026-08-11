import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { ICreateAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/ICreateAlertRoutingRuleUseCase";

import { CreateAlertRoutingRuleDto } from "../dto/CreateAlertRoutingRuleDto";

@injectable()
export class CreateAlertRoutingRuleUseCase implements ICreateAlertRoutingRuleUseCase {

    constructor(
        @inject(TYPES.AlertRoutingRuleRepository)
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
    ) { }

    async execute(dto: CreateAlertRoutingRuleDto, organizationId: string, createdBy: string,): Promise<AlertRoutingRule> {

        const rule = new AlertRoutingRule({
            organizationId,
            monitoringProjectId: dto.monitoringProjectId,
            teamId: dto.teamId,
            createdBy,
            name: dto.name,
            conditions: dto.conditions,
            priority: dto.priority ?? 100,
            isActive: true,
        });

        return await this.alertRoutingRuleRepository.create(rule);
    }
}