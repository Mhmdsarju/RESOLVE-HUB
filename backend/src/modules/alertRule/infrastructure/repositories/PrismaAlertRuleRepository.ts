import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { AlertRule } from "../../domain/entities/alertRule.entity";
import { IAlertRuleRepository } from "../../domain/interfaces/IAlertRuleRepository";

import { AlertRuleMapper } from "../mappers/AlertRuleMapper";
import { GetAlertRulesDTO } from "../../application/dto/getAlertRulesDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

@injectable()
export class PrismaAlertRuleRepository implements IAlertRuleRepository {

    async create(alertRule: AlertRule): Promise<AlertRule> {
        const created = await prisma.alertRule.create({
            data: AlertRuleMapper.toDb(alertRule),
        });

        return AlertRuleMapper.fromDb(created);
    }

    async findById(id: string): Promise<AlertRule | null> {
        const alertRule = await prisma.alertRule.findUnique({
            where: { id },
        });

        if (!alertRule) {
            return null;
        }

        return AlertRuleMapper.fromDb(alertRule);
    }

    async findAll(): Promise<AlertRule[]> {
        const alertRules = await prisma.alertRule.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return alertRules.map(AlertRuleMapper.fromDb);
    }

    async update(id: string, data: Partial<AlertRule>): Promise<AlertRule> {
        const updated = await prisma.alertRule.update({
            where: { id },
            data: AlertRuleMapper.toDb({
                ...(data as AlertRule),
            }),
        });

        return AlertRuleMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.alertRule.delete({
            where: { id },
        });
    }

    async findAlertRules(dto: GetAlertRulesDTO): Promise<PaginationResult<AlertRule>> {
        const { organizationId, monitoringProjectId, page, limit, } = dto;

        const skip = (page - 1) * limit;

        const where = { organizationId, monitoringProjectId, };

        const [alertRules, total] = await Promise.all([
            prisma.alertRule.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.alertRule.count({
                where,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            items: alertRules.map(AlertRuleMapper.fromDb),
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
        };
    }
}