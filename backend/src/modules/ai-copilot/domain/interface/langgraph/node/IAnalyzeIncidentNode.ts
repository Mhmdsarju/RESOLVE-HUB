import { IncidentCopilotState } from "@/modules/ai-copilot/infrastructure/langgraph/state/IncidentCopilotState";

export interface IAnalyzeIncidentNode {
    execute(state: typeof IncidentCopilotState.State): Promise<{
        incident: typeof IncidentCopilotState.State.incident;
    }>;

}