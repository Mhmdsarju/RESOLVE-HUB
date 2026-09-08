import "dotenv/config";
import cuid from "cuid";

import { GeminiEmbeddingService } from "./GeminiEmbeddingService";
import { PrismaKnowledgeDocumentRepository } from "../repositories/PrismaKnowledgeDocumentRepository";
import { PrismaKnowledgeChunkRepository } from "../repositories/PrismaKnowledgeChunkRepository";
import { prisma } from "@/config/database";
import { KnowledgeSourceType } from "../../domain/enums/KnowledgeSourceType";

async function testKnowledgeVector() {
    const embeddingService = new GeminiEmbeddingService();
    const documentRepository = new PrismaKnowledgeDocumentRepository();
    const chunkRepository = new PrismaKnowledgeChunkRepository();

    const documentId = cuid();
    const chunkId = cuid();

    const organizationId = "087e0e72-ab6c-49ee-9157-91fa7e685f3d";

    const content = "Database queries are running slowly because of high database load.";

    await documentRepository.create({
        id: documentId,
        organizationId,
        title: "Database Performance Test",
        sourceType: KnowledgeSourceType.INCIDENT,
        content,
    });

    const embedding = await embeddingService.generateEmbedding(content);

    console.log("Embedding length:", embedding.length);

    await chunkRepository.create({
        id: chunkId,
        documentId,
        organizationId,
        chunkIndex: 0,
        content,
        metadata: {
            source: "test",
        },
        embedding,
    });

    console.log("Knowledge chunk inserted successfully");

    const query = "Why are database queries running slowly?";

    const queryEmbedding = await embeddingService.generateEmbedding(query);

    console.log("Query embedding length:", queryEmbedding.length);

    const similarChunks = await chunkRepository.searchSimilar({
        organizationId,
        embedding: queryEmbedding,
        limit: 5,
        similarityThreshold: 0.7,
    });

    console.log("Similar chunks:");
    console.dir(similarChunks, { depth: null });

    await prisma.$disconnect();
}

testKnowledgeVector();