import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IGetAlertRoutingRuleByIdUseCase } from "../../domain/interfaces/use-case/IGetAlertRoutingRuleByIdUseCase";

@injectable()
export class GetAlertRoutingRuleByIdUseCase implements IGetAlertRoutingRuleByIdUseCase {

    constructor(
        @inject(TYPES.AlertRoutingRuleRepository)
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
    ) { }

    async execute(id: string): Promise<AlertRoutingRule> {

        const rule = await this.alertRoutingRuleRepository.findById(id);

        if (!rule) {
            throw new AppError("Alert routing rule not found", HttpStatusCode.NOT_FOUND,);
        }

        return rule;
    }
}