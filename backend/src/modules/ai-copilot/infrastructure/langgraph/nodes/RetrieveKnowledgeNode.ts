import { IncidentCopilotState } from "../state/IncidentCopilotState";
import { IRetrieveKnowledgeNode } from "@/modules/ai-copilot/domain/interface/langgraph/node/IRetrieveKnowledgeNode";
import { IKnowledgeRetrieverFactory } from "@/modules/ai-copilot/domain/interface/IKnowledgeRetrieverFactory";

export class RetrieveKnowledgeNode implements IRetrieveKnowledgeNode {

    constructor(
        private readonly knowledgeRetrieverFactory: IKnowledgeRetrieverFactory
    ) { }

    async execute(state: typeof IncidentCopilotState.State) {

        const knowledgeRetriever = this.knowledgeRetrieverFactory.create(
            state.organizationId
        );

        const query = `${state.incident.title} ${state.incident.description ?? ""}`;

        const retrievedDocuments = await knowledgeRetriever.retrieve(
            query
        );

        return {
            retrievedDocuments,
        };
    }

}