import { CreateMonitoringProjectDTO } from "@/modules/monitoring/application/dto/createMonitoringProjectDto";
import { MonitoringProject } from "../../entities/monitoringProject.entity";

export interface ICreateMonitoringProjectUseCase {
  execute(dto: CreateMonitoringProjectDTO): Promise<MonitoringProject>;
}