import { injectable } from "inversify";
import { prisma } from "@/config/database";

import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";
import { Incident } from "../../domain/entities/incident.entity";
import { IncidentMapper } from "../mappers/IncidentMapper";

import { Status } from "../../domain/enums/status.enum";
import { Priority } from "../../domain/enums/priority.enum";
import { Severity } from "../../domain/enums/severity.enum";

@injectable()
export class PrismaIncidentRepository implements IIncidentRepository {

  async create(incident: Incident): Promise<Incident> {
    const created = await prisma.incident.create({
      data: IncidentMapper.toDb(incident),
    });

    return IncidentMapper.fromDb(created);
  }

  async findById(id: string): Promise<Incident | null> {
    const data = await prisma.incident.findUnique({
      where: { id },
    });

    if (!data) return null;

    return IncidentMapper.fromDb(data);
  }

  async findAll(): Promise<Incident[]> {
    const data = await prisma.incident.findMany({
      orderBy: { createdAt: "desc" },
    });

    return data.map(IncidentMapper.fromDb);
  }

  // 🔥 MAIN METHOD (Pagination + Filters)
  async findAllWithPagination(params: {
    organizationId: string;
    skip: number;
    take: number;
    filters?: {
      status?: Status;
      priority?: Priority;
      severity?: Severity;
      assignedTeamId?: string;
    };
  }): Promise<{ data: Incident[]; total: number }> {

    const { organizationId, skip, take, filters } = params;

    const where = {
      organizationId,
      status: filters?.status,
      priority: filters?.priority,
      severity: filters?.severity,
      assignedTeamId: filters?.assignedTeamId,
    };

    const [data, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.incident.count({ where }),
    ]);

    return {
      data: data.map(IncidentMapper.fromDb),
      total,
    };
  }

  async update(id: string, data: Partial<Incident>): Promise<Incident> {
    const updated = await prisma.incident.update({
      where: { id },
      data: IncidentMapper.toDb(data as Incident),
    });

    return IncidentMapper.fromDb(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.incident.delete({
      where: { id },
    });
  }
}