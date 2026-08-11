import { injectable } from "inversify";

import { DEFAULT_ALERT_RULES, DefaultAlertRule, } from "../constants/defaultAlertRules";

import { IGetDefaultAlertRulesUseCase } from "../../domain/interfaces/use-case/IGetDefaultAlertRulesUseCase";

@injectable()
export class GetDefaultAlertRulesUseCase implements IGetDefaultAlertRulesUseCase {
    async execute(): Promise<DefaultAlertRule[]> {
        return DEFAULT_ALERT_RULES;
    }
}