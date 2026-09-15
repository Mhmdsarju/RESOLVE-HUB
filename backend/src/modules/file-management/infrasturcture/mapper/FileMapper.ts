import { File as PrismaFile } from "@prisma/client";

import { File } from "../../domain/entity/file.entity"; 

export class FileMapper {
  static fromDb(data: PrismaFile): File {
    return new File({
      id: data.id,
      taskId: data.taskId,
      uploadedBy: data.uploadedBy,
      originalName: data.originalName,
      fileName: data.fileName,
      mimeType: data.mimeType,
      size: data.size,
      storageUrl: data.storageUrl,
      publicId: data.publicId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toDb(file: File) {
    return {
      taskId: file.taskId,
      uploadedBy: file.uploadedBy,
      originalName: file.originalName,
      fileName: file.fileName,
      mimeType: file.mimeType,
      size: file.size,
      storageUrl: file.storageUrl,
      publicId: file.publicId,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
    };
  }

}