import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { WarRoom } from "../../domain/entity/warRoom.entity";
import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

import { CreateWarRoomDto } from "../dto/createWarRoomDto";
import { ICreateWarRoomUseCase } from "../../domain/interface/usecase/ICreateWarRoomUseCase";

export class CreateWarRoomUseCase implements ICreateWarRoomUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
        private readonly incidentRepository: IIncidentRepository,
    ) { }

    async execute(
        dto: CreateWarRoomDto,
        createdBy: string,
    ): Promise<WarRoom> {

        const incident = await this.incidentRepository.findById(
            dto.incidentId,
        );

        if (!incident) {
            throw new AppError("Incident not found", HttpStatusCode.NOT_FOUND,);
        }

        const existingWarRoom = await this.warRoomRepository.findByIncidentId(
            dto.incidentId,
        );

        if (existingWarRoom) {
            throw new AppError("War room already exists for this incident", HttpStatusCode.CONFLICT,);
        }

        const warRoom = new WarRoom({
            incidentId: dto.incidentId,
            createdBy,
            status: WarRoomStatus.ACTIVE,
        });

        return await this.warRoomRepository.create(warRoom);
    }
}