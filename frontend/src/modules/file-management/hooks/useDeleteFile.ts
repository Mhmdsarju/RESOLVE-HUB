import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteFile } from "../api/fileApi";

export function useDeleteFile(taskId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (fileId: string) =>
            deleteFile(fileId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["files", taskId,],
            });
        },
    });
}