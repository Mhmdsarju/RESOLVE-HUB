export interface IRemoveTeamMemberUseCase{
    execute(memberId:string):Promise<void>;
}