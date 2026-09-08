import { GeminiEmbeddingService } from "./GeminiEmbeddingService";
import "dotenv/config";

async function testEmbedding() {

    const service = new GeminiEmbeddingService();

    const embedding = await service.generateEmbedding(
        "Database queries are running slowly"
    );
    console.log("Embedding length:", embedding.length);
    console.log("First 5 values:", embedding.slice(0, 5));
}

testEmbedding();