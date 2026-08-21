export const INCIDENT_TYPES={
    IncidentRepository:Symbol.for("IncidentRepository"),
    IncidentController:Symbol.for("IncidentController"),
    
    CreateIncidentUseCase:Symbol.for("CreateIncidentUseCase"),
    UpdateIncidentStatusUseCase:Symbol.for("UpdateIncidentStatusUseCase"),
    AssignTeamUseCase:Symbol.for("AssignTeamUseCase"),
    GetIncidentByIdUseCase:Symbol.for("GetIncidentByIdUseCase")

}