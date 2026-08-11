import { AlertRule } from "../../entities/alertRule.entity";

export interface IGetAlertRuleByIdUseCase {
    execute(id: string, organizationId: string): Promise<AlertRule>;
}