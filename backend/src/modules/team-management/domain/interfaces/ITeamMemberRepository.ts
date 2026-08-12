import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { TeamMember } from "../entities/teamMember.entity";


export interface TeamWithRole {
  role: string;

  team: {
    id: string;
    name: string;
  };
}


export interface TeamMemberWithUser extends TeamMember {
  name: string;
  email: string;
}


export interface ITeamMemberRepository
  extends IBaseRepository<TeamMember> {

  findMember(teamId: string, userId: string,): Promise<TeamMember | null>;
  findMembers(teamId: string, pagination: PaginationDto,): Promise<PaginationResult<TeamMemberWithUser>>;
  findTeamsByUserId(userId: string,): Promise<TeamWithRole[]>;
}