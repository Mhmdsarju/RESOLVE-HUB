import { IncidentCopilotState } from "@/modules/ai-copilot/infrastructure/langgraph/state/IncidentCopilotState";

export interface IEvaluateEvidenceNode {
    execute(state: typeof IncidentCopilotState.State): Promise<{
        evidence: typeof IncidentCopilotState.State.evidence;
    }>;

}