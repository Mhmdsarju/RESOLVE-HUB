import { TeamMember } from "../../entities/teamMember.entity";

export interface IGetTeamMembersUseCase{
    execute(teamId:string):Promise<TeamMember[]>;
}