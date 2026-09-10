// Retrieves relevant knowledge through the search use case and converts the results 
// into LangChain Documents for the RAG workflow.
import { BaseRetriever } from "@langchain/core/retrievers";
import { Document } from "@langchain/core/documents";
import { IKnowledgeRetriever } from "../../domain/interface/IKnowledgeRetriever";
import { ISearchKnowledgeUseCase } from "../../domain/interface/ISearchKnowledgeUseCase";
import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";
import { AIConstant } from "@/shared/constant/AIConstant";

export class KnowledgeRetriever extends BaseRetriever implements IKnowledgeRetriever {

    lc_namespace = ["resolvehub", "retrievers"];

    constructor(
        private readonly searchKnowledgeUseCase: ISearchKnowledgeUseCase,
        private readonly organizationId: string
    ) {
        super();
    }

    async retrieve(query: string): Promise<KnowledgeChunkSearchResultDTO[]> {

        return this.searchKnowledgeUseCase.execute({
            organizationId: this.organizationId,
            query,
            limit: AIConstant.KNOWLEDGE_SEARCH_LIMIT,
            similarityThreshold: AIConstant.KNOWLEDGE_SIMILARITY_THRESHOLD,
        });
    }

    async _getRelevantDocuments(query: string): Promise<Document[]> {

        const chunks = await this.retrieve(query);

        return chunks.map((chunk) => {
            return new Document({
                pageContent: chunk.content,
                metadata: {
                    chunkId: chunk.id,
                    documentId: chunk.documentId,
                    similarity: chunk.similarity,
                    ...chunk.metadata,
                },
            });
        });
    }
}
