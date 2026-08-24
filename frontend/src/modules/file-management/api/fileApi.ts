import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type {
    File,
    UploadFilePayload,
} from "../types/file.types";


export async function uploadFile(payload: UploadFilePayload,): Promise<File> {
    const formData = new FormData();

    formData.append(
        "file",
        payload.file,
    );

    const response = await api.post(
        ENDPOINTS.FILE.BY_TASK(payload.taskId),
        formData,
    );

    return response.data.data;
}

export async function getFilesByTask(taskId: string,): Promise<File[]> {
    const response = await api.get(
        ENDPOINTS.FILE.BY_TASK(taskId),
    );

    return response.data.data;
}

export async function getFileById(fileId: string,): Promise<File> {
    const response = await api.get(
        ENDPOINTS.FILE.BY_ID(fileId),
    );

    return response.data.data;
}

export async function deleteFile(fileId: string,): Promise<void> {
    await api.delete(
        ENDPOINTS.FILE.BY_ID(fileId),
    );
}

export async function downloadFile(fileId: string): Promise<void> {
    const response = await api.get(
        ENDPOINTS.FILE.DOWNLOAD(fileId),
        {
            responseType: "blob",
        },
    );

    const contentDisposition = response.headers["content-disposition"];

    let fileName = "download";

    if (typeof contentDisposition === "string") {
        const match = contentDisposition.match(
            /filename="([^"]+)"/,
        );

        if (match?.[1]) {
            fileName = decodeURIComponent(match[1]);
        }
    }

    const blob = new Blob(
        [response.data],
        {
            type: String(response.headers["content-type"] ?? ""),
        },
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
}