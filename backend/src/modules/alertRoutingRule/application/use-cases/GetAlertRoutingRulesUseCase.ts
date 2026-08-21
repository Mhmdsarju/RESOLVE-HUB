import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IGetAlertRoutingRulesUseCase } from "../../domain/interfaces/use-case/IGetAlertRoutingRulesUseCase";

export class GetAlertRoutingRulesUseCase  implements IGetAlertRoutingRulesUseCase {
  constructor(
    private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
  ) { }

  async execute(organizationId: string,): Promise<AlertRoutingRule[]> {
    if (!organizationId?.trim()) {
      throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST,);
    }

    const rules = await this.alertRoutingRuleRepository.findAll();

    return rules.filter((rule) => rule.organizationId === organizationId,);
  }
}