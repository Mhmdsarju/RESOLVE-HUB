import { Bell, Check, CheckCheck } from "lucide-react";

import { useNotifications } from "../hooks/useNotifications";
import { useUnreadNotificationCount } from "../hooks/useUnreadNotificationCount";
import { useMarkNotificationAsRead } from "../hooks/useMarkNotificationAsRead";
import { useMarkAllNotificationsAsRead } from "../hooks/useMarkAllNotificationsAsRead";

export default function NotificationPopover() {
  const { data: notifications, isLoading } = useNotifications();
  const { data: unreadCount } = useUnreadNotificationCount();

  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();

  const unreadNotifications =
    notifications?.filter((notification) => !notification.isRead) ?? [];

  const handleNotificationClick = (id: string) => {
    markAsRead.mutate(id);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate();
  };

  return (
    <div
      className="
        absolute
        right-0
        top-14
        z-50
        w-[380px]
        overflow-hidden
        rounded-2xl
        border
        border-[#E7DDD3]
        bg-white
        shadow-xl
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[#E7DDD3]
          px-5
          py-4
        "
      >
        <div>
          <h3 className="text-sm font-bold text-[#4B3932]">
            Notifications
          </h3>

          <p className="mt-0.5 text-xs text-stone-400">
            Stay updated with your activities
          </p>
        </div>

        {unreadCount && unreadCount > 0 ? (
          <button
            onClick={handleMarkAllAsRead}
            disabled={markAllAsRead.isPending}
            className="
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              px-2.5
              py-1.5
              text-[11px]
              font-semibold
              text-[#8C6D58]
              transition
              hover:bg-[#FAF6F0]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        ) : null}
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex gap-3"
              >
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-stone-100" />

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/3 animate-pulse rounded bg-stone-100" />

                  <div className="h-3 w-full animate-pulse rounded bg-stone-100" />

                  <div className="h-2 w-1/3 animate-pulse rounded bg-stone-100" />
                </div>
              </div>
            ))}
          </div>
        ) : unreadNotifications.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#FAF6F0]
              "
            >
              <Bell
                size={20}
                className="text-[#8C6D58]"
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-[#4B3932]">
              No notifications
            </p>

            <p className="mt-1 text-xs text-stone-400">
              You're all caught up.
            </p>
          </div>
        ) : (
          unreadNotifications.map((notification) => (
            <div
              key={notification.id}
              className="
                flex
                items-start
                gap-3
                border-b
                border-[#E7DDD3]/60
                bg-[#FAF6F0]/60
                px-5
                py-4
                transition
                last:border-b-0
                hover:bg-[#FCFAF7]
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F3ECE4]
                "
              >
                <Bell
                  size={17}
                  className="text-[#8C6D58]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-bold text-[#4B3932]">
                    {notification.title}
                  </p>

                  <button
                    onClick={() =>
                      handleNotificationClick(notification.id)
                    }
                    disabled={markAsRead.isPending}
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      text-stone-400
                      transition
                      hover:bg-[#F3ECE4]
                      hover:text-[#8C6D58]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    title="Mark as read"
                  >
                    <Check size={15} />
                  </button>
                </div>

                <p className="mt-1 text-xs leading-5 text-stone-500">
                  {notification.message}
                </p>

                <p className="mt-2 text-[10px] font-medium text-stone-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}