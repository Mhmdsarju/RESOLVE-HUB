import { ClipboardCheck } from "lucide-react";

import type { User } from "@/modules/auth/types/auth.types";

interface MyTasksHeaderProps {
  user: User | null;
}

export default function MyTasksHeader({ user }: MyTasksHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#E7DDD3] bg-[#FFFEFC] px-6 py-7 shadow-sm sm:px-8">
      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#F0E7D5]/60 blur-2xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] shadow-sm">
            <ClipboardCheck size={26} />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
              Workspace
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#4B3932] sm:text-3xl">
              My Tasks
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
              View your assigned tasks and manage their progress.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B3932] text-sm font-bold text-white">
            {user?.name?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#4B3932]">
              {user?.name ?? "Engineer"}
            </p>

            <p className="text-xs text-stone-400">{user?.email ?? "Your workspace"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}