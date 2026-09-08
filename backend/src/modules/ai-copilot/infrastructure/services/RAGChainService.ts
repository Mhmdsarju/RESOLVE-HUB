import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export class RAGChainService {

    private readonly model: ChatGoogleGenerativeAI;

    constructor() {
        this.model = new ChatGoogleGenerativeAI({
            model: "gemini-3.6-flash",
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    async generate(prompt: string): Promise<string> {

        const response = await this.model.invoke(prompt);

        return response.content.toString();
    }

}