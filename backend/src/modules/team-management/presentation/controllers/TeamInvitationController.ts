import { Request, Response, NextFunction } from "express";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { TeamRole } from "../../domain/enums/TeamRole";
import { AcceptTeamInvitationDto } from "../../application/dto/acceptTeamInvitationDto";
import { CreateTeamInvitationDto } from "../../application/dto/createTeamInvitationDto";
import { ICreateTeamInvitationUseCase } from "../../domain/interfaces/use-case/ICreateTeamInvitationUseCase";
import { IAcceptTeamInvitationUseCase } from "../../domain/interfaces/use-case/IAcceptTeamInvitationUseCase";
import { IGetTeamInvitationsUseCase } from "../../domain/interfaces/use-case/IGetTeamInvitationsUseCase";
import { ICancelTeamInvitationUseCase } from "../../domain/interfaces/use-case/ICancelTeamInvitationUseCase";

export class TeamInvitationController extends BaseController {
    constructor(
        private readonly createTeamInvitationUseCase: ICreateTeamInvitationUseCase,
        private readonly acceptTeamInvitationUseCase: IAcceptTeamInvitationUseCase,
        private readonly getTeamInvitationUseCase: IGetTeamInvitationsUseCase,
        private readonly cancelTeamInvitationUseCase: ICancelTeamInvitationUseCase
    ) { super() }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const dto: CreateTeamInvitationDto = {
                organizationId: user.organizationId,
                teamId: req.params.teamId,
                invitedEmail: req.body.invitedEmail,
                role: req.body.role ?? TeamRole.MEMBER,
                createdBy: user.userId,
            };

            const invitation = await this.createTeamInvitationUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Invitation sent successfully",
                invitation
            );
        } catch (error) {
            next(error);
        }
    }

    async accept(req: Request, res: Response, next: NextFunction) {
        try {

            const dto: AcceptTeamInvitationDto = {
                token: req.params.token,
                name: req.body.name,
                password: req.body.password,
            };

            const result = await this.acceptTeamInvitationUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Registration completed successfully",
                result
            );

        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {

            this.getCurrentUser(req);

            const invitation = await this.getTeamInvitationUseCase.execute(req.params.teamId);

            return ResponseHandler.success(res, "Invitation fetched successfully", invitation);

        } catch (error) {
            next(error)
        }
    }

    async cancel(req: Request, res: Response, next: NextFunction) {
        try {
            this.getCurrentUser(req);

            await this.cancelTeamInvitationUseCase.execute(
                req.params.id
            );

            return ResponseHandler.success(
                res,
                "Invitation cancelled successfully",
                null
            );

        } catch (error) {
            next(error);
        }
    }

}