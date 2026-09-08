import { IKnowledgeRetrieverFactory } from "../../domain/interface/IKnowledgeRetrieverFactory";
import { IKnowledgeRetriever } from "../../domain/interface/IKnowledgeRetriever";
import { ISearchKnowledgeUseCase } from "../../domain/interface/ISearchKnowledgeUseCase";
import { KnowledgeRetriever } from "./KnowledgeRetriever";

export class KnowledgeRetrieverFactory implements IKnowledgeRetrieverFactory {

    constructor(
        private readonly searchKnowledgeUseCase: ISearchKnowledgeUseCase
    ) { }

    create(organizationId: string): IKnowledgeRetriever {

        return new KnowledgeRetriever(
            this.searchKnowledgeUseCase,
            organizationId
        );
    }
}