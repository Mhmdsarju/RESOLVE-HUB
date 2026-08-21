import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { AlertRoutingRule } from "../../domain/entities/alertRoutingRule.entity";
import { IAlertRoutingRuleRepository } from "../../domain/interfaces/IAlertRoutingRuleRepository";
import { AlertRoutingRuleMapper } from "../mappers/AlertRoutingRuleMapper";

@injectable()
export class PrismaAlertRoutingRuleRepository
    implements IAlertRoutingRuleRepository {
    async create(rule: AlertRoutingRule,): Promise<AlertRoutingRule> {
        const created = await prisma.alertRoutingRule.create({
            data: AlertRoutingRuleMapper.toDB(rule),
        });

        return AlertRoutingRuleMapper.fromDB(created);
    }

    async findById(id: string,): Promise<AlertRoutingRule | null> {
        const rule = await prisma.alertRoutingRule.findUnique({
            where: { id },
        });

        if (!rule) {
            return null;
        }

        return AlertRoutingRuleMapper.fromDB(rule);
    }

    async findAll(): Promise<AlertRoutingRule[]> {
        const rules = await prisma.alertRoutingRule.findMany({
            orderBy: {
                priority: "asc",
            },
        });

        return rules.map(AlertRoutingRuleMapper.fromDB);
    }

    async findByMonitoringProject(monitoringProjectId: string,): Promise<AlertRoutingRule[]> {
        const rules = await prisma.alertRoutingRule.findMany({
            where: {
                monitoringProjectId,
                isActive: true,
            },
            orderBy: {
                priority: "asc",
            },
        });

        return rules.map(AlertRoutingRuleMapper.fromDB);
    }

    async update(id: string, data: Partial<AlertRoutingRule>,): Promise<AlertRoutingRule> {
        const updated = await prisma.alertRoutingRule.update({
            where: { id },
            data: {
                ...(data.name !== undefined && {
                    name: data.name,
                }),

                ...(data.monitoringProjectId !== undefined && {
                    monitoringProjectId:
                        data.monitoringProjectId,
                }),

                ...(data.alertRuleId !== undefined && {
                    alertRuleId: data.alertRuleId,
                }),

                ...(data.teamId !== undefined && {
                    teamId: data.teamId,
                }),

                ...(data.priority !== undefined && {
                    priority: data.priority,
                }),

                ...(data.isActive !== undefined && {
                    isActive: data.isActive,
                }),
            },
        });

        return AlertRoutingRuleMapper.fromDB(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.alertRoutingRule.delete({
            where: { id },
        });
    }
}