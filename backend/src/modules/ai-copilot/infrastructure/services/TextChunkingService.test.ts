import { TextChunkingService } from "./TextChunkingService";

describe("TextChunkingService", () => {

    const service = new TextChunkingService();

    it("should return an empty array for empty text", () => {
        expect(service.splitText("")).toEqual([]);
    });

    it("should return an empty array for whitespace-only text", () => {
        expect(service.splitText("   ")).toEqual([]);
    });

    it("should return one chunk when text is smaller than chunk size", () => {
        const text = "Database queries are running slowly";

        const chunks = service.splitText(text);

        expect(chunks).toHaveLength(1);
        expect(chunks[0]).toBe(text);
    });

    it("should preserve spaces between words", () => {
        const text = "Database queries are running slowly";

        const chunks = service.splitText(text);

        expect(chunks[0]).toBe(
            "Database queries are running slowly"
        );
    });

    it("should split long text into chunks", () => {
        const words = Array.from(
            { length: 600 },
            (_, index) => `word${index}`
        );

        const text = words.join(" ");

        const chunks = service.splitText(text);

        expect(chunks).toHaveLength(2);
    });

    it("should maintain the configured overlap", () => {
        const words = Array.from(
            { length: 600 },
            (_, index) => `word${index}`
        );

        const text = words.join(" ");

        const chunks = service.splitText(text);

        const firstChunkWords = chunks[0].split(/\s+/);
        const secondChunkWords = chunks[1].split(/\s+/);

        expect(firstChunkWords[firstChunkWords.length - 1]).toBe("word499");
        expect(secondChunkWords[0]).toBe("word450");
    });
});