export const TEAM_TYPES={

    TeamRepository: Symbol.for("TeamRepository"),
    TeamMemberRepository:Symbol.for("TeamMemberRepository"),

    TeamController:Symbol.for("TeamController"),
    //usecases
    CreateTeamUseCase:Symbol.for("CreateTeamUseCase"),
    GetTeamUseCase:Symbol.for("GetTeamUseCase"),
    GetTeamsUseCase:Symbol.for("GetTeamsUseCase"),
    UpdateTeamUseCase:Symbol.for("UpdateTeamUseCase"),
    DeleteTeamUseCase:Symbol.for("DeleteTeamUseCase"),
    
    AddTeamMemberUseCase:Symbol.for("AddTeamMemberUseCase"),
    GetTeamMembersUseCase:Symbol.for("GetTeamMembersUseCase"),
    UpdateTeamMemberRoleUseCase:Symbol.for("UpdateTeamMemberRoleUseCase"),
    RemoveTeamMemberUseCase:Symbol.for("RemoveTeamMemberUseCase"),
    TeamMemberController:Symbol.for("TeamMemberController")

}   