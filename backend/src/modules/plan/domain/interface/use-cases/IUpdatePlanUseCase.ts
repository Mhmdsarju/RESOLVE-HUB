import { Plan } from "../../entity/plan.entity";
import { UpdatePlanDto } from "../../../application/dto/UpdatePlanDto";

export interface IUpdatePlanUseCase {
    execute(id: string, data: UpdatePlanDto): Promise<Plan>;
}