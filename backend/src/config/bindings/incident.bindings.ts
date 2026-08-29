import { Container } from "inversify";
import { TYPES } from "../types";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { IncidentController } from "@/modules/incident/presentation/controllers/IncidentController";
import { CreateIncidentUseCase } from "@/modules/incident/application/use-cases/CreateIncidentUseCase";
import { UpdateIncidentStatusUseCase } from "@/modules/incident/application/use-cases/updateIncidentStatusUseCase";
import { AssignTeamUseCase } from "@/modules/incident/application/use-cases/assignTeamUseCase";
import { GetIncidentByIdUseCase } from "@/modules/incident/application/use-cases/getIncidentByIdUseCase";
import { GetIncidentStatsUseCase } from "@/modules/incident/application/use-cases/GetIncidentStatsUseCase";
import { GetIncidentsUseCase } from "@/modules/incident/application/use-cases/GetIncidentsUseCase";
import { createIncidentRoutes } from "@/modules/incident/presentation/routes/incident.routes";
import { ICreateWarRoomUseCase } from "@/modules/war-room/domain/interface/usecase/ICreateWarRoomUseCase";
import { ICreateTimelineEventUseCase } from "@/modules/timeline/domain/interfaces/usecases/ICreateTimelineEventUseCase";
import { ITeamRepository } from "@/modules/team-management/domain/interfaces/ITeamRepository";


export function bindIncident(container: Container,createTimeLineEventUseCase:ICreateTimelineEventUseCase,createWarRoomUseCase:ICreateWarRoomUseCase) {

    const incidentRepository = container.get<IIncidentRepository>(TYPES.IncidentRepository);
    const teamRepository=container.get<ITeamRepository>(TYPES.TeamRepository)

    const assignTeamUseCase = new AssignTeamUseCase(incidentRepository,createTimeLineEventUseCase,teamRepository);
    const createIncidentUseCase = new CreateIncidentUseCase(incidentRepository,createWarRoomUseCase,createTimeLineEventUseCase);
    const getIncidentByIdUseCase = new GetIncidentByIdUseCase(incidentRepository);
    const getIncidentStatsUseCase = new GetIncidentStatsUseCase(incidentRepository);
    const getIncidentsUseCase = new GetIncidentsUseCase(incidentRepository);
    const updateIncidentStatusUseCase = new UpdateIncidentStatusUseCase(incidentRepository,createTimeLineEventUseCase);

    const incidentController = new IncidentController(
        createIncidentUseCase,
        updateIncidentStatusUseCase,
        assignTeamUseCase,
        getIncidentByIdUseCase,
        getIncidentsUseCase,
        getIncidentStatsUseCase,
    );

    const incidentRouter = createIncidentRoutes(incidentController);

    return { incidentRouter, createIncidentUseCase }

}