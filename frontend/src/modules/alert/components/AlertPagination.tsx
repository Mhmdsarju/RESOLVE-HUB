import { ChevronLeft, ChevronRight } from "lucide-react";

import type { AlertPaginationProps } from "../types/alert.types";

export default function AlertPagination({ page, totalPages, onPageChange }: AlertPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-between border-t border-[#E7DDD3] pt-5">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#E7DDD3]
          bg-white
          px-4
          py-2.5
          text-sm
          font-medium
          text-[#4B3932]
          transition-all
          duration-300
          hover:bg-[#FAF6F0]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      <span className="text-sm font-medium text-stone-500">
        Page <span className="font-semibold text-[#4B3932]">{page}</span> of{" "}
        <span className="font-semibold text-[#4B3932]">{totalPages}</span>
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#E7DDD3]
          bg-white
          px-4
          py-2.5
          text-sm
          font-medium
          text-[#4B3932]
          transition-all
          duration-300
          hover:bg-[#FAF6F0]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
