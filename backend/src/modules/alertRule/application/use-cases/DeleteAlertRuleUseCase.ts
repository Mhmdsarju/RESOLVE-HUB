import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IAlertRuleRepository } from "../../domain/interfaces/IAlertRuleRepository";
import { IDeleteAlertRuleUseCase } from "../../domain/interfaces/use-case/IDeleteAlertRuleUseCase";

@injectable()
export class DeleteAlertRuleUseCase implements IDeleteAlertRuleUseCase {
    constructor(
        @inject(TYPES.AlertRuleRepository)
        private readonly alertRuleRepository: IAlertRuleRepository
    ) { }

    async execute(id: string, organizationId: string): Promise<void> {
        
        const alertRule = await this.alertRuleRepository.findById(id);

        if (!alertRule || alertRule.organizationId !== organizationId) {
            throw new AppError("Alert rule not found", HttpStatusCode.NOT_FOUND);
        }

        await this.alertRuleRepository.delete(id);
    }
}