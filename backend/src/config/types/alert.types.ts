export const ALERT_TYPES = {
    AlertRepository: Symbol.for("AlertRepository"),
    AlertController: Symbol.for("AlertController"),

    CreateAlertUseCase: Symbol.for("CreateAlertUseCase"),
    GetAlertsUseCase: Symbol.for("GetAlertsUseCase"),
    ResolveAlertUseCase: Symbol.for("ResolveAlertUseCase"),
    GetAlertByIdUseCase: Symbol.for("GetAlertByIdUseCase"),
    ProcessAlertUseCase: Symbol.for("ProcessAlertUseCase"),
}