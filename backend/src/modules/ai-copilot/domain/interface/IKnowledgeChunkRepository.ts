import { CreateKnowledgeChunkDTO } from "../../application/dto/CreateKnowledgeChunkDTO";
import { SearchSimilarKnowledgeChunksDTO } from "../../application/dto/SearchSimilarKnowledgeChunksDTO";
import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";

export interface IKnowledgeChunkRepository {
    create(data: CreateKnowledgeChunkDTO): Promise<void>;

    searchSimilar(data: SearchSimilarKnowledgeChunksDTO): Promise<KnowledgeChunkSearchResultDTO[]>;
}