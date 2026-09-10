// Splits large documents into overlapping text chunks to prepare them for embedding and RAG retrieval.
import { ITextChunkingService } from "../../domain/interface/ITextChunkingService";
export class TextChunkingService implements ITextChunkingService {

    private readonly chunkSize = 500;
    private readonly overlap = 50;

    splitText(text: string): string[] {

        const normalizedText = text.trim();

        if (!normalizedText) {
            return [];
        }

        const words = normalizedText.split(/\s+/);

        if (words.length <= this.chunkSize) {
            return [normalizedText];
        }

        const chunks: string[] = [];

        let start = 0;

        while (start < words.length) {
            const end = Math.min(
                start + this.chunkSize,
                words.length
            );

            chunks.push(words.slice(start, end).join(" "));

            if (end == words.length) {
                break;
            }

            start += this.chunkSize - this.overlap;

        }

        return chunks;

    }


}