import { IncidentCopilotState } from "@/modules/ai-copilot/infrastructure/langgraph/state/IncidentCopilotState";

export interface IRetrieveKnowledgeNode {

    execute(state: typeof IncidentCopilotState.State): Promise<{

        retrievedDocuments: typeof IncidentCopilotState.State.retrievedDocuments;

    }>;

}