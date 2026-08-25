import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository"; 

import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

import { ILeaveWarRoomUseCase } from "../../domain/interface/usecase/ILeaveWarRoomUseCase";

export class LeaveWarRoomUseCase implements ILeaveWarRoomUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
        private readonly incidentRepository: IIncidentRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }

    async execute(
        id: string,
        userId: string,
    ): Promise<void> {

        if (!id?.trim()) {
            throw new AppError(
                "War room ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        if (!userId?.trim()) {
            throw new AppError(
                "User ID is required",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const warRoom = await this.warRoomRepository.findById(id);

        if (!warRoom) {
            throw new AppError(
                "War room not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        if (warRoom.status === WarRoomStatus.CLOSED) {
            throw new AppError(
                "Cannot leave a closed war room",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const incident = await this.incidentRepository.findById(
            warRoom.incidentId,
        );

        if (!incident) {
            throw new AppError(
                "Incident not found",
                HttpStatusCode.NOT_FOUND,
            );
        }

        if (!incident.assignedTeamId) {
            throw new AppError(
                "Incident is not assigned to a team",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        const teamMember = await this.teamMemberRepository.findMember(
            incident.assignedTeamId,
            userId,
        );

        if (!teamMember) {
            throw new AppError(
                "You are not a member of the assigned team",
                HttpStatusCode.FORBIDDEN,
            );
        }
    }
}