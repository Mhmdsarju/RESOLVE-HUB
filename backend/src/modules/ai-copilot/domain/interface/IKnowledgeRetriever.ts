import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";

export interface IKnowledgeRetriever {
    retrieve(
        query: string
    ): Promise<KnowledgeChunkSearchResultDTO[]>;
}