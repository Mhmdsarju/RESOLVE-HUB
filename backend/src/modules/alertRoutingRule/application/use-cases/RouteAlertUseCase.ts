import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { Alert } from "@/modules/alert/domain/entities/alert.entity";

import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IRouteAlertUseCase } from "../../domain/interfaces/use-case/IRouteAlertUseCase";

@injectable()
export class RouteAlertUseCase implements IRouteAlertUseCase {
    constructor(
        @inject(TYPES.AlertRoutingRuleRepository)
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
    ) { }

    async execute(alert: Alert,): Promise<string | null> {
        if (!alert.alertRuleId) {
            return null;
        }

        const rules = await this.alertRoutingRuleRepository.findByMonitoringProject(alert.monitoringProjectId,);

        if (rules.length === 0) {
            return null;
        }

        const matchingRule = rules.find(
            (rule) => rule.isActive && rule.alertRuleId === alert.alertRuleId,
        );

        return matchingRule?.teamId ?? null;
    }
}