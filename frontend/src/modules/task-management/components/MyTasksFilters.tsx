import { Search, SlidersHorizontal } from "lucide-react";

import type { TaskPriority, TaskStatus, TaskType } from "../types/task.types";

interface MyTasksFiltersProps {
  search: string;
  status: TaskStatus | "";
  priority: TaskPriority | "";
  type: TaskType | "";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TaskStatus | "") => void;
  onPriorityChange: (value: TaskPriority | "") => void;
  onTypeChange: (value: TaskType | "") => void;
}

export default function MyTasksFilters({
  search,
  status,
  priority,
  type,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onTypeChange,
}: MyTasksFiltersProps) {
  return (
    <div className="mt-6 rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#4B3932]">
        <SlidersHorizontal size={17} />
        Filters
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative lg:col-span-1">
          <Search
            size={17}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-stone-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-3
              py-2.5
              pl-10
              text-sm
              text-[#4B3932]
              outline-none
              transition
              placeholder:text-stone-400
              focus:border-[#4B3932]
            "
          />
        </div>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus | "")}
          className="
            rounded-xl
            border
            border-[#E7DDD3]
            bg-white
            px-3
            py-2.5
            text-sm
            font-medium
            text-[#4B3932]
            outline-none
            transition
            focus:border-[#4B3932]
          "
        >
          <option value="">All Status</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value as TaskPriority | "")}
          className="
            rounded-xl
            border
            border-[#E7DDD3]
            bg-white
            px-3
            py-2.5
            text-sm
            font-medium
            text-[#4B3932]
            outline-none
            transition
            focus:border-[#4B3932]
          "
        >
          <option value="">All Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <select
          value={type}
          onChange={(event) => onTypeChange(event.target.value as TaskType | "")}
          className="
            rounded-xl
            border
            border-[#E7DDD3]
            bg-white
            px-3
            py-2.5
            text-sm
            font-medium
            text-[#4B3932]
            outline-none
            transition
            focus:border-[#4B3932]
          "
        >
          <option value="">All Types</option>
          <option value="MANUAL">MANUAL</option>
          <option value="AUTOMATIC">AUTOMATIC</option>
        </select>
      </div>
    </div>
  );
}
