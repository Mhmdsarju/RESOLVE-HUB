export interface IRemoveTeamMemberUseCase{
    execute(memberId:string,actorId: string,):Promise<void>;
}