import type { Task, TaskCardProps, TaskTeamData } from "../types/task.types";

import MyTaskCard from "./MyTaskCard";

interface MyTasksListProps {
  tasks: Task[];
  taskTeamData: TaskTeamData[];
  taskCardProps: Omit<TaskCardProps, "task" | "users" | "isTeamLead">;
}

export default function MyTasksList({ tasks, taskTeamData, taskCardProps }: MyTasksListProps) {
  if (tasks.length === 0) {
    return (
      <div
        className="
          mt-6
          rounded-2xl
          border
          border-dashed
          border-[#D8CDC1]
          bg-[#FFFEFC]
          px-6
          py-14
          text-center
        "
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
          <span className="text-xl font-bold">✓</span>
        </div>

        <h3 className="mt-4 text-lg font-bold text-[#4B3932]">No tasks found</h3>

        <p className="mt-2 text-sm text-stone-500">Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-2">
      {tasks.map((task) => {
        const teamData = taskTeamData.find((item) => item.taskId === task.id);

        const users =
          teamData?.members.map((member) => ({
            id: member.userId,
            name: member.name,
            email: member.email,
          })) ?? [];

        return (
          <MyTaskCard
            key={task.id}
            task={task}
            users={users}
            isTeamLead={teamData?.isTeamLead ?? false}
            {...taskCardProps}
          />
        );
      })}
    </div>
  );
}
