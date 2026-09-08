import { IncidentCopilotState } from "../state/IncidentCopilotState";
import { IGenerateResolutionNode } from "@/modules/ai-copilot/domain/interface/langgraph/node/IGenerateResolutionNode";
import { IGeminiStructuredService } from "@/modules/ai-copilot/domain/interface/IGeminiStructuredService";
import { IRAGPromptBuilder } from "@/modules/ai-copilot/domain/interface/IRAGPromptBuilder";
import { IKnowledgeContextBuilder } from "@/modules/ai-copilot/domain/interface/IKnowledgeContextBuilder";

export class GenerateResolutionNode implements IGenerateResolutionNode {

    constructor(
        private readonly aiService: IGeminiStructuredService,
        private readonly ragPromptBuilder: IRAGPromptBuilder,
        private readonly knowledgeContextBuilder: IKnowledgeContextBuilder
    ) { }

    async execute(state: typeof IncidentCopilotState.State) {

        const context = this.knowledgeContextBuilder.build(
            state.evidence
        );

        const prompt = await this.ragPromptBuilder.build(
            state.incident,
            context
        );

        const result = await this.aiService.generateStructuredResponse(
            prompt
        );

        const recommendation = result.initialRecommendation;

        return {
            recommendation,
        };
    }

}
