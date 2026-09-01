import { Plan } from "../../entity/plan.entity";
import { CreatePlanDto } from "../../../application/dto/CreatePlanDto";

export interface ICreatePlanUseCase {
    execute(data: CreatePlanDto): Promise<Plan>;
}