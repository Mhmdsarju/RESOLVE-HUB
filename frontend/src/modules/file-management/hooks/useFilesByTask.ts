import { useQuery } from "@tanstack/react-query";

import { getFilesByTask } from "../api/fileApi";

import type { File } from "../types/file.types";

export function useFilesByTask(taskId: string,) {
    return useQuery<File[]>({
        queryKey: ["files", taskId,],

        queryFn: () => getFilesByTask(taskId),

        enabled: Boolean(taskId),
    });
}