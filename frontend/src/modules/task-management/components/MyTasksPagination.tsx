import { ChevronLeft, ChevronRight } from "lucide-react";

interface MyTasksPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function MyTasksPagination({
  page,
  totalPages,
  onPageChange,
}: MyTasksPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="
          inline-flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-[#E7DDD3]
          bg-[#FFFEFC]
          text-[#4B3932]
          transition
          hover:bg-[#FAF6F0]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`
            h-10
            min-w-10
            rounded-xl
            px-3
            text-sm
            font-semibold
            transition
            ${
              pageNumber === page
                ? "bg-[#4B3932] text-white"
                : "border border-[#E7DDD3] bg-[#FFFEFC] text-[#4B3932] hover:bg-[#FAF6F0]"
            }
          `}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          inline-flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-[#E7DDD3]
          bg-[#FFFEFC]
          text-[#4B3932]
          transition
          hover:bg-[#FAF6F0]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
