export const TASK_TYPES={
    TaskRepository:Symbol.for("TaskRepository"),
    TaskController:Symbol.for("TaskController"),
    CreateTaskUseCase:Symbol.for("CreateTaskUseCase"),

    GetTasksByIncidentUseCase:Symbol.for("GetTasksByIncidentUseCase"),
    UpdateTaskStatusUseCase:Symbol.for("UpdateTaskStatusUseCase"),
    AssignTaskUseCase:Symbol.for("AssignTaskUseCase"),
    DeleteTaskUseCase:Symbol.for("DeleteTaskUseCase"),
    UpdateTaskUseCase:Symbol.for("UpdateTaskUseCase"),
    GetIncidentsUseCase:Symbol.for("GetIncidentsUseCase"),
    GetIncidentStatsUseCase:Symbol.for("GetIncidentStatsUseCase")
}