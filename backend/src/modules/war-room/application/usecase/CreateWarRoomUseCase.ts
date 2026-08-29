import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { WarRoom } from "../../domain/entity/warRoom.entity";
import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

import { CreateWarRoomDto } from "../dto/createWarRoomDto";
import { ICreateWarRoomUseCase } from "../../domain/interface/usecase/ICreateWarRoomUseCase";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { TimelineEventType } from "@/modules/timeline/domain/enums/timelineEventType.enum";

export class CreateWarRoomUseCase implements ICreateWarRoomUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
        private readonly incidentRepository: IIncidentRepository,
        private readonly createTimelineEventUseCase: ICreateTimelineEventUseCase,
    ) { }

    async execute(dto: CreateWarRoomDto, createdBy?: string | null,): Promise<WarRoom> {

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
            createdBy: createdBy ?? null,
            status: WarRoomStatus.ACTIVE,
        });

        const createdWarRoom = await this.warRoomRepository.create(warRoom);

        await this.createTimelineEventUseCase.execute(
            dto.incidentId,
            TimelineEventType.WAR_ROOM_CREATED,
            "War room created",
            createdBy ?? null,
        );

        return createdWarRoom;
    }
}