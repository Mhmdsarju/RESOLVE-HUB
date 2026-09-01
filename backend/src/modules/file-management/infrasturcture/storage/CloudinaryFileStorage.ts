import { randomUUID } from "crypto";
import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/config/cloudinary";

import { IFileStorage } from "../../domain/interface/IFileStorage";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class CloudinaryFileStorage implements IFileStorage {

    async upload(file: Buffer, fileName: string, mimeType: string,): Promise<{ storageUrl: string; publicId: string; }> {
        const publicId = randomUUID();
        console.log("Uploading file:", fileName);
        console.log("type", mimeType)

        const result = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        public_id: publicId,
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        if (!result) {
                            reject(
                                new AppError(
                                    "Cloudinary upload failed",
                                    HttpStatusCode.BAD_REQUEST,
                                ),
                            );
                            return;
                        }

                        resolve(result);
                    },
                );

                uploadStream.end(file);
            },
        );

        return {
            storageUrl: result.secure_url,
            publicId: result.public_id,
        };
    }

    async delete(publicId: string, mimeType: string,): Promise<void> {
        const resourceType = mimeType.startsWith("image/")
            ? "image"
            : "raw";

        await cloudinary.uploader.destroy(
            publicId,
            {
                resource_type: resourceType,
            },
        );
    }

    async download(publicId: string, mimeType: string,): Promise<Buffer> {
        const resourceType = mimeType.startsWith("image/")
            ? "image"
            : "raw";

        const url = cloudinary.url(publicId, {
            resource_type: resourceType,
            secure: true,
        });


        const response = await fetch(url);

        if (!response.ok) {
            throw new AppError(
                "Failed to download file",
                HttpStatusCode.BAD_REQUEST,
            );
        }

        return Buffer.from(
            await response.arrayBuffer(),
        );
    }
}