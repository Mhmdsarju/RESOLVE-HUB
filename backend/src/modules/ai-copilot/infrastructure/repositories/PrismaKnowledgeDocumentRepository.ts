import { prisma } from "@/config/database";
import pgvector from "pgvector";
import { IKnowledgeDocumentRepository } from "../../domain/interface/IKnowledgeDocumentRepository";
import { CreateKnowledgeDocumentDTO } from "../../application/dto/CreateKnowledgeDocumentDTO";
import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";
import { SearchSimilarKnowledgeChunksDTO } from "../../application/dto/SearchSimilarKnowledgeChunksDTO";

export class PrismaKnowledgeDocumentRepository implements IKnowledgeDocumentRepository {

    async create(data: CreateKnowledgeDocumentDTO): Promise<void> {

        await prisma.knowledgeDocument.create({
            data: {
                id: data.id,
                organizationId: data.organizationId,
                title: data.title,
                sourceType: data.sourceType,
                sourceId: data.sourceId,
                content: data.content,
            },
        });
    }

    async searchSimilar(data: SearchSimilarKnowledgeChunksDTO): Promise<KnowledgeChunkSearchResultDTO[]> {

        const queryEmbedding = pgvector.toSql(data.embedding);

        if (data.similarityThreshold !== undefined) {
            return prisma.$queryRaw<KnowledgeChunkSearchResultDTO[]>`
            SELECT
                id,
                "documentId",
                content,
                metadata,
                1 - (embedding <=> ${queryEmbedding}::vector) AS similarity
            FROM knowledge_chunks
            WHERE "organizationId" = ${data.organizationId}::uuid
              AND 1 - (embedding <=> ${queryEmbedding}::vector) >= ${data.similarityThreshold}
            ORDER BY embedding <=> ${queryEmbedding}::vector
            LIMIT ${data.limit}
        `;
        }

        return prisma.$queryRaw<KnowledgeChunkSearchResultDTO[]>`
        SELECT
            id,
            "documentId",
            content,
            metadata,
            1 - (embedding <=> ${queryEmbedding}::vector) AS similarity
        FROM knowledge_chunks
        WHERE "organizationId" = ${data.organizationId}::uuid
        ORDER BY embedding <=> ${queryEmbedding}::vector
        LIMIT ${data.limit}
    `;
    }



}