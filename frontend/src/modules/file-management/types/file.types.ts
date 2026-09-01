export interface File {
    id: string;
    taskId: string;
    uploadedBy: string;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    storageUrl: string;
    publicId: string;
    createdAt: string;
    updatedAt: string;
}

export interface UploadFilePayload {
    taskId: string;
    file: globalThis.File;
}

export interface FileCardProps {
  file: File;
  onDelete: (file: File) => void | Promise<void>;
}

export interface FileListProps {
  taskId: string;
}

export interface FilePreviewModalProps {
  file: File | null;
  onClose: () => void;
}

export interface FileUploadProps {
  taskId: string;
}