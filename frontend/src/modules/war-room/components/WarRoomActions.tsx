import { LogIn, LogOut, XCircle } from "lucide-react";
import { useState } from "react";

import type { WarRoomActionsProps } from "../types/warRoom.types";

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
  const [showJoinConfirmation, setShowJoinConfirmation] = useState(false);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const isActive = warRoom.status === "ACTIVE";

 const handleJoinConfirm = () => {
  setShowJoinConfirmation(false);
  onJoin?.();
};

const handleLeaveConfirm = () => {
  setShowLeaveConfirmation(false);
  onLeave?.();
};

  return (
    <>
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
            onClick={() => setShowJoinConfirmation(true)}
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
            onClick={() => setShowLeaveConfirmation(true)}
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

      {showJoinConfirmation && (
        <div
          className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-4
            "
        >
          <div
            className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-xl
            "
          >
            <h2 className="text-lg font-semibold text-[#4B3932]">Join War Room?</h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Are you sure you want to join this war room?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowJoinConfirmation(false)}
                className="
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
                Cancel
              </button>

              <button
                type="button"
                onClick={handleJoinConfirm}
                disabled={isJoining}
                className="
                        rounded-xl
                        bg-[#4B3932]
                        px-4
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
                {isJoining ? "Joining..." : "Join War Room"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showLeaveConfirmation && (
        <div
          className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/40
                px-4
            "
        >
          <div
            className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                p-6
                shadow-xl
            "
          >
            <h2 className="text-lg font-semibold text-[#4B3932]">Leave War Room?</h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Are you sure you want to leave this war room?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLeaveConfirmation(false)}
                className="
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
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLeaveConfirm}
                disabled={isLeaving}
                className="
                        rounded-xl
                        bg-red-600
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
              >
                {isLeaving ? "Leaving..." : "Leave War Room"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
