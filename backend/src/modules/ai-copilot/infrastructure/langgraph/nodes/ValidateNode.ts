import { IncidentCopilotState } from "../state/IncidentCopilotState";
import { IValidateNode } from "@/modules/ai-copilot/domain/interface/langgraph/node/IValidateNode";

export class ValidateNode implements IValidateNode {

    async execute(state: typeof IncidentCopilotState.State) {

        const summary = state.summary?.trim()
            ? state.summary
            : null;

        const rootCause = state.rootCause?.trim()
            ? state.rootCause
            : null;

        const recommendation = state.recommendation?.trim()
            ? state.recommendation
            : null;

        return {
            summary,
            rootCause,
            recommendation,
        };
    }

}