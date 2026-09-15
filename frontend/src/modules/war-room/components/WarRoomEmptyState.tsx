import { ShieldAlert } from "lucide-react";

import type { WarRoomEmptyStateProps } from "../types/warRoom.types";

export default function WarRoomEmptyState({
  title = "No war rooms found",
  description = "There are no war rooms matching the current filters.",
  action,
}: WarRoomEmptyStateProps) {
  return (
    <div
      className="
                rounded-2xl
                bg-white
                p-10
                text-center
                shadow-sm
            "
    >
      <div
        className="
                    mx-auto
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F0E7D5]
                    text-[#4B3932]
                "
      >
        <ShieldAlert size={22} />
      </div>

      <p className="mt-4 font-medium text-[#4B3932]">{title}</p>

      <p className="mt-1 text-sm text-stone-500">{description}</p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
