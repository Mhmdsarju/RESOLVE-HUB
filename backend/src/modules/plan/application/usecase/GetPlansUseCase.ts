import { Plan } from "../../domain/entity/plan.entity";
import { IPlanRepository } from "../../domain/interface/IPlanRepository";
import { IGetPlansUseCase } from "../../domain/interface/use-cases/IGetPlansUseCase";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class GetPlansUseCase implements IGetPlansUseCase {

    constructor(
        private readonly planRepository: IPlanRepository,
    ) { }

    async execute(): Promise<Plan[]> {

        const plans = await this.planRepository.findAll();

        if (!plans) {
            throw new AppError("Plans not found", HttpStatusCode.NOT_FOUND,);
        }

        return plans;
    }
}