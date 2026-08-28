import { RotateCcw } from "lucide-react";

import type { WarRoomStatus, WarRoomFiltersProps } from "../types/warRoom.types";

import { warRoomStatusOptions } from "../constants/warRoom.constants";

export default function WarRoomFilters({ filters, onChange, onReset }: WarRoomFiltersProps) {
  return (
    <div
      className="
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-white
                p-4
                shadow-sm
            "
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          {/* <Search
            size={18}
            className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-stone-400
                        "
          /> */}

          {/* <input
            type="text"
            value={filters.search ?? ""}
            onChange={(event) =>
              onChange({
                ...filters,
                page: 1,
                search: event.target.value,
              })
            }
            placeholder="Search war rooms..."
            className="
                            w-full
                            rounded-xl
                            border
                            border-[#E7DDD3]
                            bg-[#FAF6F0]
                            py-2.5
                            pl-10
                            pr-4
                            text-sm
                            text-[#4B3932]
                            outline-none
                            transition
                            focus:border-[#4B3932]
                            focus:ring-1
                            focus:ring-[#4B3932]
                        "
          /> */}
        </div>

        <select
          value={filters.status ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              page: 1,
              status: event.target.value ? (event.target.value as WarRoomStatus) : undefined,
            })
          }
          className="
                        rounded-xl
                        border
                        border-[#E7DDD3]
                        bg-[#FAF6F0]
                        px-4
                        py-2.5
                        text-sm
                        text-[#4B3932]
                        outline-none
                        transition
                        focus:border-[#4B3932]
                        focus:ring-1
                        focus:ring-[#4B3932]
                    "
        >
          <option value="">All Status</option>

          {warRoomStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onReset}
          className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
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
                    "
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
}
