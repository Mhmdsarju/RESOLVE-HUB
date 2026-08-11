import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { Alert } from "../../domain/entities/alert.entity";
import { IAlertRepository } from "../../domain/interfaces/IAlertRepository";
import { AlertMapper } from "../mappers/AlertMapper";
import { GetAlertsDTO } from "../../application/dto/getAlertsDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

@injectable()
export class PrismaAlertRepository implements IAlertRepository {

    async create(alert: Alert): Promise<Alert> {
        const created = await prisma.alert.create({
            data: AlertMapper.toDb(alert),
        });

        return AlertMapper.fromDb(created);
    }

    async findById(id: string): Promise<Alert | null> {
        const alert = await prisma.alert.findUnique({
            where: { id },
        });

        if (!alert) {
            return null;
        }

        return AlertMapper.fromDb(alert);
    }

    async findAll(): Promise<Alert[]> {
        const alerts = await prisma.alert.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return alerts.map(AlertMapper.fromDb);
    }

    async update(id: string, data: Partial<Alert>): Promise<Alert> {
        const updated = await prisma.alert.update({
            where: { id },
            data: AlertMapper.toDb({
                ...(data as Alert),
            }),
        });

        return AlertMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.alert.delete({
            where: { id },
        });
    }

    async findAlerts(dto: GetAlertsDTO): Promise<PaginationResult<Alert>> {
        const { organizationId, monitoringProjectId, page, limit, } = dto;

        const skip = (page - 1) * limit;

        const where = { organizationId, monitoringProjectId, };

        const [alerts, total] = await Promise.all([
            prisma.alert.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.alert.count({
                where,
            }),
        ]);

        return {
            items: alerts.map(AlertMapper.fromDb),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}