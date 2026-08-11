import { AlertRoutingRule } from "../../entities/alertRoutingRule.entity";
import { UpdateAlertRoutingRuleDto } from "@/modules/alertRoutingRule/application/dto/UpdateAlertRoutingRuleDto";

export interface IUpdateAlertRoutingRuleUseCase {
    execute(id: string, dto: UpdateAlertRoutingRuleDto,): Promise<AlertRoutingRule>;
}