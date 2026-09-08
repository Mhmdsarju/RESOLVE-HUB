import { IKnowledgeChunkRepository } from "../../domain/interface/IKnowledgeChunkRepository";
import { CreateKnowledgeChunkDTO } from "../../application/dto/CreateKnowledgeChunkDTO";
import { SearchSimilarKnowledgeChunksDTO } from "../../application/dto/SearchSimilarKnowledgeChunksDTO";
import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";
import { prisma } from "@/config/database";
import pgvector from "pgvector";

export class PrismaKnowledgeChunkRepository implements IKnowledgeChunkRepository {

    async create(data: CreateKnowledgeChunkDTO): Promise<void> {

        const embedding = pgvector.toSql(data.embedding);

        await prisma.$executeRaw`
            INSERT INTO knowledge_chunks (
                id,
                "documentId",
                "organizationId",
                "chunkIndex",
                content,
                metadata,
                embedding,
                "createdAt",
                "updatedAt"
            )
            VALUES (
                ${data.id},
                ${data.documentId},
                ${data.organizationId}::uuid,
                ${data.chunkIndex},
                ${data.content},
                ${data.metadata ? JSON.stringify(data.metadata) : null}::jsonb,
                ${embedding}::vector,
                NOW(),
                NOW()
            )
        `;
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