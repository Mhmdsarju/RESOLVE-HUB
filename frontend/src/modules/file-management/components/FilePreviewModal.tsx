import { Download, ExternalLink, FileText, X } from "lucide-react";

import type { FilePreviewModalProps } from "../types/file.types";

export default function FilePreviewModal({ file, onClose }: FilePreviewModalProps) {
  if (!file) {
    return null;
  }

  const isImage = file.mimeType.startsWith("image/");

  const isPdf = file.mimeType === "application/pdf";

  const canPreview = isImage || isPdf;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-5xl
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-[#E7DDD3]
            px-5
            py-4
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#F0E7D5]
                text-[#4B3932]
              "
            >
              <FileText size={19} />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate
                  text-sm
                  font-bold
                  text-[#4B3932]
                "
              >
                {file.originalName}
              </h2>

              <p className="mt-0.5 text-xs text-stone-400">{file.mimeType}</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <a
              href={file.storageUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open file"
              className="
                rounded-lg
                p-2
                text-stone-400
                transition
                hover:bg-[#F0E7D5]
                hover:text-[#4B3932]
              "
            >
              <ExternalLink size={18} />
            </a>

            <a
              href={file.storageUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={file.originalName}
              title="Download file"
              className="
                rounded-lg
                p-2
                text-stone-400
                transition
                hover:bg-[#F0E7D5]
                hover:text-[#4B3932]
              "
            >
              <Download size={18} />
            </a>

            <button
              type="button"
              onClick={onClose}
              title="Close preview"
              className="
                rounded-lg
                p-2
                text-stone-400
                transition
                hover:bg-red-50
                hover:text-red-500
              "
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <div
          className="
            flex
            min-h-0
            flex-1
            items-center
            justify-center
            overflow-auto
            bg-[#FAF6F0]
            p-5
          "
        >
          {isImage && (
            <img
              src={file.storageUrl}
              alt={file.originalName}
              className="
                max-h-[72vh]
                max-w-full
                rounded-xl
                object-contain
                shadow-md
              "
            />
          )}

          {isPdf && (
            <iframe
              src={file.storageUrl}
              title={file.originalName}
              className="
                h-[72vh]
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
              "
            />
          )}

          {!canPreview && (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                px-6
                py-16
                text-center
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

              <h3 className="mt-5 text-lg font-bold text-[#4B3932]">Preview not available</h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
                This file type cannot be previewed here. You can open or download the file instead.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={file.storageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#4B3932]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:opacity-90
                  "
                >
                  <ExternalLink size={16} />
                  Open File
                </a>

                <a
                  href={file.storageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={file.originalName}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-[#4B3932]
                    transition
                    hover:bg-[#FAF6F0]
                  "
                >
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          )}
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-[#E7DDD3]
            bg-white
            px-5
            py-3
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              text-xs
              text-stone-400
            "
          >
            <span>{file.mimeType}</span>

            <span>•</span>

            <span>
              {file.size >= 1024 * 1024
                ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                : `${(file.size / 1024).toFixed(1)} KB`}
            </span>

            <span>•</span>

            <span>{new Date(file.createdAt).toLocaleDateString()}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-[#4B3932]
              transition
              hover:bg-[#FAF6F0]
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
