// Uses LangChain's Gemini integration to send RAG prompts to 
// the LLM and return the generated response as a string.
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export class RAGChainService {

    private readonly model: ChatGoogleGenerativeAI;

    constructor() {
        this.model = new ChatGoogleGenerativeAI({
            model:"gemini-3.8-flash",
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    async generate(prompt: string): Promise<string> {

        const response = await this.model.invoke(prompt);

        return response.content.toString();
    }

}