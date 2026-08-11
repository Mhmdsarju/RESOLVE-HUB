import { AlertRule } from "../../entities/alertRule.entity";
import { UpdateAlertRuleDTO } from "@/modules/alertRule/application/dto/updateAlertRuleDto"; 

export interface IUpdateAlertRuleUseCase {
  execute(
    id: string,
    organizationId: string,
    dto: UpdateAlertRuleDTO
  ): Promise<AlertRule>;
}