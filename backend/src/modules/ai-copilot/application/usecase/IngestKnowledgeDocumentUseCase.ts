// Ingestion = Document → Chunk → Embedding → pgvector
// Ingests a knowledge document by splitting it into chunks, 
// generating embeddings, and storing them for RAG vector search.
import cuid from "cuid";
import { IIngestKnowledgeDocumentUseCase } from "../../domain/interface/IIngestKnowledgeDocumentUseCase";
import { IKnowledgeDocumentRepository } from "../../domain/interface/IKnowledgeDocumentRepository";
import { IKnowledgeChunkRepository } from "../../domain/interface/IKnowledgeChunkRepository";
import { ITextChunkingService } from "../../domain/interface/ITextChunkingService";
import { IGeminiEmbeddingService } from "../../domain/interface/IGeminiEmbeddingService";
import { IngestKnowledgeDocumentDTO } from "../dto/IngestKnowledgeDocumentDTO";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class IngestKnowledgeDocumentUseCase implements IIngestKnowledgeDocumentUseCase {

    constructor(
        private readonly knowledgeDocumentRepository: IKnowledgeDocumentRepository,
        private readonly knowledgeChunkRepository: IKnowledgeChunkRepository,
        private readonly textChunkingService: ITextChunkingService,
        private readonly geminiEmbeddingService: IGeminiEmbeddingService
    ) { }

    async execute(document: IngestKnowledgeDocumentDTO): Promise<void> {

        if (!document.content.trim()) {
            throw new AppError("Knowledge document content is required", HttpStatusCode.BAD_REQUEST);
        }

        const chunks = this.textChunkingService.splitText(
            document.content
        );

        await this.knowledgeDocumentRepository.create({
            id: document.id,
            organizationId: document.organizationId,
            title: document.title,
            sourceType: document.sourceType,
            sourceId: document.sourceId,
            content: document.content,
        });

        for (let index = 0; index < chunks.length; index++) {

            const chunk = chunks[index];

            const embedding = await this.geminiEmbeddingService.generateEmbedding(chunk);

            await this.knowledgeChunkRepository.create({
                id: cuid(),
                documentId: document.id,
                organizationId: document.organizationId,
                chunkIndex: index,
                content: chunk,
                metadata: {
                    sourceType: document.sourceType,
                    sourceId: document.sourceId,
                },
                embedding,
            });
        }
    }
}