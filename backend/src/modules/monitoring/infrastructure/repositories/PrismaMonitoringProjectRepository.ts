import { injectable } from "inversify";
import { prisma } from "@/config/database";

import { MonitoringProject } from "../../domain/entities/monitoringProject.entity";
import { IMonitoringProjectRepository } from "../../domain/interfaces/IMonitoringProjectRepository";
import { MonitoringProjectMapper } from "../mappers/MonitoringProjectMapper";
@injectable()
export class PrismaMonitoringProjectRepository implements IMonitoringProjectRepository {
    async create(project: MonitoringProject): Promise<MonitoringProject> {
        const created = await prisma.monitoringProject.create({
            data: MonitoringProjectMapper.toDB(project),
        });

        return MonitoringProjectMapper.fromDB(created);
    }

    async findById(id: string): Promise<MonitoringProject | null> {
        const project = await prisma.monitoringProject.findUnique({
            where: { id },
        });

        if (!project) return null;

        return MonitoringProjectMapper.fromDB(project);
    }

    async findAll(): Promise<MonitoringProject[]> {
        const projects = await prisma.monitoringProject.findMany({
            orderBy: { createdAt: "desc" },
        });

        return projects.map(MonitoringProjectMapper.fromDB);
    }

    async update(id: string, data: Partial<MonitoringProject>): Promise<MonitoringProject> {
        const updated = await prisma.monitoringProject.update({
            where: { id },
            data: MonitoringProjectMapper.toDB({
                ...(data as MonitoringProject),
            }),
        });

        return MonitoringProjectMapper.fromDB(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.monitoringProject.delete({
            where: { id },
        });
    }


    async findByName(name: string, organizationId: string): Promise<MonitoringProject | null> {
        const project = await prisma.monitoringProject.findFirst({
            where: {
                name,
                organizationId,
            },
        });

        if (!project) return null;

        return MonitoringProjectMapper.fromDB(project);
    }

    async findAllByOrganization(organizationId: string): Promise<MonitoringProject[]> {
        const projects = await prisma.monitoringProject.findMany({
            where: { organizationId },
            orderBy: { createdAt: "desc" },
        });

        return projects.map(MonitoringProjectMapper.fromDB);
    }

    async findAllByOrganizationPaginated(
        organizationId: string,
        skip: number,
        take: number
    ): Promise<{ data: MonitoringProject[]; total: number }> {

        const [projects, total] = await Promise.all([
            prisma.monitoringProject.findMany({
                where: { organizationId },
                skip,
                take,
                orderBy: { createdAt: "desc" },
            }),
            prisma.monitoringProject.count({
                where: { organizationId },
            }),
        ]);

        return {
            data: projects.map(MonitoringProjectMapper.fromDB),
            total,
        };
    }
}