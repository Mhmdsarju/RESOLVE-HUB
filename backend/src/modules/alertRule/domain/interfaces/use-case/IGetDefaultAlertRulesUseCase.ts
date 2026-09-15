import { DefaultAlertRule } from "../../../application/constants/defaultAlertRules";

export interface IGetDefaultAlertRulesUseCase {
  execute(): Promise<DefaultAlertRule[]>;
}