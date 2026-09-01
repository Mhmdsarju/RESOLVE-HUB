import { PlanName } from "../../domain/enums/planName.enum";

export interface CreatePlanDto {
    name: PlanName;
    price: number;
    durationDays?: number | null;
    maxProjects?: number | null;
}