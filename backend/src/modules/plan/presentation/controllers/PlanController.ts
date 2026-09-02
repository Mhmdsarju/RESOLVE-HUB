import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreatePlanUseCase } from "../../domain/interface/use-cases/ICreatePlanUseCase";
import { IGetPlansUseCase } from "../../domain/interface/use-cases/IGetPlansUseCase";
import { IUpdatePlanUseCase } from "../../domain/interface/use-cases/IUpdatePlanUseCase";

import { CreatePlanDto } from "../../application/dto/CreatePlanDto";
import { UpdatePlanDto } from "../../application/dto/UpdatePlanDto";

export class PlanController extends BaseController {

    constructor(
        private readonly createPlanUseCase: ICreatePlanUseCase,
        private readonly getPlansUseCase: IGetPlansUseCase,
        private readonly updatePlanUseCase: IUpdatePlanUseCase,
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {

            const dto: CreatePlanDto = {
                name: req.body.name,
                price: req.body.price,
                durationDays: req.body.durationDays,
                maxProjects: req.body.maxProjects,
            };

            const plan = await this.createPlanUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "Plan created successfully",
                plan
            );

        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {

            const plans = await this.getPlansUseCase.execute();

            return ResponseHandler.success(
                res,
                "Plans fetched successfully",
                plans
            );

        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {

            const dto: UpdatePlanDto = {
                name: req.body.name,
                price: req.body.price,
                durationDays: req.body.durationDays,
                maxProjects: req.body.maxProjects,
                isActive: req.body.isActive,
            };

            const plan = await this.updatePlanUseCase.execute(
                req.params.id,
                dto
            );

            return ResponseHandler.success(
                res,
                "Plan updated successfully",
                plan
            );

        } catch (error) {
            next(error);
        }
    }
}