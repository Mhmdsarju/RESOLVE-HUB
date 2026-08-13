import { ChevronRight, ExternalLink, Globe, Pencil, Radio, Trash2, Webhook } from "lucide-react";

import type { Integration, IntegrationType } from "../types/integration.types";

interface IntegrationCardProps {
  integration: Integration;
  onClick: (integration: Integration) => void;
  onEdit: (integration: Integration) => void;
  onDelete: (integration: Integration) => void;
}

const integrationConfig: Record<
  IntegrationType,
  {
    label: string;
    icon: typeof Globe;
    description: string;
  }
> = {
  PROMETHEUS: {
    label: "Prometheus",
    icon: Radio,
    description: "Metrics monitoring",
  },

  GRAFANA: {
    label: "Grafana",
    icon: Globe,
    description: "Metrics visualization",
  },

  WEBHOOK: {
    label: "Webhook",
    icon: Webhook,
    description: "Event notifications",
  },
};

export default function IntegrationCard({
  integration,
  onClick,
  onEdit,
  onDelete,
}: IntegrationCardProps) {
  const config = integrationConfig[integration.type];

  const Icon = config.icon;

  const configEntries = Object.entries(integration.config ?? {});

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#E7DDD3]
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#D8C9BD]
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={() => onClick(integration)}
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-3
            text-left
            outline-none
          "
        >
          <div
            className="
              flex
              h-12
              w-12
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
            <Icon
              size={21}
              className="
                transition-transform
                duration-300
                group-hover:rotate-3
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
              "
              title={integration.name}
            >
              {integration.name}
            </h3>

            <p className="mt-1 text-xs text-stone-400">
              {config.label} · {config.description}
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onClick(integration)}
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
            duration-200
            hover:bg-[#FAF6F0]
            hover:text-[#4B3932]
            focus:outline-none
            focus:ring-2
            focus:ring-[#4B3932]/10
          "
          title="View integration"
        >
          <ChevronRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </button>
      </div>

      <div
        className="
          mt-5
          rounded-xl
          bg-[#FAF6F0]
          p-4
          transition-all
          duration-300
          group-hover:bg-[#F7F1E9]
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={15} className="text-stone-400" />

            <span className="text-xs font-medium text-stone-500">Configuration</span>
          </div>

          <span className="text-xs font-semibold text-[#4B3932]">
            {configEntries.length} {configEntries.length === 1 ? "setting" : "settings"}
          </span>
        </div>

        {configEntries.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {configEntries.slice(0, 3).map(([key]) => (
              <span
                key={key}
                className="
                    rounded-lg
                    border
                    border-[#E7DDD3]
                    bg-white
                    px-2.5
                    py-1
                    text-[11px]
                    font-medium
                    text-stone-500
                    transition-colors
                    duration-200
                    group-hover:border-[#D8C9BD]
                  "
              >
                {key}
              </span>
            ))}

            {configEntries.length > 3 && (
              <span
                className="
                  rounded-lg
                  bg-white
                  px-2.5
                  py-1
                  text-[11px]
                  font-medium
                  text-stone-400
                "
              >
                +{configEntries.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-[#F0E7D5]
          pt-4
        "
      >
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-semibold
            ${integration.isActive ? "bg-green-50 text-green-700" : "bg-stone-100 text-stone-500"}
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${integration.isActive ? "bg-green-500" : "bg-stone-400"}
            `}
          />

          {integration.isActive ? "Active" : "Inactive"}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit(integration);
            }}
            className="
              rounded-lg
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#F0E7D5]
              hover:text-[#4B3932]
              hover:shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[#4B3932]/10
            "
            title="Edit integration"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(integration);
            }}
            className="
              rounded-lg
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-red-50
              hover:text-red-600
              hover:shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-red-500/10
            "
            title="Delete integration"
          >
            <Trash2 size={16} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClick(integration);
            }}
            className="
              rounded-lg
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#F0E7D5]
              hover:text-[#4B3932]
              hover:shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-[#4B3932]/10
            "
            title="View integration"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
