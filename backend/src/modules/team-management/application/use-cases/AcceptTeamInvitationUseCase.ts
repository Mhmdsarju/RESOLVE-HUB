import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import {
  IAcceptTeamInvitationUseCase,
  LoginResponseDto,
} from "../../domain/interfaces/use-case/IAcceptTeamInvitationUseCase";

import { ITeamInvitationRepository } from "../../domain/interfaces/ITeamInvitationRepository";
import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";

import { AppError } from "@/shared/errors/AppError";
import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { InvitationStatus } from "../../domain/enums/InvitationStatus";
import { TeamMember } from "../../domain/entities/teamMember.entity";

import { IPasswordHasher } from "@/modules/auth/domain/interfaces/IPasswordHasher";
import { ITokenService } from "@/modules/auth/domain/interfaces/ITokenService";

import { AcceptTeamInvitationDto } from "../dto/acceptTeamInvitationDto";

import { User } from "@/modules/auth/domain/entities/User";
import { UserRole } from "@/modules/auth/domain/enums/UserRole";

@injectable()
export class AcceptTeamInvitationUseCase
  implements IAcceptTeamInvitationUseCase {

  constructor(
    @inject(TYPES.TeamInvitationRepository)
    private readonly invitationRepository: ITeamInvitationRepository,

    @inject(TYPES.TeamMemberRepository)
    private readonly teamMemberRepository: ITeamMemberRepository,

    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,

    @inject(TYPES.TokenService)
    private readonly tokenService: ITokenService,
  ) {}

  async execute(
    dto: AcceptTeamInvitationDto,
  ): Promise<LoginResponseDto> {

    const invitation =
      await this.invitationRepository.findByToken(dto.token);

    if (!invitation) {
      throw new AppError(
        "Invitation not found",
        HttpStatusCode.NOT_FOUND,
      );
    }

    if (
      invitation.status !==
      InvitationStatus.PENDING
    ) {
      throw new AppError(
        ErrorMessages.INVITATION_ALREADY_ACCEPTED,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    if (invitation.expiresAt < new Date()) {
      throw new AppError(
        ErrorMessages.INVITATION_EXPIRED,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const existingUser =
      await this.userRepository.findByEmail(
        invitation.invitedEmail,
      );

    let user: User;

    if (existingUser) {
      user = existingUser;
    } else {
      const hashedPassword =
        await this.passwordHasher.hash(
          dto.password,
        );

      const newUser = new User({
        name: dto.name,
        email: invitation.invitedEmail,
        password: hashedPassword,
        organizationId: invitation.organizationId,
        role: UserRole.ENGINEER,
      });

      user =
        await this.userRepository.create(
          newUser,
        );
    }

    const existingMember =
      await this.teamMemberRepository.findMember(
        invitation.teamId,
        user.id!,
      );

    if (existingMember) {
      throw new AppError(
        "User is already a member of this team",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const teamMember = new TeamMember({
      teamId: invitation.teamId,
      userId: user.id!,
      role: invitation.role,
    });

    await this.teamMemberRepository.create(
      teamMember,
    );

    await this.invitationRepository.update(
      invitation.id!,
      {
        status: InvitationStatus.ACCEPTED,
      },
    );

    const accessToken =
      await this.tokenService.generateAccessToken({
        userId: user.id!,
        organizationId: user.organizationId,
        role: user.role,
      });

    return {
      user,
      accessToken,
    };
  }
}