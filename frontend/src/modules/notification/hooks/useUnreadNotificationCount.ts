import { useQuery } from "@tanstack/react-query";

import { getUnreadNotificationCount } from "../api/notificationApi";

export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadNotificationCount,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}