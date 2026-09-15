import { AlertRoutingRule } from "../../entities/alertRoutingRule.entity";
import { CreateAlertRoutingRuleDto } from "@/modules/alertRoutingRule/application/dto/CreateAlertRoutingRuleDto";

export interface ICreateAlertRoutingRuleUseCase {
    execute(dto: CreateAlertRoutingRuleDto, organizationId: string, createdBy: string,): Promise<AlertRoutingRule>;
}