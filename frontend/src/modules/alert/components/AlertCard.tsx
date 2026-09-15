import {  Bell,  ChevronRight,  Clock3,} from "lucide-react";

import type { AlertCardProps } from "../types/alert.types";

import {  ALERT_SOURCE_CONFIG,  ALERT_STATUS_CONFIG,} from "../constants/alert.constants";

export default function AlertCard({  alert,  onClick,}: AlertCardProps) {
  
  const status = ALERT_STATUS_CONFIG[alert.status];
  const StatusIcon = status.icon;

  const source = ALERT_SOURCE_CONFIG[alert.source];

  return (
    <button
      type="button"
      onClick={() => onClick(alert)}
      className="
        group
        w-full
        rounded-2xl
        border
        border-[#E7DDD3]
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#D8C9BD]
        hover:shadow-xl
        focus:outline-none
        focus:ring-2
        focus:ring-[#4B3932]/10
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F0E7D5]
              text-[#4B3932]
              shadow-sm
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:shadow-md
            "
          >
            <Bell
              size={20}
              className="
                transition-transform
                duration-300
                group-hover:rotate-6
              "
            />
          </div>

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-base
                font-bold
                text-[#4B3932]
                transition-colors
                duration-200
                group-hover:text-[#3B2E29]
              "
              title={alert.title}
            >
              {alert.title}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-xs text-stone-400">
                {source.label}
              </span>

              <span className="text-stone-300">•</span>

              <span className="text-xs text-stone-400">
                {new Date(alert.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-stone-400
            transition-all
            duration-300
            group-hover:bg-[#FAF6F0]
            group-hover:text-[#4B3932]
          "
        >
          <ChevronRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </div>
      </div>

      <div className="mt-5">
        <p
          className="
            line-clamp-2
            min-h-40px
            text-sm
            leading-5
            text-stone-500
          "
        >
          {alert.message || "No message provided."}
        </p>
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          gap-3
          border-t
          border-[#F0E7D5]
          pt-4
        "
      >
        <div
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-semibold
            transition-all
            duration-200
            group-hover:scale-105
            ${status.className}
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${status.dotClassName}
            `}
          />

          <StatusIcon size={13} />

          {status.label}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <Clock3 size={13} />

          <span>
            {new Date(alert.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </button>
  );
}