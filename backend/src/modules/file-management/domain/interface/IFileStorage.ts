export interface IFileStorage {

    upload(file: Buffer, fileName: string, mimeType: string,): Promise<{ storageUrl: string; publicId: string; }>;

    delete(publicId: string, mimeType: string,): Promise<void>;

    download(publicId: string, mimeType: string,): Promise<Buffer>;

}