import { PlanName } from "../../domain/enums/planName.enum";

export interface UpdatePlanDto {
    name?: PlanName;
    price?: number;
    durationDays?: number | null;
    maxProjects?: number | null;
    isActive?: boolean;
}