import { AlertRoutingRule } from "../../entities/alertRoutingRule.entity";

export interface IGetAlertRoutingRulesUseCase {
    execute(organizationId: string,): Promise<AlertRoutingRule[]>;
}