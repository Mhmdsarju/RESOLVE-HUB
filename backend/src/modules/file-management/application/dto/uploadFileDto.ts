export interface UploadFileDTO {
    taskId: string;
    uploadedBy: string;
    file: Buffer;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
}