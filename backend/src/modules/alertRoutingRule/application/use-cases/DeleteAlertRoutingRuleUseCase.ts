import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IDeleteAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/IDeleteAlertRoutingRuleUseCase";

export class DeleteAlertRoutingRuleUseCase implements IDeleteAlertRoutingRuleUseCase {
    constructor(
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
    ) { }

    async execute(id: string): Promise<void> {

        const existingRule = await this.alertRoutingRuleRepository.findById(id);

        if (!existingRule) {
            throw new AppError("Alert routing rule not found", HttpStatusCode.NOT_FOUND,);
        }

        await this.alertRoutingRuleRepository.delete(id);
    }
}