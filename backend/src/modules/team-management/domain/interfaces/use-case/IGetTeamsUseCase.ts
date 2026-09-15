import { GetTeamsDto } from "../../../application/dto/getTeamsDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult" 
import { Team } from "../../entities/team.entity";

export interface IGetTeamsUseCase {
    execute(dto: GetTeamsDto): Promise<PaginationResult<Team>>;
}