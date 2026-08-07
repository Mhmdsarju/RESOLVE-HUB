import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { TeamMember } from "../entities/teamMember.entity";

export interface ITeamMemberRepository extends IBaseRepository<TeamMember> {
    findMember(teamId: string, userId: string): Promise<TeamMember | null>;
    findMembers(teamId: string): Promise<TeamMember[]>;
}