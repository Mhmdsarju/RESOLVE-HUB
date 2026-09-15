export interface ICancelTeamInvitationUseCase{
    execute(id:string):Promise<void>;
}