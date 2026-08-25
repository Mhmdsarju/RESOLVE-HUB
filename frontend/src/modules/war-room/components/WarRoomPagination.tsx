import { ChevronLeft, ChevronRight } from "lucide-react";

import type { WarRoomPaginationProps } from "../types/warRoom.types";

export default function WarRoomPagination({
  page,
  totalPages,
  onPageChange,
}: WarRoomPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    text-[#4B3932]
                    shadow-sm
                    transition
                    hover:bg-[#FAF6F0]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
      >
        <ChevronLeft size={17} />
      </button>

      <div
        className="
                    flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#4B3932]
                    px-3
                    text-sm
                    font-semibold
                    text-white
                "
      >
        {page}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    text-[#4B3932]
                    shadow-sm
                    transition
                    hover:bg-[#FAF6F0]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                "
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
}
