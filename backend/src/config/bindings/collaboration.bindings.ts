import { Server } from "socket.io";
import { Container } from "inversify";

import { TYPES } from "../types";

import { ITokenService } from "@/modules/auth/domain/interfaces/ITokenService";
import { IJoinWarRoomUseCase } from "@/modules/war-room/domain/interface/usecase/IJoinWarRoomUseCase";
import { ILeaveWarRoomUseCase } from "@/modules/war-room/domain/interface/usecase/ILeaveWarRoomUseCase";
import { IGetWarRoomParticipantsUseCase } from "@/modules/war-room/domain/interface/usecase/IGetWarRoomParticipantsUseCase";
import { ISendWarRoomMessageUseCase } from "@/modules/war-room/domain/interface/usecase/ISendWarRoomMessageUseCase";

import { CollaborationSocketHandler } from "@/modules/collaboration/infrastructure/websocket/CollaborationSocketHandler";
import { CollaborationRoomManager } from "@/modules/collaboration/infrastructure/websocket/CollaborationRoomManager";
import { IGetUserByIdUseCase } from "@/modules/auth/domain/interfaces/use-cases/IGetUserByIdUseCase";
import { WebRTCSignalingHandler } from "@/modules/collaboration/infrastructure/webrtc/WebRTCSignalingHandler";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";

export function bindCollaboration(
    container: Container,
    io: Server,
    joinWarRoomUseCase: IJoinWarRoomUseCase,
    leaveWarRoomUseCase: ILeaveWarRoomUseCase,
    getWarRoomParticipantsUseCase: IGetWarRoomParticipantsUseCase,
    sendWarRoomMessageUseCase: ISendWarRoomMessageUseCase,
    getUserByIdUseCase: IGetUserByIdUseCase,
) {

    const tokenService = container.get<ITokenService>(TYPES.TokenService,);

    const roomManager = new CollaborationRoomManager(
        io,
    );
    const organizationRepository = container.get<IOrganizationRepository>(
        TYPES.OrganizationRepository,
    );

    const collaborationSocketHandler = new CollaborationSocketHandler(
        io,
        tokenService,
        roomManager,
        joinWarRoomUseCase,
        leaveWarRoomUseCase,
        getWarRoomParticipantsUseCase,
        sendWarRoomMessageUseCase,
        getUserByIdUseCase,
        organizationRepository
    );

    const webRTCSignalingHandler = new WebRTCSignalingHandler(
        io,
        roomManager,
    )

    collaborationSocketHandler.initialize();

    webRTCSignalingHandler.initialize();

    console.log("Collaboration socket initialized");

    return {
        collaborationSocketHandler,
        webRTCSignalingHandler
    };

}