import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { Plan } from "../../domain/entity/plan.entity";
import { IPlanRepository } from "../../domain/interface/IPlanRepository"; 
import { PlanName } from "../../domain/enums/planName.enum";
import { PlanMapper } from "../mappers/PlanMapper"; 

@injectable()
export class PrismaPlanRepository implements IPlanRepository {

    async create(plan: Plan): Promise<Plan> {
        const created = await prisma.plan.create({
            data: PlanMapper.toDb(plan),
        });

        return PlanMapper.fromDb(created);
    }

    async findById(id: string): Promise<Plan | null> {
        const plan = await prisma.plan.findUnique({
            where: { id },
        });

        if (!plan) {
            return null;
        }

        return PlanMapper.fromDb(plan);
    }

    async findAll(): Promise<Plan[]> {
        const plans = await prisma.plan.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });

        return plans.map(PlanMapper.fromDb);
    }

    async update(id: string, data: Partial<Plan>): Promise<Plan> {
        const updated = await prisma.plan.update({
            where: { id },
            data: PlanMapper.toDb({
                ...(data as Plan),
            }),
        });

        return PlanMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.plan.delete({
            where: { id },
        });
    }

    async findByName(name: PlanName): Promise<Plan | null> {
        const plan = await prisma.plan.findUnique({
            where: { name },
        });

        if (!plan) {
            return null;
        }

        return PlanMapper.fromDb(plan);
    }

    async findAllActive(): Promise<Plan[]> {
        const plans = await prisma.plan.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return plans.map(PlanMapper.fromDb);
    }
}