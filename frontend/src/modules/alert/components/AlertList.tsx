import { AlertCircle, RefreshCw } from "lucide-react";

import AlertCard from "./AlertCard";
import AlertPagination from "./AlertPagination";

import type { AlertListProps } from "../types/alert.types";

export default function AlertList({
  alerts,
  isLoading,
  isError,
  onAlertClick,
  page,
  totalPages,
  onPageChange,
}: AlertListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              h-56
              animate-pulse
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              shadow-sm
            "
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-64
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-red-100
          bg-white
          px-6
          text-center
          shadow-sm
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-red-50
            text-red-500
          "
        >
          <RefreshCw size={24} />
        </div>

        <h3 className="mt-4 text-lg font-bold text-[#4B3932]">Unable to load alerts</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Something went wrong while loading alerts for this monitoring project.
        </p>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div
        className="
          flex
          min-h-72
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-[#D8C9BD]
          bg-white
          px-6
          text-center
          shadow-sm
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#F0E7D5]
            text-[#4B3932]
          "
        >
          <AlertCircle size={28} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">No alerts yet</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Alerts generated for this monitoring project will appear here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} onClick={onAlertClick} />
        ))}
      </div>

      <AlertPagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}
