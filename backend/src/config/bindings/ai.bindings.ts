import { Container } from "inversify";

import { GeminiService } from "@/modules/ai-copilot/infrastructure/services/GeminiService";
import { AnalyzeIncidentUseCase } from "@/modules/ai-copilot/application/usecase/AnalyzeIncidentUseCase";
import { AIController } from "@/modules/ai-copilot/presentation/controller/AIController";
import { createAIRoutes } from "@/modules/ai-copilot/presentation/routes/ai.routes";
import { IGetIncidentByIdUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentByIdUseCase";
import { IAIIncidentAnalysisRepository } from "@/modules/ai-copilot/domain/interface/IAIIncidentAnalysisRepository";
import { TYPES } from "../types";
import { GetAIAnalysisUseCase } from "@/modules/ai-copilot/application/usecase/GetAIAnalysisUseCase";
import { IKnowledgeChunkRepository } from "@/modules/ai-copilot/domain/interface/IKnowledgeChunkRepository";
import { IKnowledgeDocumentRepository } from "@/modules/ai-copilot/domain/interface/IKnowledgeDocumentRepository";
import { TextChunkingService } from "@/modules/ai-copilot/infrastructure/services/TextChunkingService";
import { GeminiEmbeddingService } from "@/modules/ai-copilot/infrastructure/services/GeminiEmbeddingService";
import { IngestKnowledgeDocumentUseCase } from "@/modules/ai-copilot/application/usecase/IngestKnowledgeDocumentUseCase";
import { SearchKnowledgeUseCase } from "@/modules/ai-copilot/application/usecase/SearchKnowledgeUseCase";
import { KnowledgeContextBuilder } from "@/modules/ai-copilot/infrastructure/services/KnowledgeContextBuilder";
import { IKnowledgeContextBuilder } from "@/modules/ai-copilot/domain/interface/IKnowledgeContextBuilder";
import { RAGPromptBuilder } from "@/modules/ai-copilot/infrastructure/services/RAGPromptBuilder";
import { GenerateRAGIncidentAnalysisUseCase } from "@/modules/ai-copilot/application/usecase/GenerateRAGIncidentAnalysisUseCase";
import { LangChainGeminiService } from "@/modules/ai-copilot/infrastructure/services/LangChainGeminiService";
import { KnowledgeRetrieverFactory } from "@/modules/ai-copilot/infrastructure/services/KnowledgeRetrieverFactory";
import { IKnowledgeRetrieverFactory } from "@/modules/ai-copilot/domain/interface/IKnowledgeRetrieverFactory";
import { RAGChain } from "@/modules/ai-copilot/infrastructure/services/RAGChain";

export function bindAI(container: Container, getIncidentByIdUseCase: IGetIncidentByIdUseCase) {

    const aiIncidentAnalysisRepository = container.get<IAIIncidentAnalysisRepository>(TYPES.AIIncidentAnalysisRepository);
    const knowledgeDocumentRepository = container.get<IKnowledgeDocumentRepository>(TYPES.KnowledgeDocumentRepository);
    const knowledgeChunkRepository = container.get<IKnowledgeChunkRepository>(TYPES.KnowledgeChunkRepository);


    const aiService = new GeminiService();

    const langChainGeminiService = new LangChainGeminiService();

    const analyzeIncidentUseCase = new AnalyzeIncidentUseCase(
        aiService,
        getIncidentByIdUseCase,
        aiIncidentAnalysisRepository
    );

    const getAIAnalysisUseCase = new GetAIAnalysisUseCase(
        aiIncidentAnalysisRepository
    );

    const textChunkingService = new TextChunkingService();

    const geminiEmbeddingService = new GeminiEmbeddingService();

    const ingestKnowledgeDocumentUseCase = new IngestKnowledgeDocumentUseCase(
        knowledgeDocumentRepository,
        knowledgeChunkRepository,
        textChunkingService,
        geminiEmbeddingService
    );

    const searchKnowledgeUseCase = new SearchKnowledgeUseCase(
        knowledgeChunkRepository,
        geminiEmbeddingService
    )

    const knowledgeRetrieverFactory: IKnowledgeRetrieverFactory = new KnowledgeRetrieverFactory(
        searchKnowledgeUseCase
    );

    const knowledgeContextBuilder: IKnowledgeContextBuilder = new KnowledgeContextBuilder();

    const ragPromptBuilder = new RAGPromptBuilder();

    const ragChain = new RAGChain(
        knowledgeRetrieverFactory,
        knowledgeContextBuilder,
        ragPromptBuilder,
        langChainGeminiService
    );

    const generateRAGIncidentAnalysisUseCase = new GenerateRAGIncidentAnalysisUseCase(
        getIncidentByIdUseCase,
        ragChain,
        aiIncidentAnalysisRepository
    );

    const aiController = new AIController(
        analyzeIncidentUseCase,
        getAIAnalysisUseCase,
        ingestKnowledgeDocumentUseCase,
        searchKnowledgeUseCase,
        generateRAGIncidentAnalysisUseCase
    );

    const aiRouter = createAIRoutes(aiController);

    return {
        aiRouter,
        analyzeIncidentUseCase
    }

}

