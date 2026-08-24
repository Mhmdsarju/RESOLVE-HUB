import { useQuery } from "@tanstack/react-query";

import { getFileById } from "../api/fileApi";

import type { File } from "../types/file.types";

export function useFileById(fileId: string,) {
    return useQuery<File>({
        queryKey: ["file", fileId,],

        queryFn: () => getFileById(fileId),

        enabled: Boolean(fileId),
    });
}