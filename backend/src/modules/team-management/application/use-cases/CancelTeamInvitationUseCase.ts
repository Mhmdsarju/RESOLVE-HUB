import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { ICancelTeamInvitationUseCase } from "../../domain/interfaces/use-case/ICancelTeamInvitationUseCase";
import { ITeamInvitationRepository } from "../../domain/interfaces/ITeamInvitationRepository";

import { InvitationStatus } from "../../domain/enums/InvitationStatus";

import { AppError } from "@/shared/errors/AppError";
import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class CancelTeamInvitationUseCase implements ICancelTeamInvitationUseCase {
    constructor(
        @inject(TYPES.TeamInvitationRepository)
        private readonly invitationRepository: ITeamInvitationRepository
    ) { }

    async execute(id: string): Promise<void> {
        const invitation = await this.invitationRepository.findById(id);

        if (!invitation) {
            throw new AppError(
                "Invitation not found",
                HttpStatusCode.NOT_FOUND
            );
        }

        if (invitation.status !== InvitationStatus.PENDING) {
            throw new AppError(
                ErrorMessages.INVITATION_ALREADY_ACCEPTED,
                HttpStatusCode.BAD_REQUEST
            );
        }

        await this.invitationRepository.update(id,{status:InvitationStatus.CANCELLED});


    }


}