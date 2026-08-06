import { Container } from "inversify";
import { TYPES } from "../types";
import { TeamController } from "@/modules/team-management/presentation/controllers/TeamController";
import { ICreateTeamUseCase } from "@/modules/team-management/domain/interfaces/use-case/ICreateTeamUseCase";
import { CreateTeamUseCase } from "@/modules/team-management/application/use-cases/CreateTeamUseCase";
import { ITeamRepository } from "@/modules/team-management/domain/interfaces/ITeamRepository";
import { PrismaTeamRepository } from "@/modules/team-management/infrastructure/repositories/PrismaTeamRepository";
import { IGetTeamsUseCase } from "@/modules/team-management/domain/interfaces/use-case/IGetTeamsUseCase";
import { GetTeamsUseCase } from "@/modules/team-management/application/use-cases/GetTeamsUseCase";
import { IGetTeamUseCase } from "@/modules/team-management/domain/interfaces/use-case/IGetTeamUseCase";
import { GetTeamUseCase } from "@/modules/team-management/application/use-cases/GetTeamUseCase";
import { IUpdateTeamUseCase } from "@/modules/team-management/domain/interfaces/use-case/IUpdateTeamUseCase";
import { UpdateTeamUseCase } from "@/modules/team-management/application/use-cases/UpdateTeamUseCase";
import { IDeleteTeamUseCase } from "@/modules/team-management/domain/interfaces/use-case/IDeleteTeamUseCase";
import { DeleteTeamUseCase } from "@/modules/team-management/application/use-cases/DeleteTeamUseCase";

export function bindTeam(container:Container){

    container.bind<TeamController>(TYPES.TeamController).to(TeamController).inSingletonScope();
    container.bind<ITeamRepository>(TYPES.TeamRepository).to(PrismaTeamRepository).inSingletonScope();
    container.bind<ICreateTeamUseCase>(TYPES.CreateTeamUseCase).to(CreateTeamUseCase).inSingletonScope();
    container.bind<IGetTeamsUseCase>(TYPES.GetTeamsUseCase).to(GetTeamsUseCase).inSingletonScope();
    container.bind<IGetTeamUseCase>(TYPES.GetTeamUseCase).to(GetTeamUseCase).inSingletonScope();
    container.bind<IUpdateTeamUseCase>(TYPES.UpdateTeamUseCase).to(UpdateTeamUseCase).inSingletonScope();
    container.bind<IDeleteTeamUseCase>(TYPES.DeleteTeamUseCase).to(DeleteTeamUseCase).inSingletonScope()
}