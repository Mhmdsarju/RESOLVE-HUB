import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";

import { AIAnalysisResultSchema } from "../../application/dto/AIAnalysisResultSchema";
import { IAIAnalysisResult } from "../../domain/interface/IAIAnalysisResult";
import { IGeminiStructuredService } from "../../domain/interface/IGeminiStructuredService";

export class LangChainGeminiService implements IGeminiStructuredService {

    private readonly chain;

    constructor() {
        const model = new ChatGoogleGenerativeAI({
            model: "gemini-3.6-flash",
            apiKey: process.env.GEMINI_API_KEY,
        });

        const prompt = PromptTemplate.fromTemplate(
            "{input}"
        );

        const structuredModel = model.withStructuredOutput(
            AIAnalysisResultSchema
        );
        // LangChain Expression Language
        this.chain = prompt.pipe(structuredModel);
    }

    async generateStructuredResponse(prompt: string): Promise<IAIAnalysisResult> {

        return this.chain.invoke({
            input: prompt,
        });
    }

}