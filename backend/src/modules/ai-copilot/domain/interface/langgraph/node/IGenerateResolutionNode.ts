import { IncidentCopilotState } from "@/modules/ai-copilot/infrastructure/langgraph/state/IncidentCopilotState";

export interface IGenerateResolutionNode {
    execute(state: typeof IncidentCopilotState.State): Promise<{
        recommendation: string;
    }>;

}