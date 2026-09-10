// Creates organization-specific KnowledgeRetriever 
// instances with the required search use case and dependencies.
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { AIAnalysisResultSchema } from "../../application/dto/AIAnalysisResultSchema";
import { IAIAnalysisResult } from "../../domain/interface/IAIAnalysisResult";
import { IGeminiStructuredService } from "../../domain/interface/IGeminiStructuredService";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class LangChainGeminiService implements IGeminiStructuredService {

    private readonly chain;

    constructor() {
        const model = new ChatGoogleGenerativeAI({
            model:"gemini-3.8-flash",
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

        try {

            return await this.chain.invoke({
                input: prompt,
            });

        } catch (error: unknown) {

            console.error("Gemini structured response failed:", error);

            throw new AppError("AI analysis failed", HttpStatusCode.INTERNAL_SERVER_ERROR);

        }
    }

}

