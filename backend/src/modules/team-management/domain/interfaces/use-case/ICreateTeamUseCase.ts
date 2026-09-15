import { CreateTeamDto } from "@/modules/team-management/application/dto/createTeamDto";
import { Team } from "../../entities/team.entity";

export interface ICreateTeamUseCase {
    execute(dto: CreateTeamDto): Promise<Team>
}