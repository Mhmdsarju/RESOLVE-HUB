import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/config/cloudinary";

import { IFileStorage } from "../../domain/interface/IFileStorage";

export class CloudinaryFileStorage implements IFileStorage {

    async upload(file: Buffer, fileName: string,): Promise<{ storageUrl: string; publicId: string; }> {
        const result = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "auto",
                        public_id: fileName,
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        if (!result) {
                            reject(new Error("Cloudinary upload failed"));
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

    async delete(publicId: string): Promise<void> {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: "auto",
        });
    }
}