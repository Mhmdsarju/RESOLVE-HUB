import { useUser } from "@/modules/user/hooks/useUser";

import type { WarRoomMessageItemProps } from "../types/warRoom.types";

export default function WarRoomMessageItem({ message, isOwnMessage }: WarRoomMessageItemProps) {
  const { data: user, isLoading } = useUser(message.userId);

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          flex
          max-w-[75%]
          flex-col
          ${isOwnMessage ? "items-end" : "items-start"}
        `}
      >
        {!isOwnMessage && (
          <p className="mb-1 px-1 text-[11px] font-semibold text-stone-500">
            {isLoading ? "Loading..." : (user?.name ?? "Unknown user")}
          </p>
        )}

        <div
          className={`
            rounded-xl
            px-3
            py-2
            ${
              isOwnMessage
                ? "rounded-br-md bg-[#4B3932] text-white"
                : "rounded-bl-md border border-[#E7DDD3] bg-white text-[#4B3932]"
            }
          `}
        >
          <p className="whitespace-pre-wrap break-words text-xs leading-relaxed">
            {message.content}
          </p>
        </div>

        {message.createdAt && (
          <p
            className={`
              mt-1
              px-1
              text-[9px]
              text-stone-400
              ${isOwnMessage ? "text-right" : "text-left"}
            `}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
