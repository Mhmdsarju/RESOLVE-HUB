export const MONITORING_TYPES={
    MonitoringProjectRepository:Symbol.for("MonitoringProjectRepository"),
    MonitoringProjectController:Symbol.for("MonitoringProjectController"),

    CreateMonitoringProjectUseCase:Symbol.for("CreateMonitoringProjectUseCase"),
    getMonitoringProjectsUseCase:Symbol.for("getMonitoringProjectsUseCase"),
    getMonitoringProjectByIdUseCase:Symbol.for("getMonitoringProjectByIdUseCase"),
    updateMonitoringProjectUseCase:Symbol.for("updateMonitoringProjectUseCase"),
    deleteMonitoringProjectUseCase:Symbol.for("deleteMonitoringProjectUseCase")
}