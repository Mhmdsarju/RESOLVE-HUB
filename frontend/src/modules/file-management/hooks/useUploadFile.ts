import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { uploadFile } from "../api/fileApi";

import type { ErrorResponse } from "@/core/types/error.types";

import type { File, UploadFilePayload, } from "../types/file.types";

export function useUploadFile() {
    const queryClient = useQueryClient();

    return useMutation<File, AxiosError<ErrorResponse>, UploadFilePayload>({
        mutationFn: (payload) => uploadFile(payload),

        onSuccess: (data, variables) => {
            queryClient.setQueryData(
                ["file", data.id],
                data,
            );

            queryClient.invalidateQueries({
                queryKey: ["files", variables.taskId],
            });

            toast.success("File uploaded successfully");
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to upload file";

            toast.error(message);
        },
    });
}