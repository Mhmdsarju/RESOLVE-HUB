import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Plan } from "../../domain/entity/plan.entity";
import { IPlanRepository } from "../../domain/interface/IPlanRepository";
import { IUpdatePlanUseCase } from "../../domain/interface/use-cases/IUpdatePlanUseCase";
import { UpdatePlanDto } from "../dto/UpdatePlanDto";

export class UpdatePlanUseCase implements IUpdatePlanUseCase {

    constructor(
        private readonly planRepository: IPlanRepository,
    ) { }

    async execute(id: string, data: UpdatePlanDto): Promise<Plan> {

        const plan = await this.planRepository.findById(id);

        if (!plan) {
            throw new AppError("Plan not found", HttpStatusCode.NOT_FOUND,);
        }

        if (data.name && data.name !== plan.name) {
            const existingPlan = await this.planRepository.findByName(data.name);

            if (existingPlan && existingPlan.id !== id) {
                throw new AppError(
                    "Plan already exists",
                    HttpStatusCode.CONFLICT,
                );
            }
        }

        if (data.price !== undefined && data.price < 0) {
            throw new AppError(
                "Plan price cannot be negative",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (
            data.durationDays !== undefined &&
            data.durationDays !== null &&
            data.durationDays <= 0
        ) {
            throw new AppError(
                "Duration must be greater than 0",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (
            data.maxProjects !== undefined &&
            data.maxProjects !== null &&
            data.maxProjects <= 0
        ) {
            throw new AppError(
                "Maximum projects must be greater than 0",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const updatedPlan = await this.planRepository.update(
            id,
            data,
        );

        return updatedPlan;
    }
}