import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Plan } from "../entity/plan.entity";
import { PlanName } from "../enums/planName.enum";

export interface IPlanRepository extends IBaseRepository<Plan> {

  findByName(name: PlanName): Promise<Plan | null>;

  findAllActive(): Promise<Plan[]>;

}