import { IKnowledgeRetrieverFactory } from "../../domain/interface/IKnowledgeRetrieverFactory";
import { IKnowledgeContextBuilder } from "../../domain/interface/IKnowledgeContextBuilder";
import { IRAGPromptBuilder } from "../../domain/interface/IRAGPromptBuilder";
import { IGeminiStructuredService } from "../../domain/interface/IGeminiStructuredService";
import { IRAGChain } from "../../domain/interface/IRAGChain";
import { IAIAnalysisResult } from "../../domain/interface/IAIAnalysisResult";
import { BuildRAGPromptDTO } from "../../application/dto/BuildRAGPromptDTO";

export class RAGChain implements IRAGChain {

    constructor(
        private readonly knowledgeRetrieverFactory: IKnowledgeRetrieverFactory,
        private readonly knowledgeContextBuilder: IKnowledgeContextBuilder,
        private readonly ragPromptBuilder: IRAGPromptBuilder,
        private readonly aiService: IGeminiStructuredService
    ) { }

    async execute(
        data: BuildRAGPromptDTO,
        organizationId: string
    ): Promise<IAIAnalysisResult> {

        const knowledgeRetriever =
            this.knowledgeRetrieverFactory.create(
                organizationId
            );

        const searchResult =
            await knowledgeRetriever.retrieve(
                `${data.title} ${data.description ?? ""}`
            );

        if (searchResult.length === 0) {
            return {
                summary: "Insufficient knowledge available to analyze this incident.",
                possibleRootCause: "Insufficient evidence.",
                initialRecommendation: "Collect more incident information or relevant knowledge before determining the root cause.",
            };
        }

        const context =
            this.knowledgeContextBuilder.build(
                searchResult
            );

        const prompt =
            await this.ragPromptBuilder.build(
                data,
                context
            );

        const parsedResponse =
            await this.aiService.generateStructuredResponse(
                prompt
            );

        return {
            ...parsedResponse,
            evidence: searchResult.map((chunk) => ({
                content: chunk.content,
                similarity: chunk.similarity,
            })),
        };
    }
}