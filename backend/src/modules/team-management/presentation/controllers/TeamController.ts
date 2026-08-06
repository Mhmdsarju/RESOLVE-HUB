import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

import { TYPES } from "../../../../config/types";

import { AppError } from "../../../../shared/errors/AppError";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ResponseHandler } from "../../../../shared/response/response-handler";

import { CreateTeamDto } from "../../application/dto/createTeamDto";
import { ICreateTeamUseCase } from "../../domain/interfaces/use-case/ICreateTeamUseCase";
import { GetTeamsDto } from "../../application/dto/getTeamsDto";
import { IGetTeamsUseCase } from "../../domain/interfaces/use-case/IGetTeamsUseCase";
import { IGetTeamUseCase } from "../../domain/interfaces/use-case/IGetTeamUseCase";
import { UpdateTeamDto } from "../../application/dto/updateTeamDto";
import { IUpdateTeamUseCase } from "../../domain/interfaces/use-case/IUpdateTeamUseCase";
import { IDeleteTeamUseCase } from "../../domain/interfaces/use-case/IDeleteTeamUseCase";

@injectable()
export class TeamController {
    constructor(
        @inject(TYPES.CreateTeamUseCase)
        private readonly createTeamUseCase: ICreateTeamUseCase,
        @inject(TYPES.GetTeamUseCase)
        private readonly getTeamUseCase: IGetTeamUseCase,
        @inject(TYPES.GetTeamsUseCase)
        private readonly getTeamsUseCase: IGetTeamsUseCase,
        @inject(TYPES.UpdateTeamUseCase)
        private readonly updateTeamUseCase: IUpdateTeamUseCase,
        @inject(TYPES.DeleteTeamUseCase)
        private readonly deleteTeamUseCase: IDeleteTeamUseCase
    ) { }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(
                    ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
            }

            const dto: CreateTeamDto = {
                name: req.body.name,
                organizationId: user.organizationId,
                createdBy: user.userId,
            };

            const team = await this.createTeamUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Team created successfully",
                team
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
            }

            const team = await this.getTeamUseCase.execute(req.params.id)

            return ResponseHandler.success(
                res, "Team fetched successfully", team
            )

        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
            }

            const dto: GetTeamsDto = {
                organizationId: user.organizationId,
                page: Math.max(1, Number(req.query.page) || 1),
                limit: Math.min(100, Math.max(1, Number(req.query.limit) || 10)),
                search: req.query.search as string,
            }

            const result = await this.getTeamsUseCase.execute(dto)
            return ResponseHandler.success(
                res, "Teams fetched successfully", result
            )

        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(
                    ErrorMessages.UNAUTHORIZED,
                    HttpStatusCode.UNAUTHORIZED
                );
            }

            const dto: UpdateTeamDto = {
                name: req.body.name,
            };

            const team = await this.updateTeamUseCase.execute(
                req.params.id,
                dto
            );

            return ResponseHandler.success(
                res,
                "Team updated successfully",
                team
            );

        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(
                    ErrorMessages.UNAUTHORIZED,
                    HttpStatusCode.UNAUTHORIZED
                );
            }

            await this.deleteTeamUseCase.execute(req.params.id);

            return ResponseHandler.success(
                res,
                "Team deleted successfully",
                null
            );

        } catch (error) {
            next(error);
        }
    }


}