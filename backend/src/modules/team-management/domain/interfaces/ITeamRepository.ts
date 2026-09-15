import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Team } from "../entities/team.entity";
import { GetTeamsDto } from "../../application/dto/getTeamsDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

export interface ITeamRepository extends IBaseRepository<Team> {
    
    findByName(organizationId: string, name: string): Promise<Team | null>;

    findTeams(dto:GetTeamsDto):Promise<PaginationResult<Team>>;

}