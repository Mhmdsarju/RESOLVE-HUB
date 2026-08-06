import { Team } from "../../entities/team.entity";

export interface IGetTeamUseCase {
    execute(id: string): Promise<Team>
}