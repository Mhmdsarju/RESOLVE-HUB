import { IncidentCopilotState } from "../state/IncidentCopilotState";
import { IEvaluateEvidenceNode } from "@/modules/ai-copilot/domain/interface/langgraph/node/IEvaluateEvidenceNode";

export class EvaluateEvidenceNode implements IEvaluateEvidenceNode {

    async execute(state: typeof IncidentCopilotState.State) {

        const evidence = state.retrievedDocuments.filter(
            (chunk) => chunk.similarity >= 0.5
        );

        return {
            evidence,
        };
    }

}