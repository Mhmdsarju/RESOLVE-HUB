import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { AlertRule } from "../../domain/entities/alertRule.entity";
import { IAlertRuleRepository } from "../../domain/interfaces/IAlertRuleRepository";
import { IUpdateAlertRuleUseCase } from "../../domain/interfaces/use-case/IUpdateAlertRuleUseCase";

import { UpdateAlertRuleDTO } from "../dto/updateAlertRuleDto";

export class UpdateAlertRuleUseCase implements IUpdateAlertRuleUseCase {
    constructor(
        private readonly alertRuleRepository: IAlertRuleRepository
    ) { }

    async execute(id: string, organizationId: string, dto: UpdateAlertRuleDTO): Promise<AlertRule> {
        
        const alertRule = await this.alertRuleRepository.findById(id);

        if (!alertRule || alertRule.organizationId !== organizationId) {
            throw new AppError("Alert rule not found", HttpStatusCode.NOT_FOUND);
        }

        return await this.alertRuleRepository.update(
            id,
            dto as Partial<AlertRule>
        );
    }
}