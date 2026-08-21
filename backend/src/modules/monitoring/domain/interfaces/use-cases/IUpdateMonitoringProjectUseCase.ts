import { MonitoringProject } from "../../entities/monitoringProject.entity";
import { UpdateMonitoringProjectDTO } from "../../../application/dto/updateMonitoringProject.dto";

export interface IUpdateMonitoringProjectUseCase {
    execute(id: string, organizationId: string, dto: UpdateMonitoringProjectDTO): Promise<MonitoringProject>;
}