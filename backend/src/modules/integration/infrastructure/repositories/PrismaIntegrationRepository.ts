import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { Integration } from "../../domain/entities/integration.entity";
import { IIntegrationRepository } from "../../domain/interfaces/IIntegrationRepository";
import { IntegrationMapper } from "../mappers/IntegrationMapper";

@injectable()
export class PrismaIntegrationRepository implements IIntegrationRepository {

    async create(integration: Integration): Promise<Integration> {
        const created = await prisma.integration.create({
            data: IntegrationMapper.toDb(integration),
        });

        return IntegrationMapper.fromDb(created);
    }

    async findById(id: string): Promise<Integration | null> {
        const integration = await prisma.integration.findUnique({
            where: { id },
        });

        if (!integration) {
            return null;
        }

        return IntegrationMapper.fromDb(integration);
    }

    async findAll(): Promise<Integration[]> {
        const integrations = await prisma.integration.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return integrations.map(IntegrationMapper.fromDb);
    }

    async update(id: string, data: Partial<Integration>): Promise<Integration> {

        const updated = await prisma.integration.update({
            where: { id },
            data: IntegrationMapper.toDb({
                ...(data as Integration),
            }),
        });

        return IntegrationMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.integration.delete({
            where: { id },
        });
    }

    async findAllByMonitoringProject(monitoringProjectId: string, organizationId: string, skip: number, take: number): Promise<{ data: Integration[]; total: number }> {
        const where = {
            monitoringProjectId,
            organizationId,
        };

        const [integrations, total] = await Promise.all([
            prisma.integration.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: "desc",
                },
            }),

            prisma.integration.count({
                where,
            }),
        ]);

        return {
            data: integrations.map(IntegrationMapper.fromDb),
            total,
        };
    }



    async findByProjectAndName(monitoringProjectId: string, organizationId: string, name: string): Promise<Integration | null> {
        const integration = await prisma.integration.findFirst({
            where: {
                monitoringProjectId,
                organizationId,
                name,
            },
        });

        if (!integration) {
            return null;
        }

        return IntegrationMapper.fromDb(integration);
    }

}