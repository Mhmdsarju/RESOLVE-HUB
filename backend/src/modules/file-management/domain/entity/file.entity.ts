export interface FileProps {
  id?: string;
  taskId: string;
  uploadedBy: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  storageUrl: string;
  publicId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class File {
  public readonly id?: string;
  public readonly taskId: string;
  public readonly uploadedBy: string;
  public readonly originalName: string;
  public readonly fileName: string;
  public readonly mimeType: string;
  public readonly size: number;
  public readonly storageUrl: string;
  public readonly publicId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: FileProps) {
    this.id = props.id;
    this.taskId = props.taskId;
    this.uploadedBy = props.uploadedBy;
    this.originalName = props.originalName;
    this.fileName = props.fileName;
    this.mimeType = props.mimeType;
    this.size = props.size;
    this.storageUrl = props.storageUrl;
    this.publicId = props.publicId;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}