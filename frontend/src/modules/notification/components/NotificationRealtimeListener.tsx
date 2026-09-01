import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Bell } from "lucide-react";

import { socket } from "@/core/config/socket";

import type { Notification } from "../types/notification.types";

export default function NotificationRealtimeListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewNotification = (notification: Notification) => {
      queryClient.setQueryData<Notification[]>(["notifications"], (currentNotifications = []) => {
        return [notification, ...currentNotifications];
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications", "unread-count"],
      });

      toast(
        <div className="flex items-center gap-2">
          <Bell size={17} className="shrink-0 text-[#8C6D58]" />

          <span className="text-sm font-semibold text-[#4B3932]">New message</span>
        </div>,
        {
          duration: 3000,
        },
      );

      const audio = new Audio("notification.mp3");

      audio.volume = 0.5;

      audio.play().catch(() => {
        console.log("Notification sound could not be played");
      });
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
    };
  }, [queryClient]);

  return null;
}
