import { Boxes, RefreshCw } from "lucide-react";

import IntegrationCard from "./IntegrationCard";

import type {  IntegrationListProps} from "../types/integration.types";


export default function IntegrationList({  integrations,  isLoading,  isError,  onIntegrationClick,  onIntegrationEdit,  onIntegrationDelete,}: IntegrationListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              h-64
              animate-pulse
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              shadow-sm
            "
          >
            <div className="flex items-center gap-3 p-5">
              <div className="h-12 w-12 rounded-xl bg-[#F0E7D5]" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-[#F0E7D5]" />
                <div className="h-3 w-24 rounded bg-[#FAF6F0]" />
              </div>
            </div>

            <div className="mx-5 h-20 rounded-xl bg-[#FAF6F0]" />

            <div className="mx-5 mt-5 flex justify-between border-t border-[#F0E7D5] pt-4">
              <div className="h-6 w-16 rounded-full bg-[#F0E7D5]" />
              <div className="h-8 w-24 rounded-lg bg-[#FAF6F0]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          flex
          min-h-72
          flex-col
          items-center
          justify-center
          rounded-3xl
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

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">Unable to load integrations</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Something went wrong while loading the integrations for this monitoring project.
        </p>
      </div>
    );
  }

  if (integrations.length === 0) {
    return (
      <div
        className="
          group
          flex
          min-h-72
          flex-col
          items-center
          justify-center
          rounded-3xl
          border
          border-dashed
          border-[#D8C9BD]
          bg-white
          px-6
          text-center
          shadow-sm
          transition-all
          duration-300
          hover:border-[#CBB9AA]
          hover:bg-[#FFFCF8]
          hover:shadow-md
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
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:rotate-2
          "
        >
          <Boxes size={28} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">No integrations yet</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Connect Prometheus, Grafana, or a webhook to start integrating this monitoring project
          with ResolveHub.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onClick={onIntegrationClick}
          onEdit={onIntegrationEdit}
          onDelete={onIntegrationDelete}
        />
      ))}
    </div>
  );
}
