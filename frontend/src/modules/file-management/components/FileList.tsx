import { FileText, RefreshCw } from "lucide-react";

import FileCard from "./FileCard";

import { useFilesByTask } from "../hooks/useFilesByTask";
import { useDeleteFile } from "../hooks/useDeleteFile";

import type { FileListProps } from "../types/file.types";


export default function FileList({ taskId }: FileListProps) {
  const { data: files = [], isLoading, isError } = useFilesByTask(taskId);

  const deleteFileMutation = useDeleteFile(taskId);

  const handleDelete = async (fileId: string) => {
    await deleteFileMutation.mutateAsync(fileId);
  };

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="
              h-20
              animate-pulse
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              shadow-sm
            "
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-56
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-red-100
          bg-white
          px-6
          text-center
          shadow-sm
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-red-50
            text-red-500
          "
        >
          <RefreshCw size={24} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-[#4B3932]">Unable to load files</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Something went wrong while loading files for this task.
        </p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div
        className="
          flex
          min-h-56
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-[#D8C9BD]
          bg-white
          px-6
          text-center
          shadow-sm
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#F0E7D5]
            text-[#4B3932]
          "
        >
          <FileText size={28} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">No files yet</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Files related to this task will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {files.map((file) => (
        <FileCard key={file.id} file={file} onDelete={() => handleDelete(file.id)} />
      ))}
    </div>
  );
}
