import { IncidentCopilotState } from "@/modules/ai-copilot/infrastructure/langgraph/state/IncidentCopilotState";

export interface IGenerateRCANode {
    execute(state: typeof IncidentCopilotState.State): Promise<{
        summary: string;
        rootCause: string;
    }>;

}