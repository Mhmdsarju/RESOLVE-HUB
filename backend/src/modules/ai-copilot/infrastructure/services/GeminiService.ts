import { GoogleGenAI } from "@google/genai";

import { IGeminiService } from "../../domain/interface/IGeminiService";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class GeminiService implements IGeminiService {
    private readonly client: GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    async generateResponse(prompt: string): Promise<string> {
        const maxAttempts = 3;
        const timeout = 60000;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            const controller = new AbortController();

            const timeoutId = setTimeout(() => {
                console.log("Gemini request timeout - aborting request");
                controller.abort();
            }, timeout);

            try {

                const response = await this.client.models.generateContent({
                    model: "gemini-3.6-flash",
                    contents: prompt,
                    config: {
                        responseMimeType: "application/json",
                        abortSignal: controller.signal,
                    },
                });

                clearTimeout(timeoutId);

                return response.text ?? "";

            } catch (error: unknown) {
                clearTimeout(timeoutId);

                const status = typeof error === "object" && error !== null && "status" in error
                    ? error.status
                    : undefined;

                const isTimeout = error instanceof Error &&
                    error.name === "AbortError";

                if (
                    (status === 429 || status === 503 || isTimeout) &&
                    attempt < maxAttempts
                ) {

                    const delay = 1000 * Math.pow(2, attempt - 1);

                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;

                }

                throw error;
            }
        }

        throw new AppError("Gemini request failed", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}