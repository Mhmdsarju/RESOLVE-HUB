import { injectable } from "inversify";

import {
    Prisma,
    AuditAction as PrismaAuditAction,
    AuditEntityType as PrismaAuditEntityType,
} from "@prisma/client";

import { prisma } from "@/config/database";

import { IAuditLogRepository } from "../../domain/interface/IAuditLogRepository";
import { AuditLog } from "../../domain/entity/auditLog.entity";
import { AuditLogMapper } from "../mappers/AuditLogMapper";

import { GetAuditLogsDto } from "../../application/dto/GetAuditLogsDto";

@injectable()
export class PrismaAuditLogRepository implements IAuditLogRepository {

    async create(auditLog: AuditLog): Promise<AuditLog> {
        const created = await prisma.auditLog.create({
            data: AuditLogMapper.toDb(auditLog),
        });

        return AuditLogMapper.fromDb(created);
    }

    async findByOrganizationId(
        dto: GetAuditLogsDto,
    ): Promise<{
        data: AuditLog[];
        total: number;
    }> {
        const search = dto.search?.trim();

        const skip = (dto.page - 1) * dto.limit;

        const where: Prisma.AuditLogWhereInput = {
            organizationId: dto.organizationId,

            ...(dto.action && {
                action: dto.action as PrismaAuditAction,
            }),

            ...(dto.entityType && {
                entityType: dto.entityType as PrismaAuditEntityType,
            }),

            ...(search && {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            }),
        };

        const [auditLogs, total] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                skip,
                take: dto.limit,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.auditLog.count({
                where,
            }),
        ]);

        return {
            data: auditLogs.map(AuditLogMapper.fromDb),
            total,
        };
    }
}