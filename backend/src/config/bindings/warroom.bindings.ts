import { IWarRoomRepository } from "@/modules/war-room/domain/interface/IWarRoomRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { CloseWarRoomUseCase } from "@/modules/war-room/application/usecase/CloseWarRoomUseCase";
import { CreateWarRoomUseCase } from "@/modules/war-room/application/usecase/CreateWarRoomUseCase";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { GetWarRoomByIdUseCase } from "@/modules/war-room/application/usecase/GetWarRoomByIdUseCase";
import { GetWarRoomsUseCase } from "@/modules/war-room/application/usecase/GetWarRoomsUseCase";
import { JoinWarRoomUseCase } from "@/modules/war-room/application/usecase/JoinWarRoomUseCase";
import { ITeamMemberRepository } from "@/modules/team-management/domain/interfaces/ITeamMemberRepository";
import { LeaveWarRoomUseCase } from "@/modules/war-room/application/usecase/LeaveWarRoomUseCase";
import { WarRoomController } from "@/modules/war-room/presentation/controller/WarRoomController";
import { createWarRoomRoutes } from "@/modules/war-room/presentation/routes/WarRoomRoutes";
import { IWarRoomParticipantRepository } from "@/modules/war-room/domain/interface/IWarRoomParticipantRepository";
import { GetWarRoomParticipantsUseCase } from "@/modules/war-room/application/usecase/GetWarRoomParticipantsUseCase";
import { WarRoomParticipantController } from "@/modules/war-room/presentation/controller/WarRoomParticipantController";
import { createWarRoomParticipantRoutes } from "@/modules/war-room/presentation/routes/WarRoomParticipantRoutes";
import { IWarRoomMessageRepository } from "@/modules/war-room/domain/interface/IWarRoomMessageRepository";
import { SendWarRoomMessageUseCase } from "@/modules/war-room/application/usecase/SendWarRoomMessageUseCase";
import { GetWarRoomMessagesUseCase } from "@/modules/war-room/application/usecase/GetWarRoomMessagesUseCase";
import { WarRoomMessageController } from "@/modules/war-room/presentation/controller/WarRoomMessageController";
import { createWarRoomMessageRoutes } from "@/modules/war-room/presentation/routes/WarRoomMessageRoutes";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";

export function bindWarRoom(container: Container,createTimeLineEventUseCase:ICreateTimelineEventUseCase) {

    const warRoomRepository = container.get<IWarRoomRepository>(TYPES.warroomRepository);
    const incidentRepository = container.get<IIncidentRepository>(TYPES.IncidentRepository);
    const teamMemberRepository = container.get<ITeamMemberRepository>(TYPES.TeamMemberRepository);
    const warRoomParticipantsRepository = container.get<IWarRoomParticipantRepository>(TYPES.warroomParticipantsRepository);
    const warRoomMessageRepository = container.get<IWarRoomMessageRepository>(TYPES.warRoomMessageRepository);


    const closeWarRoomUseCase = new CloseWarRoomUseCase(
        warRoomRepository,
        createTimeLineEventUseCase
    )

    const createWarRoomUseCase = new CreateWarRoomUseCase(
        warRoomRepository,
        incidentRepository,
        createTimeLineEventUseCase
    )

    const getWarRoomByIdUseCase = new GetWarRoomByIdUseCase(
        warRoomRepository
    )

    const getWarRoomsUseCase = new GetWarRoomsUseCase(
        warRoomRepository
    )

    const joinWarRoomUseCase = new JoinWarRoomUseCase(
        warRoomRepository,
        teamMemberRepository,
        incidentRepository,
        warRoomParticipantsRepository,
        createTimeLineEventUseCase
    )

    const leaveWarRoomUseCase = new LeaveWarRoomUseCase(
        warRoomRepository,
        incidentRepository,
        teamMemberRepository,
        warRoomParticipantsRepository,
        createTimeLineEventUseCase
    )

    const warRoomController = new WarRoomController(
        createWarRoomUseCase,
        getWarRoomsUseCase,
        getWarRoomByIdUseCase,
        closeWarRoomUseCase,
        joinWarRoomUseCase,
        leaveWarRoomUseCase
    )

    const warRoomRouter = createWarRoomRoutes(
        warRoomController
    )

    const getWarRoomParticipantsUseCase = new GetWarRoomParticipantsUseCase(
        warRoomParticipantsRepository
    )

    const warRoomParticipantController = new WarRoomParticipantController(
        getWarRoomParticipantsUseCase
    )

    const warRoomParticipantsRouter = createWarRoomParticipantRoutes(
        warRoomParticipantController
    )

    const sendWarRoomMessageUseCase = new SendWarRoomMessageUseCase(
        warRoomRepository,
        warRoomParticipantsRepository,
        warRoomMessageRepository,
    );

    const getWarRoomMessagesUseCase = new GetWarRoomMessagesUseCase(
        warRoomRepository,
        warRoomParticipantsRepository,
        warRoomMessageRepository,
    );

    const warRoomMessageController = new WarRoomMessageController(
        getWarRoomMessagesUseCase,
    );

    const warRoomMessageRouter = createWarRoomMessageRoutes(
        warRoomMessageController,
    );

    return {
        warRoomRouter,
        warRoomParticipantsRouter,
        joinWarRoomUseCase,
        leaveWarRoomUseCase,
        getWarRoomParticipantsUseCase,
        sendWarRoomMessageUseCase,
        getWarRoomMessagesUseCase,
        warRoomMessageRouter,
        createWarRoomUseCase
    }

}