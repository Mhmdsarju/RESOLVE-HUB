import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import { IAddTeamMemberUseCase } from "../../domain/interfaces/use-case/IAddTeamMemberUseCase";
import { ResponseHandler } from "@/shared/response/response-handler";
import { CreateTeamMemberDto } from "../../application/dto/createTeamMemberDto";
import { Request, Response, NextFunction } from "express";
import { TeamRole } from "../../domain/enums/TeamRole";
import { IGetTeamMembersUseCase } from "../../domain/interfaces/use-case/IGetTeamMembersUseCase";
import { IUpdateTeamMemberRoleUseCase } from "../../domain/interfaces/use-case/IUpdateTeamMemberRoleUseCase";
import { UpdateTeamMembersRoleDto } from "../../application/dto/updateTeamMemberRoleDto";
import { IRemoveTeamMemberUseCase } from "../../domain/interfaces/use-case/IRemoveTeamMemberUseCase";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { IGetMyTeamsUseCase } from "../../domain/interfaces/use-case/IGetMyTeamsUseCase";
import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto"; 

@injectable()
export class TeamMemberController extends BaseController {
    constructor(
        @inject(TYPES.AddTeamMemberUseCase)
        private readonly addTeamMemberUseCase: IAddTeamMemberUseCase,
        @inject(TYPES.GetTeamMembersUseCase)
        private readonly getTeamMembersUseCase: IGetTeamMembersUseCase,
        @inject(TYPES.UpdateTeamMemberRoleUseCase)
        private readonly updateTeamMemberRoleUseCase: IUpdateTeamMemberRoleUseCase,
        @inject(TYPES.RemoveTeamMemberUseCase)
        private readonly removeTeamMemberUseCase: IRemoveTeamMemberUseCase,
        @inject(TYPES.GetMyTeamsUseCase)
        private readonly getMyTeamsUseCase: IGetMyTeamsUseCase,
    ) { super() }

    async addMember(req: Request, res: Response, next: NextFunction) {
        try {
            this.getCurrentUser(req);

            const dto: CreateTeamMemberDto = {
                teamId: req.params.teamId,
                userId: req.body.userId,
                role: req.body.role ?? TeamRole.MEMBER,
            };

            const member = await this.addTeamMemberUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Team member added successfully",
                member
            );
        } catch (error) {
            next(error);
        }
    }

    async getMembers(req: Request, res: Response, next: NextFunction) {
        try {

            this.getCurrentUser(req);

            const pagination: PaginationDto = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 10,
                search: req.query.search as string | undefined,
            };

            const members = await this.getTeamMembersUseCase.execute(
                req.params.teamId,
                pagination,
            );

            return ResponseHandler.success(res, "Team members fetched successfully", members)

        } catch (error) {
            next(error)
        }
    }

    async updateRole(req: Request, res: Response, next: NextFunction) {
        try {

            this.getCurrentUser(req);

            const dto: UpdateTeamMembersRoleDto = {
                role: req.body.role,
            };

            const member = await this.updateTeamMemberRoleUseCase.execute(
                req.params.memberId,
                dto
            );

            return ResponseHandler.success(
                res,
                "Team member role updated successfully",
                member
            );
        } catch (error) {
            next(error)
        }
    }

    async removeMember(req: Request, res: Response, next: NextFunction) {
        try {
            this.getCurrentUser(req);

            await this.removeTeamMemberUseCase.execute(
                req.params.memberId
            );

            return ResponseHandler.success(
                res,
                "Team member removed successfully",
                null
            );

        } catch (error) {
            next(error);
        }
    }

    async getMyTeams(req: Request, res: Response, next: NextFunction) {
        try {
            const user = this.getCurrentUser(req);

            const teams = await this.getMyTeamsUseCase.execute(user.userId);

            return ResponseHandler.success(
                res,
                "Teams fetched successfully",
                teams
            );
        } catch (error) {
            next(error);
        }
    }

}