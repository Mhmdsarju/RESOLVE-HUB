import { useUser } from "@/modules/user/hooks/useUser";

// import type { WarRoomParticipant } from "../hooks/useWarRoomSocket";
import type { WarRoomParticipantItemProps } from "../types/warRoom.types";



export default function WarRoomParticipantItem({ participant }: WarRoomParticipantItemProps) {
    
  const { data: user, isLoading, isError } = useUser(participant.userId);

  console.log("👤 USER FETCH:", participant.userId, user, isLoading, isError);

  return (
    <div
      className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
            "
    >
      <div className="flex items-center gap-3">
        <div
          className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F0E7D5]
                        text-sm
                        font-semibold
                        text-[#4B3932]
                    "
        >
          {user?.name?.charAt(0).toUpperCase() ?? "?"}
        </div>

        <div>
          <p className="text-sm font-semibold text-[#4B3932]">
            {isLoading ? "Loading..." : (user?.name ?? "Unknown user")}
          </p>

          <p className="text-xs text-stone-400">Joined war room</p>
        </div>
      </div>

      <span
        className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-green-50
                    px-2.5
                    py-1
                    text-xs
                    font-medium
                    text-green-600
                "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    </div>
  );
}
