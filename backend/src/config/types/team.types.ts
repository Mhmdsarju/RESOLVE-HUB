export const TEAM_TYPES={

    TeamRepository: Symbol.for("TeamRepository"),
    TeamController:Symbol.for("TeamController"),
    //usecases
    CreateTeamUseCase:Symbol.for("CreateTeamUseCase"),
    GetTeamUseCase:Symbol.for("GetTeamUseCase"),
    GetTeamsUseCase:Symbol.for("GetTeamsUseCase"),
    UpdateTeamUseCase:Symbol.for("UpdateTeamUseCase"),
    DeleteTeamUseCase:Symbol.for("DeleteTeamUseCase")
}