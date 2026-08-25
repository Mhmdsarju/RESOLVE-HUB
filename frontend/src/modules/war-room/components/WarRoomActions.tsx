import { LogIn, LogOut, XCircle } from "lucide-react";

import type { WarRoomActionsProps} from "../types/warRoom.types";

export default function WarRoomActions({
  warRoom,
  canClose = false,
  isJoined = false,
  isJoining = false,
  isLeaving = false,
  isClosing = false,
  onJoin,
  onLeave,
  onClose,
}: WarRoomActionsProps) {
  const isActive = warRoom.status === "ACTIVE";

  return (
    <div
      className="
                flex
                flex-wrap
                items-center
                gap-3
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-white
                p-4
                shadow-sm
            "
    >
      {isActive && !isJoined && (
        <button
          type="button"
          onClick={onJoin}
          disabled={isJoining}
          className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#4B3932]
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-[#3B2E29]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
        >
          <LogIn size={17} />

          {isJoining ? "Joining..." : "Join War Room"}
        </button>
      )}

      {isActive && isJoined && (
        <button
          type="button"
          onClick={onLeave}
          disabled={isLeaving}
          className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[#E7DDD3]
                        bg-white
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-[#4B3932]
                        transition
                        hover:bg-[#FAF6F0]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
        >
          <LogOut size={17} />

          {isLeaving ? "Leaving..." : "Leave War Room"}
        </button>
      )}

      {canClose && isActive && (
        <button
          type="button"
          onClick={onClose}
          disabled={isClosing}
          className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-red-600
                        transition
                        hover:bg-red-100
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
        >
          <XCircle size={17} />

          {isClosing ? "Closing..." : "Close War Room"}
        </button>
      )}

      {!isActive && (
        <div
          className="
                        rounded-xl
                        bg-stone-100
                        px-4
                        py-2.5
                        text-sm
                        font-medium
                        text-stone-500
                    "
        >
          This war room is closed.
        </div>
      )}
    </div>
  );
}
