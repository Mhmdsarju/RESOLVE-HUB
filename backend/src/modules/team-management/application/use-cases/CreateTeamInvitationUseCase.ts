import crypto from "crypto";
import { ICreateTeamInvitationUseCase } from "../../domain/interfaces/use-case/ICreateTeamInvitationUseCase";
import { ITeamInvitationRepository } from "../../domain/interfaces/ITeamInvitationRepository";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { IEmailService } from "@/modules/auth/domain/interfaces/IEmailService";

import { CreateTeamInvitationDto } from "../dto/createTeamInvitationDto";
import { TeamInvitation } from "../../domain/entities/teamInvitation.entity";

import { InvitationStatus } from "../../domain/enums/InvitationStatus";

import { AppError } from "@/shared/errors/AppError";
import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { UserRole } from "@/modules/auth/domain/enums/UserRole";

export class CreateTeamInvitationUseCase implements ICreateTeamInvitationUseCase {

    constructor(
        private readonly invitationRepository: ITeamInvitationRepository,
        private readonly teamRepository: ITeamRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly userRepository: IUserRepository,
        private readonly emailService: IEmailService,
    ) { }

    async execute(dto: CreateTeamInvitationDto): Promise<TeamInvitation> {

        const team = await this.teamRepository.findById(dto.teamId);
        if (!team) {
            throw new AppError(ErrorMessages.TEAM_NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }



        const existingInvitation = await this.invitationRepository.findPendingInvitation(dto.teamId, dto.invitedEmail);

        if (existingInvitation) {
            throw new AppError(ErrorMessages.INVITATION_ALREADY_EXISTS, HttpStatusCode.CONFLICT);
        }

        const existingPendingInvitation = await this.invitationRepository.findPendingInvitationByEmail(dto.invitedEmail);

        if (existingPendingInvitation) {
            throw new AppError("Invitation already sent by other team", HttpStatusCode.CONFLICT);
        }

        const user = await this.userRepository.findByEmail(dto.invitedEmail);



        if (user) {

            if (user.organizationId === dto.organizationId && user.role === UserRole.ORG_ADMIN) {
                throw new AppError(
                    "Organization admin cannot be invited to a team.",
                    HttpStatusCode.CONFLICT,
                );
            }

            const member = await this.teamMemberRepository.findMember(
                dto.teamId,
                user.id!
            );

            if (member) {
                throw new AppError(
                    ErrorMessages.USER_ALREADY_IN_TEAM,
                    HttpStatusCode.CONFLICT
                );
            }

        }

        const token = crypto.randomBytes(32).toString("hex");

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const invitation = new TeamInvitation({
            organizationId: dto.organizationId,
            teamId: dto.teamId,
            invitedEmail: dto.invitedEmail,
            role: dto.role,
            token,
            status: InvitationStatus.PENDING,
            expiresAt,
            createdBy: dto.createdBy,
        });

        const createdInvitation = await this.invitationRepository.create(invitation);

        const inviteLink = `${process.env.FRONTEND_URL}/accept-invitation/${createdInvitation.token}`;

        await this.emailService.sendTeamInvitationEmail(dto.invitedEmail, inviteLink);

        return createdInvitation;

    }

}