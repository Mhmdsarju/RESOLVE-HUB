import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IUpdateAlertRoutingRuleUseCase } from "../../domain/interfaces/use-case/IUpdateAlertRoutingRuleUseCase";

import { UpdateAlertRoutingRuleDto } from "../dto/UpdateAlertRoutingRuleDto";

export class UpdateAlertRoutingRuleUseCase    implements IUpdateAlertRoutingRuleUseCase {
    constructor(
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
    ) { }

    async execute(id: string, dto: UpdateAlertRoutingRuleDto,): Promise<AlertRoutingRule> {
        if (!id?.trim()) {
            throw new AppError("Alert routing rule ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const existingRule = await this.alertRoutingRuleRepository.findById(id);

        if (!existingRule) {
            throw new AppError("Alert routing rule not found", HttpStatusCode.NOT_FOUND,);
        }

        if (dto.name !== undefined && !dto.name.trim()) {
            throw new AppError("Routing rule name cannot be empty", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.monitoringProjectId !== undefined && !dto.monitoringProjectId.trim()) {
            throw new AppError("Monitoring project ID cannot be empty", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.alertRuleId !== undefined && !dto.alertRuleId.trim()) {
            throw new AppError("Alert rule ID cannot be empty", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.teamId !== undefined && !dto.teamId.trim()) {
            throw new AppError("Team ID cannot be empty", HttpStatusCode.BAD_REQUEST,);
        }

        if (dto.priority !== undefined && (!Number.isInteger(dto.priority) || dto.priority < 1)) {
            throw new AppError("Priority must be a positive integer", HttpStatusCode.BAD_REQUEST,);
        }

        const hasUpdates =
            dto.name !== undefined ||
            dto.monitoringProjectId !== undefined ||
            dto.alertRuleId !== undefined ||
            dto.teamId !== undefined ||
            dto.priority !== undefined ||
            dto.isActive !== undefined;

        if (!hasUpdates) {
            throw new AppError("At least one field is required to update", HttpStatusCode.BAD_REQUEST,);
        }

        return await this.alertRoutingRuleRepository.update(id, {
            ...(dto.name !== undefined && {
                name: dto.name.trim(),
            }),

            ...(dto.monitoringProjectId !== undefined && {
                monitoringProjectId: dto.monitoringProjectId.trim(),
            }),

            ...(dto.alertRuleId !== undefined && {
                alertRuleId: dto.alertRuleId.trim(),
            }),

            ...(dto.teamId !== undefined && {
                teamId: dto.teamId.trim(),
            }),

            ...(dto.priority !== undefined && {
                priority: dto.priority,
            }),

            ...(dto.isActive !== undefined && {
                isActive: dto.isActive,
            }),
        });
    }
}