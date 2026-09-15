import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";

export interface IKnowledgeContextBuilder {
    build(chunks: KnowledgeChunkSearchResultDTO[]): string;
}