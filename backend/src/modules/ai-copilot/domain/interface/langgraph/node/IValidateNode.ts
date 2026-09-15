import { IncidentCopilotState } from "@/modules/ai-copilot/infrastructure/langgraph/state/IncidentCopilotState";

export interface IValidateNode {
    execute(state: typeof IncidentCopilotState.State): Promise<{
        rootCause: string | null;
        recommendation: string | null;
    }>;

}