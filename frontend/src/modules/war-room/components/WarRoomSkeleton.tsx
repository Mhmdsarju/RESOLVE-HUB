export default function WarRoomSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                    "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="w-full space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-[#F0E7D5]" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-[#F0E7D5]" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-[#F0E7D5]" />
              </div>

              <div className="h-6 w-2/3 animate-pulse rounded-lg bg-[#F0E7D5]" />

              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-[#FAF6F0]" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#FAF6F0]" />
              </div>
            </div>

            <div className="h-5 w-5 animate-pulse rounded bg-[#F0E7D5]" />
          </div>

          <div className="mt-5 flex gap-5">
            <div className="h-4 w-28 animate-pulse rounded bg-[#FAF6F0]" />

            <div className="h-4 w-24 animate-pulse rounded bg-[#FAF6F0]" />
          </div>
        </div>
      ))}
    </div>
  );
}
