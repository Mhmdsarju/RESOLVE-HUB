import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { Plan } from "../../domain/entity/plan.entity";
import { IPlanRepository } from "../../domain/interface/IPlanRepository"; 
import { ICreatePlanUseCase } from "../../domain/interface/use-cases/ICreatePlanUseCase";
import { CreatePlanDto } from "../dto/CreatePlanDto";

export class CreatePlanUseCase implements ICreatePlanUseCase {

    constructor(
        private readonly planRepository: IPlanRepository,
    ) { }

    async execute(data: CreatePlanDto): Promise<Plan> {

        const existingPlan = await this.planRepository.findByName(data.name);

        if (existingPlan) {
            throw new AppError(
                "Plan already exists",
                HttpStatusCode.CONFLICT,
            );
        }

        if (data.price < 0) {
            throw new AppError(
                "Plan price cannot be negative",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (data.durationDays !== null && data.durationDays !== undefined && data.durationDays <= 0) {
            throw new AppError(
                "Duration must be greater than 0",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (data.maxProjects !== null && data.maxProjects !== undefined && data.maxProjects <= 0) {
            throw new AppError(
                "Maximum projects must be greater than 0",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const plan = new Plan({
            name: data.name,
            price: data.price,
            durationDays: data.durationDays ?? null,
            maxProjects: data.maxProjects ?? null,
            isActive: true,
        });

        return await this.planRepository.create(plan);
    }
}