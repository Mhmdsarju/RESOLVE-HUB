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

export function bindWarRoom(container:Container){

    const warRoomRepository=container.get<IWarRoomRepository>(TYPES.warroomRepository);
    const incidentRepository=container.get<IIncidentRepository>(TYPES.IncidentRepository);
    const teamMemberRepository=container.get<ITeamMemberRepository>(TYPES.TeamMemberRepository);

    const closeWarRoomUseCase=new CloseWarRoomUseCase(
        warRoomRepository
    )

    const createWarRoomUseCase=new CreateWarRoomUseCase(
        warRoomRepository,
        incidentRepository
    )

    const getWarRoomByIdUseCase=new GetWarRoomByIdUseCase(
        warRoomRepository
    )

    const getWarRoomsUseCase=new GetWarRoomsUseCase(
        warRoomRepository
    )

    const joinWarRoomUseCase=new JoinWarRoomUseCase(
        warRoomRepository,
        teamMemberRepository,
        incidentRepository
    )

    const leaveWarRoomUseCase=new LeaveWarRoomUseCase(
        warRoomRepository,
        incidentRepository,
        teamMemberRepository,
    )

    const warRoomController=new WarRoomController(
        createWarRoomUseCase,
        getWarRoomsUseCase,
        getWarRoomByIdUseCase,
        closeWarRoomUseCase,
        joinWarRoomUseCase,
        leaveWarRoomUseCase
    )

    const warRoomRouter=createWarRoomRoutes(
        warRoomController
    )

    return {
        warRoomRouter
    }

}