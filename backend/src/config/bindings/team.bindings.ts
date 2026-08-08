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
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { PrismaTeamMemberRepository } from "@/modules/team-management/infrastructure/repositories/PrismaTeamMemberRepository";
import { IAddTeamMemberUseCase } from "@/modules/team-management/domain/interfaces/use-case/IAddTeamMemberUseCase";
import { AddTeamMemberUseCase } from "@/modules/team-management/application/use-cases/AddTeamMemberUseCase";
import { TeamMemberController } from "@/modules/team-management/presentation/controllers/TeamMemberController";
import { IGetTeamMembersUseCase } from "@/modules/team-management/domain/interfaces/use-case/IGetTeamMembersUseCase";
import { GetTeamMembersUseCase } from "@/modules/team-management/application/use-cases/GetTeamMembersUseCase";
import { IUpdateTeamMemberRoleUseCase } from "@/modules/team-management/domain/interfaces/use-case/IUpdateTeamMemberRoleUseCase";
import { UpdateTeamMemberRoleUseCase } from "@/modules/team-management/application/use-cases/UpdateTeamMemberRoleUseCase";
import { IRemoveTeamMemberUseCase } from "@/modules/team-management/domain/interfaces/use-case/IRemoveTeamMemberUseCase";
import { RemoveTeamMemberUseCase } from "@/modules/team-management/application/use-cases/RemoveTeamMemberUseCase";
import { ITeamInvitationRepository } from "@/modules/team-management/domain/interfaces/ITeamInvitationRepository";
import { PrismaTeamInvitationRepository } from "@/modules/team-management/infrastructure/repositories/PrismaTeamInvitationRepository";
import { ICreateTeamInvitationUseCase } from "@/modules/team-management/domain/interfaces/use-case/ICreateTeamInvitationUseCase";
import { CreateTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/CreateTeamInvitationUseCase";
import { TeamInvitationController } from "@/modules/team-management/presentation/controllers/TeamInvitationController";
import { IAcceptTeamInvitationUseCase } from "@/modules/team-management/domain/interfaces/use-case/IAcceptTeamInvitationUseCase";
import { AcceptTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/AcceptTeamInvitationUseCase";
import { GetTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/GetTeamInvitationsUseCase";
import { IGetTeamInvitationsUseCase } from "@/modules/team-management/domain/interfaces/use-case/IGetTeamInvitationsUseCase";
import { ICancelTeamInvitationUseCase } from "@/modules/team-management/domain/interfaces/use-case/ICancelTeamInvitationUseCase";
import { CancelTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/CancelTeamInvitationUseCase";
import { IGetMyTeamsUseCase } from "@/modules/team-management/domain/interfaces/use-case/IGetMyTeamsUseCase";
import { GetMyTeamsUseCase } from "@/modules/team-management/application/use-cases/GetMyTeamsUseCase";

export function bindTeam(container:Container){

    container.bind<TeamController>(TYPES.TeamController).to(TeamController).inSingletonScope();
    container.bind<TeamMemberController>(TYPES.TeamMemberController).to(TeamMemberController);
    container.bind<TeamInvitationController>(TYPES.TeamInvitationController).to(TeamInvitationController);

    container.bind<ITeamRepository>(TYPES.TeamRepository).to(PrismaTeamRepository).inSingletonScope();
    container.bind<ITeamMemberRepository>(TYPES.TeamMemberRepository).to(PrismaTeamMemberRepository).inSingletonScope();
    container.bind<ITeamInvitationRepository>(TYPES.TeamInvitationRepository).to(PrismaTeamInvitationRepository).inSingletonScope()
    
    container.bind<ICreateTeamUseCase>(TYPES.CreateTeamUseCase).to(CreateTeamUseCase).inSingletonScope();
    container.bind<IGetTeamsUseCase>(TYPES.GetTeamsUseCase).to(GetTeamsUseCase).inSingletonScope();
    container.bind<IGetTeamUseCase>(TYPES.GetTeamUseCase).to(GetTeamUseCase).inSingletonScope();
    container.bind<IUpdateTeamUseCase>(TYPES.UpdateTeamUseCase).to(UpdateTeamUseCase).inSingletonScope();
    container.bind<IDeleteTeamUseCase>(TYPES.DeleteTeamUseCase).to(DeleteTeamUseCase).inSingletonScope()

    //teamMember

    container.bind<IAddTeamMemberUseCase>(TYPES.AddTeamMemberUseCase).to(AddTeamMemberUseCase).inSingletonScope();
    container.bind<IGetTeamMembersUseCase>(TYPES.GetTeamMembersUseCase).to(GetTeamMembersUseCase).inSingletonScope();
    container.bind<IUpdateTeamMemberRoleUseCase>(TYPES.UpdateTeamMemberRoleUseCase).to(UpdateTeamMemberRoleUseCase).inSingletonScope();
    container.bind<IRemoveTeamMemberUseCase>(TYPES.RemoveTeamMemberUseCase).to(RemoveTeamMemberUseCase).inSingletonScope();
    container.bind<IGetMyTeamsUseCase>(TYPES.GetMyTeamsUseCase).to(GetMyTeamsUseCase).inSingletonScope();

    container.bind<ICreateTeamInvitationUseCase>(TYPES.CreateTeamInvitationUseCase).to(CreateTeamInvitationUseCase).inSingletonScope();
    container.bind<IAcceptTeamInvitationUseCase>(TYPES.AcceptTeamInvitationUseCase).to(AcceptTeamInvitationUseCase).inSingletonScope();
    container.bind<ICancelTeamInvitationUseCase>(TYPES.CancelTeamInvitationUseCase).to(CancelTeamInvitationUseCase).inSingletonScope();
    container.bind<IGetTeamInvitationsUseCase>(TYPES.GetTeamInvitationsUseCase).to(GetTeamInvitationUseCase).inSingletonScope();
}