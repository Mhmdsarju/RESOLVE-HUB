import multer from "multer";

import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",

    "application/pdf",

    "text/plain",
    "text/csv",
    "application/json",

    "text/javascript",
    "application/javascript",
    "application/typescript",

    "text/x-python",

    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

    "application/zip",
];

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 10 * 1024 * 1024,
    },

    fileFilter: (_req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            cb(
                new AppError("Unsupported file type", HttpStatusCode.BAD_REQUEST,),
            );

            return;
        }

        cb(null, true);
    },
});

export default upload;