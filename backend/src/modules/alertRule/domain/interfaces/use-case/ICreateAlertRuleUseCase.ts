import { AlertRule } from "../../entities/alertRule.entity";
import { CreateAlertRuleDTO } from "../../../application/dto/createAlertRuleDto";

export interface ICreateAlertRuleUseCase {
  execute(dto: CreateAlertRuleDTO): Promise<AlertRule>;
}