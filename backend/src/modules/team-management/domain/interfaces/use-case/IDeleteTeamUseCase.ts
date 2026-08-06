export interface  IDeleteTeamUseCase{
    execute(id:string):Promise<void>;
}