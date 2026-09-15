// Builds a structured context string from retrieved knowledge chunks for use in the LLM prompt.
import { IKnowledgeContextBuilder } from "../../domain/interface/IKnowledgeContextBuilder";
import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";

export class KnowledgeContextBuilder implements IKnowledgeContextBuilder {

    build(chunks: KnowledgeChunkSearchResultDTO[]): string {

        if (chunks.length === 0) {
            return "No relevant knowledge was found.";
        }

        return chunks.map((chunk, index) => {
            return `[Source ${index + 1}]\n${chunk.content}`;
        }).join("\n\n");
    }
}