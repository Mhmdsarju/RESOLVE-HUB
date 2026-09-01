import { Plan as PrismaPlan, PlanName as PrismaPlanName } from "@prisma/client";

import { Plan } from "../../domain/entity/plan.entity";
import { PlanName } from "../../domain/enums/planName.enum";

export class PlanMapper {
    static fromDb(plan: PrismaPlan): Plan {
        return new Plan({
            id: plan.id,
            name: plan.name as PlanName,
            price: plan.price,
            durationDays: plan.durationDays,
            maxProjects: plan.maxProjects,
            isActive: plan.isActive,
            createdAt: plan.createdAt,
            updatedAt: plan.updatedAt,
        });
    }

    static toDb(plan: Plan) {
        return {
            name: plan.name as PrismaPlanName,
            price: plan.price,
            durationDays: plan.durationDays,
            maxProjects: plan.maxProjects,
            isActive: plan.isActive,
        };
    }
}