import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { ICreateAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/ICreateAlertRoutingRuleUseCase";

import { CreateAlertRoutingRuleDto } from "../dto/CreateAlertRoutingRuleDto";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";


export class CreateAlertRoutingRuleUseCase    implements ICreateAlertRoutingRuleUseCase {
    constructor(
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
    ) { }

    async execute(dto: CreateAlertRoutingRuleDto, organizationId: string, createdBy: string,): Promise<AlertRoutingRule> {

        if (!dto.name?.trim()) {
            throw new AppError("Routing rule name is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.monitoringProjectId) {
            throw new AppError("Monitoring project ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.alertRuleId) {
            throw new AppError("Alert rule ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!dto.teamId) {
            throw new AppError("Team ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!organizationId) {
            throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!createdBy) {
            throw new AppError("Created by user ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const rule = new AlertRoutingRule({
            organizationId,
            monitoringProjectId: dto.monitoringProjectId,
            alertRuleId: dto.alertRuleId,
            teamId: dto.teamId,
            createdBy,
            name: dto.name.trim(),
            priority: dto.priority ?? 100,
            isActive: true,
        });

        return await this.alertRoutingRuleRepository.create(rule);
    }
}