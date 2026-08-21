import { Container } from "inversify";
import { TYPES } from "../types";
import { TeamController } from "@/modules/team-management/presentation/controllers/TeamController";
import { CreateTeamUseCase } from "@/modules/team-management/application/use-cases/CreateTeamUseCase";
import { ITeamRepository } from "@/modules/team-management/domain/interfaces/ITeamRepository";
import { GetTeamsUseCase } from "@/modules/team-management/application/use-cases/GetTeamsUseCase";
import { GetTeamUseCase } from "@/modules/team-management/application/use-cases/GetTeamUseCase";
import { UpdateTeamUseCase } from "@/modules/team-management/application/use-cases/UpdateTeamUseCase";
import { DeleteTeamUseCase } from "@/modules/team-management/application/use-cases/DeleteTeamUseCase";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { AddTeamMemberUseCase } from "@/modules/team-management/application/use-cases/AddTeamMemberUseCase";
import { TeamMemberController } from "@/modules/team-management/presentation/controllers/TeamMemberController";
import { GetTeamMembersUseCase } from "@/modules/team-management/application/use-cases/GetTeamMembersUseCase";
import { UpdateTeamMemberRoleUseCase } from "@/modules/team-management/application/use-cases/UpdateTeamMemberRoleUseCase";
import { RemoveTeamMemberUseCase } from "@/modules/team-management/application/use-cases/RemoveTeamMemberUseCase";
import { ITeamInvitationRepository } from "@/modules/team-management/domain/interfaces/ITeamInvitationRepository";
import { CreateTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/CreateTeamInvitationUseCase";
import { TeamInvitationController } from "@/modules/team-management/presentation/controllers/TeamInvitationController";
import { AcceptTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/AcceptTeamInvitationUseCase";
import { GetTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/GetTeamInvitationsUseCase";
import { CancelTeamInvitationUseCase } from "@/modules/team-management/application/use-cases/CancelTeamInvitationUseCase";
import { GetMyTeamsUseCase } from "@/modules/team-management/application/use-cases/GetMyTeamsUseCase";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { IPasswordHasher } from "@/modules/auth/domain/interfaces/IPasswordHasher";
import { ITokenService } from "@/modules/auth/domain/interfaces/ITokenService";
import { IEmailService } from "@/modules/auth/domain/interfaces/IEmailService";
import { createTeamRoutes } from "@/modules/team-management/presentation/routes/team.routes";
import { createTeamMemberRoutes } from "@/modules/team-management/presentation/routes/teamMember.routes";
import { createTeamInvitationRoutes } from "@/modules/team-management/presentation/routes/teamInvitation.routes";

export function bindTeam(container: Container) {
    
    const teamRepository = container.get<ITeamRepository>(TYPES.TeamRepository);
    const teamMemberRepository = container.get<ITeamMemberRepository>(TYPES.TeamMemberRepository);
    const teamInvitationRepository = container.get<ITeamInvitationRepository>(TYPES.TeamInvitationRepository,);
    const userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    const passwordHasher = container.get<IPasswordHasher>(TYPES.PasswordHasher);
    const tokenService = container.get<ITokenService>(TYPES.TokenService);
    const emailService = container.get<IEmailService>(TYPES.EmailService);

    const acceptTeamInvitationUseCase = new AcceptTeamInvitationUseCase(
        teamInvitationRepository,
        teamMemberRepository,
        userRepository,
        passwordHasher,
        tokenService,
    );

    const addTeamMemberUseCase = new AddTeamMemberUseCase(
        teamRepository,
        teamMemberRepository,
        userRepository,
    );

    const cancelTeamInvitationUseCase = new CancelTeamInvitationUseCase(
        teamInvitationRepository,
    );

    const createTeamInvitationUseCase = new CreateTeamInvitationUseCase(
        teamInvitationRepository,
        teamRepository,
        teamMemberRepository,
        userRepository,
        emailService,
    );

    const createTeamUseCase = new CreateTeamUseCase(teamRepository);

    const deleteTeamUseCase = new DeleteTeamUseCase(teamRepository);

    const getMyTeamsUseCase = new GetMyTeamsUseCase(teamMemberRepository);

    const getTeamInvitationUseCase = new GetTeamInvitationUseCase(teamInvitationRepository);

    const getTeamMembersUseCase = new GetTeamMembersUseCase(teamMemberRepository);

    const getTeamsUseCase = new GetTeamsUseCase(teamRepository);

    const getTeamUseCase = new GetTeamUseCase(teamRepository);

    const removeTeamMemberUseCase = new RemoveTeamMemberUseCase(teamMemberRepository);

    const updateTeamMemberRoleUseCase = new UpdateTeamMemberRoleUseCase(teamMemberRepository);

    const updateTeamUseCase = new UpdateTeamUseCase(teamRepository);

    const teamController = new TeamController(
        createTeamUseCase,
        getTeamUseCase,
        getTeamsUseCase,
        updateTeamUseCase,
        deleteTeamUseCase,
    );

    const teamInvitationController = new TeamInvitationController(
        createTeamInvitationUseCase,
        acceptTeamInvitationUseCase,
        getTeamInvitationUseCase,
        cancelTeamInvitationUseCase,
    );

    const teamMemberController = new TeamMemberController(
        addTeamMemberUseCase,
        getTeamMembersUseCase,
        updateTeamMemberRoleUseCase,
        removeTeamMemberUseCase,
        getMyTeamsUseCase,
    );

    const teamRouter = createTeamRoutes(teamController);
    const teamMemberRouter = createTeamMemberRoutes(teamMemberController);
    const teamInvitationRouter = createTeamInvitationRoutes(teamInvitationController);

    return {
        teamRouter,
        teamMemberRouter,
        teamInvitationRouter,
    }

}