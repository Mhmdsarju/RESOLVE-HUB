export interface IDownloadFileUseCase {
    execute(id: string): Promise<Buffer>;
}