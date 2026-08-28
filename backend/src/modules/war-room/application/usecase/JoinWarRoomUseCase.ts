import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IWarRoomRepository } from "../../domain/interface/IWarRoomRepository";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";

import { WarRoom } from "../../domain/entity/warRoom.entity";
import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

import { IJoinWarRoomUseCase } from "../../domain/interface/usecase/IJoinWarRoomUseCase";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { IWarRoomParticipantRepository } from "../../domain/interface/IWarRoomParticipantRepository";

import { WarRoomParticipant } from "../../domain/entity/warRoomParticipant";

export class JoinWarRoomUseCase implements IJoinWarRoomUseCase {

    constructor(
        private readonly warRoomRepository: IWarRoomRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly incidentRepository: IIncidentRepository,
        private readonly warRoomParticipantRepository: IWarRoomParticipantRepository
    ) { }

    async execute(id: string, userId: string,userRole:string): Promise<WarRoom> {

        if (!id?.trim()) {
            throw new AppError("War room ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        if (!userId?.trim()) {
            throw new AppError("User ID is required", HttpStatusCode.BAD_REQUEST,);
        }

        const warRoom = await this.warRoomRepository.findById(id);

        if (!warRoom) {
            throw new AppError("War room not found", HttpStatusCode.NOT_FOUND,);
        }

        if (warRoom.status === WarRoomStatus.CLOSED) {
            throw new AppError("Cannot join a closed war room", HttpStatusCode.BAD_REQUEST,);
        }

        const incident = await this.incidentRepository.findById(
            warRoom.incidentId,
        );

        if (!incident) {
            throw new AppError("Incident not found", HttpStatusCode.NOT_FOUND,);
        }

        if (!incident.assignedTeamId) {
            throw new AppError("Incident is not assigned to a team", HttpStatusCode.BAD_REQUEST,);
        }

        if (userRole !== "ORG_ADMIN") {

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

        const participant = await this.warRoomParticipantRepository.findByWarRoomAndUser(
            id,
            userId,
        );

        if (participant) {

            if (!participant.leftAt) {
                return warRoom;
            }

            await this.warRoomParticipantRepository.update(
                participant.id!,
                {
                    leftAt: null,
                    joinedAt: new Date(),
                },
            );

            return warRoom;
        }

        const newParticipant = new WarRoomParticipant({
            warRoomId: id,
            userId,
            joinedAt: new Date(),
            leftAt: null,
        });

        await this.warRoomParticipantRepository.create(
            newParticipant,
        );

        return warRoom;
    }
}