import { CheckCircle2, Clock3, ListTodo, Loader2 } from "lucide-react";

interface MyTasksStatsProps {
  totalTasks: number;
  todoTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}

export default function MyTasksStats({
  totalTasks,
  todoTasks,
  inProgressTasks,
  completedTasks,
}: MyTasksStatsProps) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Total Tasks</p>

            <p className="mt-2 text-3xl font-bold text-[#4B3932]">{totalTasks}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
            <ListTodo size={20} />
          </div>
        </div>

        <p className="mt-3 text-xs text-stone-400">Assigned to you</p>
      </div>

      <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">To Do</p>

            <p className="mt-2 text-3xl font-bold text-blue-600">{todoTasks}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Clock3 size={20} />
          </div>
        </div>

        <p className="mt-3 text-xs text-stone-400">Waiting to start</p>
      </div>

      <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">In Progress</p>

            <p className="mt-2 text-3xl font-bold text-purple-600">{inProgressTasks}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Loader2 size={20} />
          </div>
        </div>

        <p className="mt-3 text-xs text-stone-400">Currently working</p>
      </div>

      <div className="rounded-2xl border border-[#E7DDD3] bg-[#FFFEFC] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Completed</p>

            <p className="mt-2 text-3xl font-bold text-green-600">{completedTasks}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <p className="mt-3 text-xs text-stone-400">Finished tasks</p>
      </div>
    </div>
  );
}
