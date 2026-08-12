import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { Alert } from "@/modules/alert/domain/entities/alert.entity";
// import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IRouteAlertUseCase } from "../../domain/interfaces/use-case/IRouteAlertUseCase";

import { AlertRoutingEvaluator } from "../../domain/services/AlertRoutingEvaluator";

@injectable()
export class RouteAlertUseCase implements IRouteAlertUseCase {

    constructor(
        @inject(TYPES.AlertRoutingRuleRepository)
        private readonly alertRoutingRuleRepository: IAlertRoutingRuleRepository,
        @inject(TYPES.AlertRoutingEvaluator)
        private readonly alertRoutingEvaluator: AlertRoutingEvaluator,
    ) { }

    async execute(alert: Alert): Promise<string | null> {

        const rules = await this.alertRoutingRuleRepository.findByMonitoringProject(
            alert.monitoringProjectId,
        );

        for (const rule of rules) {

            const isMatch = this.alertRoutingEvaluator.matches(rule, alert,);

            if (isMatch) {
                return rule.teamId;
            }
        }

        return null;
    }
}