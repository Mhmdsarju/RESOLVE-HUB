import { useEffect, useMemo, useState } from "react";
import { Send, Smile } from "lucide-react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

import { useMe } from "@/modules/user/hooks/useMe";

import type { WarRoomChatProps, WarRoomMessage } from "../types/warRoom.types";

import WarRoomMessageItem from "./WarRoomMessageItem";

export default function WarRoomChat({
  historyMessages,
  realtimeMessages,
  onSendMessage,
}: WarRoomChatProps) {
  const [content, setContent] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { data: currentUser } = useMe();

  const messages = useMemo(() => {
    const messageMap = new Map<string, WarRoomMessage>();

    for (const message of historyMessages) {
      if (message.id) {
        messageMap.set(message.id, message);
      }
    }

    for (const message of realtimeMessages) {
      if (message.id) {
        messageMap.set(message.id, message);
      }
    }

    return Array.from(messageMap.values()).sort((a, b) => {
      const first = a.createdAt ? new Date(a.createdAt).getTime() : 0;

      const second = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return first - second;
    });
  }, [historyMessages, realtimeMessages]);

  useEffect(() => {
    const messageContainer = document.getElementById(
      "war-room-message-container",
    );

    if (!messageContainer) {
      return;
    }

    messageContainer.scrollTop = messageContainer.scrollHeight;
  }, [messages.length]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setContent((current) => current + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSend = () => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      return;
    }

    onSendMessage(trimmedContent);

    setContent("");
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSend();
    }
  };

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#E7DDD3]
        bg-[#FAF6F0]
      "
    >
      <div
        id="war-room-message-container"
        className="
          min-h-0
          flex-1
          space-y-3
          overflow-y-auto
          px-4
          py-4
        "
      >
        {messages.length === 0 ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-center
            "
          >
            <div>
              <p className="text-xs font-medium text-[#4B3932]">
                No messages yet
              </p>

              <p className="mt-1 text-[10px] text-stone-400">
                Start the conversation with your team.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <WarRoomMessageItem
              key={
                message.id ??
                `${message.userId}-${message.createdAt}-${message.content}`
              }
              message={message}
              isOwnMessage={message.userId === currentUser?.id}
            />
          ))
        )}
      </div>

      <div
        className="
          shrink-0
          border-t
          border-[#E7DDD3]
          bg-white
          p-3
        "
      >
        <div className="relative">
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0 z-50">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width={300}
                height={350}
              />
            </div>
          )}

          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((current) => !current)}
              className="
                inline-flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#D8CBBF]
                bg-[#FAF6F0]
                text-[#4B3932]
                transition
                hover:bg-[#F0E8DF]
              "
            >
              <Smile size={17} />
            </button>

            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={1}
              className="
                min-h-[40px]
                max-h-[90px]
                flex-1
                resize-none
                rounded-xl
                border
                border-[#D8CBBF]
                bg-[#FAF6F0]
                px-3
                py-2.5
                text-xs
                text-[#4B3932]
                outline-none
                transition
                placeholder:text-stone-400
                focus:border-[#8C6D58]
                focus:ring-2
                focus:ring-[#8C6D58]/10
              "
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!content.trim()}
              className="
                inline-flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#4B3932]
                text-white
                transition
                hover:bg-[#3B2E29]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        <p className="mt-1.5 text-[9px] text-stone-400">
          Enter to send · Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}