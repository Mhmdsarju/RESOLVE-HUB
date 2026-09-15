import { TeamMember } from "../../entities/teamMember.entity";
import { UpdateTeamMembersRoleDto } from "@/modules/team-management/application/dto/updateTeamMemberRoleDto";

export interface IUpdateTeamMemberRoleUseCase {
    execute(memberId: string, dto: UpdateTeamMembersRoleDto, actorId: string,): Promise<TeamMember>;
}