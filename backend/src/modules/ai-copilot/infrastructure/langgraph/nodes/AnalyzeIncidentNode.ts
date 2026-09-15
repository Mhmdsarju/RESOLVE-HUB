import { IncidentCopilotState } from "../state/IncidentCopilotState";
import { IAnalyzeIncidentNode } from "@/modules/ai-copilot/domain/interface/langgraph/node/IAnalyzeIncidentNode";
import { IGetIncidentByIdUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentByIdUseCase";

export class AnalyzeIncidentNode implements IAnalyzeIncidentNode {

    constructor(
        private readonly getIncidentByIdUseCase: IGetIncidentByIdUseCase
    ) { }

    async execute(state: typeof IncidentCopilotState.State) {

        const incident = await this.getIncidentByIdUseCase.execute(
            state.incidentId,
            state.organizationId
        );

        return {
            incident: {
                title: incident.title,
                description: incident.description ?? null,
                severity: incident.severity,
                priority: incident.priority,
                status: incident.status,
                type: incident.type,
            },
        };
    }

}