import { TeamMember } from "../../entities/teamMember.entity";
import { CreateTeamMemberDto } from "@/modules/team-management/application/dto/createTeamMemberDto"; 

export interface IAddTeamMemberUseCase {
    execute(dto: CreateTeamMemberDto, actorId: string,): Promise<TeamMember>;
}