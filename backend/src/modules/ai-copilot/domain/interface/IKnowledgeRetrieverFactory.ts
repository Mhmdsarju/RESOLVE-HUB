import { IKnowledgeRetriever } from "./IKnowledgeRetriever";

export interface IKnowledgeRetrieverFactory {
    create(
        organizationId: string
    ): IKnowledgeRetriever;
}