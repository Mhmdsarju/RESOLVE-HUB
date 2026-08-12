export const ALERT_ROUTING_RULE_TYPES = {
    AlertRoutingRuleRepository: Symbol.for("AlertRoutingRuleRepository"),
    AlertRoutingRuleController: Symbol.for("AlertRoutingRuleController"),

    CreateAlertRoutingRuleUseCase: Symbol.for("CreateAlertRoutingRuleUseCase"),
    GetAlertRoutingRulesUseCase: Symbol.for("GetAlertRoutingRulesUseCase"),
    DeleteAlertRoutingRuleUseCase: Symbol.for("DeleteAlertRoutingRuleUseCase"),
    GetAlertRoutingRuleByIdUseCase: Symbol.for("GetAlertRoutingRuleByIdUseCase"),
    UpdateAlertRoutingRuleUseCase:Symbol.for("UpdateAlertRoutingRuleUseCase"),
    RouteAlertUseCase:Symbol.for("RouteAlertUseCase"),
    AlertRoutingEvaluator: Symbol.for("AlertRoutingEvaluator"),
}