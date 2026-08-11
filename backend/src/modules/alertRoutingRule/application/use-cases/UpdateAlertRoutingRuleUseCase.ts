import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IUpdateAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/IUpdateAlertRoutingRuleUseCase";

import { UpdateAlertRoutingRuleDto } from "../dto/UpdateAlertRoutingRuleDto";

@injectable()
export class UpdateAlertRoutingRuleUseCase implements IUpdateAlertRoutingRuleUseCase {

    constructor(
        @inject(TYPES.AlertRoutingRuleRepository)
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
    ) { }

    async execute(id: string, dto: UpdateAlertRoutingRuleDto,): Promise<AlertRoutingRule> {

        const existingRule = await this.alertRoutingRuleRepository.findById(id);

        if (!existingRule) {
            throw new AppError("Alert routing rule not found", HttpStatusCode.NOT_FOUND,);
        }

        const updatedRule = await this.alertRoutingRuleRepository.update(id, {
            name: dto.name,
            monitoringProjectId: dto.monitoringProjectId,
            teamId: dto.teamId,
            conditions: dto.conditions,
            priority: dto.priority,
            isActive: dto.isActive,
        });

        return updatedRule;
    }
}