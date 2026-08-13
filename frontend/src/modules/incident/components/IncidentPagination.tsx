interface IncidentPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function IncidentPagination({
  page,
  totalPages,
  onPageChange,
}: IncidentPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 shadow-sm">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrevious}
        className="
          rounded-xl
          border
          border-[#E7DDD3]
          px-4
          py-2
          text-sm
          font-medium
          text-[#4B3932]
          transition
          hover:bg-[#FAF6F0]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Previous
      </button>

      <div className="text-sm font-medium text-[#4B3932]">
        Page {page} of {totalPages}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoNext}
        className="
          rounded-xl
          border
          border-[#E7DDD3]
          px-4
          py-2
          text-sm
          font-medium
          text-[#4B3932]
          transition
          hover:bg-[#FAF6F0]
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next
      </button>
    </div>
  );
}
