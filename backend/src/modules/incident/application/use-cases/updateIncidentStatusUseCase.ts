import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";

import { IUpdateIncidentStatusUseCase } from "../../domain/interfaces/use-cases/IUpdateIncidentStatusUseCase";
import { IIncidentRepository } from "../../domain/interfaces/IIncidentRepository";

import { UpdateIncidentStatusDto } from "../dto/updateIncidentStatusDto";
import { Status } from "../../domain/enums/status.enum";
import { Incident } from "../../domain/entities/incident.entity";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class UpdateIncidentStatusUseCase implements IUpdateIncidentStatusUseCase{
    constructor(
        @inject(TYPES.IncidentRepository)
        private readonly incidentRepository:IIncidentRepository
    ){}

    async execute(id: string, dto: UpdateIncidentStatusDto): Promise<Incident> {
        const incident= await this.incidentRepository.findById(id);
        if(!incident){
            throw new AppError("Incident not Found",HttpStatusCode.NOT_FOUND);
        }

        if(incident.status==Status.CLOSED){
            throw new AppError("Closed incident cannot be updated",HttpStatusCode.BAD_REQUEST)
        }

        const updated=await this.incidentRepository.update(id,{status:dto.status});

        return updated;
    }

}