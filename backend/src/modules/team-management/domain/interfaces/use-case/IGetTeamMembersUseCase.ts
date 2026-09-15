import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto"; 
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult"; 

import {  TeamMemberWithUser,} from "../ITeamMemberRepository";


export interface IGetTeamMembersUseCase {
  execute(    teamId: string,    pagination: PaginationDto,  ): Promise<PaginationResult<TeamMemberWithUser>>;
}