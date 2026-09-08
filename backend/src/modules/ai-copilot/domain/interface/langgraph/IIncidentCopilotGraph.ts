import { IncidentCopilotState } from "@/modules/ai-copilot/infrastructure/langgraph/state/IncidentCopilotState";

export interface IIncidentCopilotGraph {

    invoke(state: typeof IncidentCopilotState.State): Promise<typeof IncidentCopilotState.State>;

}