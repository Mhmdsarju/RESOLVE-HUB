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


export function bindIncident(container: Container) {

    const incidentRepository = container.get<IIncidentRepository>(TYPES.IncidentRepository);
    const assignTeamUseCase = new AssignTeamUseCase(incidentRepository);
    const createIncidentUseCase = new CreateIncidentUseCase(incidentRepository);
    const getIncidentByIdUseCase = new GetIncidentByIdUseCase(incidentRepository);
    const getIncidentStatsUseCase = new GetIncidentStatsUseCase(incidentRepository);
    const getIncidentsUseCase = new GetIncidentsUseCase(incidentRepository);
    const updateIncidentStatusUseCase = new UpdateIncidentStatusUseCase(incidentRepository);

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