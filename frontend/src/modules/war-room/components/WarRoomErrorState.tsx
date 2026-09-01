import { AlertCircle, RefreshCcw } from "lucide-react";

import type { WarRoomErrorStateProps } from "../types/warRoom.types";

export default function WarRoomErrorState({ onRetry }: WarRoomErrorStateProps) {
  return (
    <div
      className="
                rounded-2xl
                bg-white
                p-10
                text-center
                shadow-sm
            "
    >
      <div
        className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-red-50
                    text-red-500
                "
      >
        <AlertCircle size={22} />
      </div>

      <p className="mt-4 font-medium text-[#4B3932]">Failed to load war rooms</p>

      <p className="mt-1 text-sm text-stone-500">Something went wrong while fetching war rooms.</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-[#4B3932]
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#3B2E29]
                    "
        >
          <RefreshCcw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}
