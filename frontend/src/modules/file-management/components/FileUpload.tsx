import { useRef, useState } from "react";
import { FileUp, X } from "lucide-react";

import { useUploadFile } from "../hooks/useUploadFile";
import { acceptedFileTypes } from "../constants/acceptedFileTypes";
import { allowedMimeTypes, MAX_FILE_SIZE } from "../constants/allowedMimeTypes";

import type { FileUploadProps } from "../types/file.types";

export default function FileUpload({ taskId }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const uploadFileMutation = useUploadFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setErrorMessage("");

    if (!file) {
      return;
    }

    if (!allowedMimeTypes.includes(file.type)) {
      setSelectedFile(null);

      setErrorMessage("Unsupported file type. Please select a supported file.");

      event.target.value = "";

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setSelectedFile(null);

      setErrorMessage("File size must be less than 10 MB.");

      event.target.value = "";

      return;
    }

    setSelectedFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);

    setErrorMessage("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setErrorMessage("");

    try {
      await uploadFileMutation.mutateAsync({
        taskId,
        file: selectedFile,
      });

      handleRemove();
    } catch {
      setErrorMessage("Unable to upload file. Please try again.");
    }
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-[#E7DDD3]
        bg-white
        p-5
        shadow-sm
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-[#F0E7D5]
            text-[#4B3932]
          "
        >
          <FileUp size={21} />
        </div>

        <div>
          <h3 className="text-base font-bold text-[#4B3932]">Upload File</h3>

          <p className="mt-0.5 text-sm text-stone-400">Add a file related to this task.</p>
        </div>
      </div>

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-dashed
          border-[#D8C9BD]
          bg-[#FAF6F0]
          p-6
          text-center
        "
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          disabled={uploadFileMutation.isPending}
          className="hidden"
        />

        {!selectedFile ? (
          <>
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-white
                text-[#8B6F61]
                shadow-sm
              "
            >
              <FileUp size={21} />
            </div>

            <p className="mt-3 text-sm font-semibold text-[#4B3932]">Choose a file to upload</p>

            <p className="mt-1 text-xs text-stone-400">
              Images, PDF, documents, code and text files up to 10 MB.
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploadFileMutation.isPending}
              className="
                mt-4
                rounded-xl
                bg-[#4B3932]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Choose File
            </button>
          </>
        ) : (
          <div className="text-left">
            <div className="flex items-center justify-between gap-3">
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
                    bg-white
                    text-[#4B3932]
                  "
                >
                  <FileUp size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#4B3932]">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-xs text-stone-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemove}
                disabled={uploadFileMutation.isPending}
                className="
                  shrink-0
                  rounded-lg
                  p-2
                  text-stone-400
                  transition
                  hover:bg-red-50
                  hover:text-red-500
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                title="Remove file"
              >
                <X size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleUpload}
              disabled={uploadFileMutation.isPending}
              className="
                mt-4
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#4B3932]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {uploadFileMutation.isPending ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />
                  Uploading...
                </>
              ) : (
                "Upload File"
              )}
            </button>
          </div>
        )}
      </div>

      {errorMessage && (
        <div
          className="
            mt-3
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-4
            py-3
          "
        >
          <p className="text-sm font-medium text-red-500">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
