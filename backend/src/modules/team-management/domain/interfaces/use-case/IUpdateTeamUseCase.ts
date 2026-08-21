import { Team } from "../../entities/team.entity";
import { UpdateTeamDto } from "@/modules/team-management/application/dto/updateTeamDto";

export interface IUpdateTeamUseCase {
    execute(id: string, dto: UpdateTeamDto): Promise<Team>;
}