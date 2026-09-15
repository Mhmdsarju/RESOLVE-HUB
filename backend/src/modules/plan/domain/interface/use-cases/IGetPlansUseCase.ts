import { Plan } from "../../entity/plan.entity";

export interface IGetPlansUseCase {
    execute(): Promise<Plan[]>;
}