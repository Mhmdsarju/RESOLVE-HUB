import { Download, Eye, FileText, Loader2, Trash2, X } from "lucide-react";
import { useState } from "react";

import FilePreviewModal from "@/modules/file-management/components/FilePreviewModal";
import { downloadFile } from "@/modules/file-management/api/fileApi";

import type { FileCardProps } from "@/modules/file-management/types/file.types";

export default function FileCard({ file, onDelete }: FileCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);

  const fileSize =
    file.size >= 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;

  const uploadedDate = new Date(file.createdAt).toLocaleDateString();

  const canPreview = file.mimeType.startsWith("image/") || file.mimeType === "application/pdf";

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await onDelete(file);

      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      await downloadFile(file.id);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-4
          shadow-sm
          transition
          hover:shadow-md
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F0E7D5]
              text-[#4B3932]
            "
          >
            <FileText size={20} />
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-sm
                font-bold
                text-[#4B3932]
              "
            >
              {file.originalName}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-400">{file.mimeType}</span>

              <span className="text-xs text-stone-300">•</span>

              <span className="text-xs text-stone-400">{fileSize}</span>

              <span className="text-xs text-stone-300">•</span>

              <span className="text-xs text-stone-400">{uploadedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {canPreview && (
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              disabled={isDeleting || isDownloading}
              title="Preview file"
              className="
                rounded-lg
                p-2
                text-stone-400
                transition
                hover:bg-[#F0E7D5]
                hover:text-[#4B3932]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Eye size={17} />
            </button>
          )}

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDeleting || isDownloading}
            title="Download file"
            className="
              inline-flex
              items-center
              justify-center
              rounded-lg
              p-2
              text-stone-400
              transition
              hover:bg-[#F0E7D5]
              hover:text-[#4B3932]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isDownloading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Download size={17} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isDeleting || isDownloading}
            title="Delete file"
            className="
              rounded-lg
              p-2
              text-stone-400
              transition
              hover:bg-red-50
              hover:text-red-500
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      {isPreviewOpen && <FilePreviewModal file={file} onClose={() => setIsPreviewOpen(false)} />}

      {isDeleteModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            backdrop-blur-sm
          "
          onClick={() => {
            if (!isDeleting) {
              setIsDeleteModalOpen(false);
            }
          }}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-[#E7DDD3]
              bg-white
              p-6
              shadow-2xl
            "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-red-50
                  text-red-500
                "
              >
                <Trash2 size={22} />
              </div>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="
                  rounded-lg
                  p-2
                  text-stone-400
                  transition
                  hover:bg-stone-100
                  hover:text-[#4B3932]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#4B3932]">Delete file?</h3>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#4B3932]">{file.originalName}</span>? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#4B3932]
                  transition
                  hover:bg-[#FAF6F0]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="
                  inline-flex
                  min-w-28
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-500
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete File"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
