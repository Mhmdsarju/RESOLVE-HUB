import { AlertRule } from "../../entities/alertRule.entity";
import { ApplyDefaultAlertRuleDTO } from "../../../application/dto/applyDefaultAlertRuleDto";

export interface IApplyDefaultAlertRuleUseCase {
  execute(dto: ApplyDefaultAlertRuleDTO): Promise<AlertRule>;
}