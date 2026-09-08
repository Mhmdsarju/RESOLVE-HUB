import { ISearchKnowledgeUseCase } from "../../domain/interface/ISearchKnowledgeUseCase";
import { IKnowledgeChunkRepository } from "../../domain/interface/IKnowledgeChunkRepository";
import { IGeminiEmbeddingService } from "../../domain/interface/IGeminiEmbeddingService";
import { SearchKnowledgeDTO } from "../dto/SearchKnowledgeDTO";
import { KnowledgeChunkSearchResultDTO } from "../dto/KnowledgeChunkSearchResultDTO";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class SearchKnowledgeUseCase implements ISearchKnowledgeUseCase {

    constructor(
        private readonly knowledgeChunkRepository: IKnowledgeChunkRepository,
        private readonly geminiEmbeddingService: IGeminiEmbeddingService
    ) { }

    async execute(data: SearchKnowledgeDTO): Promise<KnowledgeChunkSearchResultDTO[]> {

        if (data.limit !== undefined && (data.limit < 1 || data.limit > 10)) {
            throw new AppError("Search limit must be between 1 and 10", HttpStatusCode.BAD_REQUEST);
        }

        if (
            data.similarityThreshold !== undefined &&
            (data.similarityThreshold < 0 || data.similarityThreshold > 1)
        ) {
            throw new AppError("Similarity threshold must be between 0 and 1", HttpStatusCode.BAD_REQUEST);
        }

        const embedding = await this.geminiEmbeddingService.generateEmbedding(
            data.query
        );

        return this.knowledgeChunkRepository.searchSimilar({
            organizationId: data.organizationId,
            embedding,
            limit: data.limit ?? 5,
            similarityThreshold: data.similarityThreshold,
        });
    }
}