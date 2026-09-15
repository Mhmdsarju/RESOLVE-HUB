
import { IncidentCopilotState } from "../state/IncidentCopilotState";

export function evaluateEvidence(state: typeof IncidentCopilotState.State): "enoughEvidence" | "retrieveMoreKnowledge" | "insufficientEvidence" {

    if (state.evidence.length > 0) {
        return "enoughEvidence";
    }

    if (state.retryCount < 2) {
        return "retrieveMoreKnowledge";
    }

    return "insufficientEvidence";
}

