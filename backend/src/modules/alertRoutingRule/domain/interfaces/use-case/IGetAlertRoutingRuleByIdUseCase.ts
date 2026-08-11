import { AlertRoutingRule } from "../../entities/alertRoutingRule.entity";

export interface IGetAlertRoutingRuleByIdUseCase {
    execute(id: string,): Promise<AlertRoutingRule>;
}