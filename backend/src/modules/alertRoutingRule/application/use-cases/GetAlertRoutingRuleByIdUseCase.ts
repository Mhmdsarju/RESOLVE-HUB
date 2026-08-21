import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IGetAlertRoutingRuleByIdUseCase } from "../../domain/interfaces/use-case/IGetAlertRoutingRuleByIdUseCase";

export class GetAlertRoutingRuleByIdUseCase  implements IGetAlertRoutingRuleByIdUseCase {
  constructor(
    private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
  ) { }

  async execute(id: string): Promise<AlertRoutingRule> {
    if (!id?.trim()) {
      throw new AppError("Alert routing rule ID is required", HttpStatusCode.BAD_REQUEST,);
    }

    const rule = await this.alertRoutingRuleRepository.findById(id);

    if (!rule) {
      throw new AppError("Alert routing rule not found", HttpStatusCode.NOT_FOUND,);
    }

    return rule;
  }
}