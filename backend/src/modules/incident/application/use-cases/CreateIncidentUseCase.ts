import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { ICreateIncidentUseCase } from "../../domain/interfaces/use-cases/ICreateIncidentUseCase";
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";

import { CreateIncidentDto } from "../dto/createIncidentDto";
import { Incident } from "../../domain/entities/incident.entity";

import { Status } from "../../domain/enums/status.enum";
import { Priority } from "../../domain/enums/priority.enum";

@injectable()
export class CreateIncidentUseCase implements ICreateIncidentUseCase {
  constructor(
    @inject(TYPES.IncidentRepository)
    private readonly incidentRepository: IIncidentRepository
  ) { }

  async execute(dto: CreateIncidentDto, userId: string | undefined, organizationId: string): Promise<Incident> {

    const priority = dto.priority ?? Priority.P3;

    const status = Status.OPEN;

    const incident = new Incident({
      title: dto.title,
      description: dto.description,
      severity: dto.severity,
      priority,
      status,
      type: dto.type,
      organizationId,
      createdBy: dto.type === "MANUAL" ? userId ?? null : null,
      assignedTeamId: dto.assignedTeamId ?? null,
    });

    return await this.incidentRepository.create(incident);
  }
}