export const TEAM_TYPES={

    TeamRepository: Symbol.for("TeamRepository"),
    TeamMemberRepository:Symbol.for("TeamMemberRepository"),
    TeamInvitationRepository:Symbol.for("TeamInvitationRepository"),

    TeamController:Symbol.for("TeamController"),
    TeamMemberController:Symbol.for("TeamMemberController"),
    TeamInvitationController:Symbol.for("TeamInvitationController"),
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

    CreateTeamInvitationUseCase:Symbol.for("CreateTeamInvitationUseCase"),
    AcceptTeamInvitationUseCase:Symbol.for("AcceptTeamInvitationUseCase"),
    GetTeamInvitationsUseCase:Symbol.for("GetTeamInvitationsUseCase"),
    CancelTeamInvitationUseCase:Symbol.for("CancelTeamInvitationUseCase"),
    GetMyTeamsUseCase:Symbol.for("GetMyTeamsUseCase")

    }   