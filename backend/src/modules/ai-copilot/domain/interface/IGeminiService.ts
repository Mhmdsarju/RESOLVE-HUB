export interface IGeminiService {
  generateResponse(prompt: string): Promise<string>;
}