import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

import NotificationPopover from "@/modules/notification/components/NotificationPopover";
import { useUnreadNotificationCount } from "@/modules/notification/hooks/useUnreadNotificationCount";

export default function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  const { data: unreadCount } = useUnreadNotificationCount();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-[#E7DDD3]
        bg-linear-to-r
        from-[#FFFDFC]
        via-[#FAF6F0]
        to-[#F5EEE6]
        px-8
      "
    >
      <div />

      <div
        ref={notificationRef}
        className="relative flex items-center gap-5"
      >
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="
            relative
            rounded-xl
            p-2
            transition
            hover:bg-[#F5EFE7]
          "
        >
          <Bell
            size={22}
            className="text-[#4B3932]"
          />

          {unreadCount && unreadCount > 0 ? (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                px-1
                text-[10px]
                font-bold
                text-white
              "
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </button>

        {isOpen && <NotificationPopover />}
      </div>
    </header>
  );
}