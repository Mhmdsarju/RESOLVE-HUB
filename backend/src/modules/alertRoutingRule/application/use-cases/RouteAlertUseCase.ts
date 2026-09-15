import { Alert } from "@/modules/alert/domain/entities/alert.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { IRouteAlertUseCase } from "../../domain/interfaces/use-case/IRouteAlertUseCase";

export class RouteAlertUseCase implements IRouteAlertUseCase {
    constructor(
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