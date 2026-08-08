import { Container } from "inversify";
import { TYPES } from "../types";
import { IIncidentRepository } from "@/modules/incident/domain/interfaces/IIncidentRepository";
import { IncidentController } from "@/modules/incident/presentation/controllers/IncidentController";
import { PrismaIncidentRepository } from "@/modules/incident/infrastructure/repositories/PrismaIncidentRepository";
import { ICreateIncidentUseCase } from "@/modules/incident/domain/interfaces/use-cases/ICreateIncidentUseCase";
import { CreateIncidentUseCase } from "@/modules/incident/application/use-cases/CreateIncidentUseCase";
import { IUpdateIncidentStatusUseCase } from "@/modules/incident/domain/interfaces/use-cases/IUpdateIncidentStatusUseCase";
import { UpdateIncidentStatusUseCase } from "@/modules/incident/application/use-cases/updateIncidentStatusUseCase";
import { IAssignTeamUseCase } from "@/modules/incident/domain/interfaces/use-cases/IAssignTeamUseCase";
import { AssignTeamUseCase } from "@/modules/incident/application/use-cases/assignTeamUseCase";
import { IGetIncidentByIdUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentByIdUseCase";
import { GetIncidentByIdUseCase } from "@/modules/incident/application/use-cases/getIncidentByIdUseCase";


export function bindIncident(container:Container){
    container.bind<IIncidentRepository>(TYPES.IncidentRepository).to(PrismaIncidentRepository);
    container.bind<IncidentController>(TYPES.IncidentController).to(IncidentController);

    container.bind<ICreateIncidentUseCase>(TYPES.CreateIncidentUseCase).to(CreateIncidentUseCase);
    container.bind<IUpdateIncidentStatusUseCase>(TYPES.UpdateIncidentStatusUseCase).to(UpdateIncidentStatusUseCase);
    container.bind<IAssignTeamUseCase>(TYPES.AssignTeamUseCase).to(AssignTeamUseCase).inSingletonScope()
    container.bind<IGetIncidentByIdUseCase>(TYPES.GetIncidentByIdUseCase).to(GetIncidentByIdUseCase).inSingletonScope();

}