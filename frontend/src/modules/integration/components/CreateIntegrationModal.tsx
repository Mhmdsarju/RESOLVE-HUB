import { useState } from "react";
import { Globe, Radio, Webhook, X } from "lucide-react";

import { useCreateIntegration } from "../hooks/useCreateIntegration";

import type { CreateIntegrationDto, IntegrationType } from "../types/integration.types";

interface CreateIntegrationModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

const integrationTypes: {
  value: IntegrationType;
  label: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    value: "PROMETHEUS",
    label: "Prometheus",
    description: "Connect Prometheus for metrics monitoring.",
    icon: Radio,
  },
  {
    value: "GRAFANA",
    label: "Grafana",
    description: "Connect Grafana for metrics visualization.",
    icon: Globe,
  },
  {
    value: "WEBHOOK",
    label: "Webhook",
    description: "Receive monitoring events through a webhook.",
    icon: Webhook,
  },
];

export default function CreateIntegrationModal({
  projectId,
  isOpen,
  onClose,
}: CreateIntegrationModalProps) {
  const createMutation = useCreateIntegration();

  const [name, setName] = useState("");
  const [type, setType] = useState<IntegrationType>("PROMETHEUS");

  const [config, setConfig] = useState({
    url: "",
    apiKey: "",
    secret: "",
  });

  const resetForm = () => {
    setName("");
    setType("PROMETHEUS");

    setConfig({
      url: "",
      apiKey: "",
      secret: "",
    });
  };

  const handleClose = () => {
    if (createMutation.isPending) {
      return;
    }

    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const selectedType = integrationTypes.find((item) => item.value === type);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedUrl = config.url.trim();

    if (!trimmedName || !trimmedUrl) {
      return;
    }

    let integrationConfig: Record<string, unknown> = {
      url: trimmedUrl,
    };

    if (type === "GRAFANA") {
      integrationConfig = {
        url: trimmedUrl,
        apiKey: config.apiKey.trim(),
      };
    }

    if (type === "WEBHOOK") {
      integrationConfig = {
        url: trimmedUrl,
        secret: config.secret.trim(),
      };
    }

    const data: CreateIntegrationDto = {
      name: trimmedName,
      type,
      config: integrationConfig,
    };

    createMutation.mutate(
      {
        projectId,
        data,
      },
      {
        onSuccess: () => {
          resetForm();
          onClose();
        },
      },
    );
  };

  const isSubmitting = createMutation.isPending;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
        py-6
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            border-b
            border-[#E7DDD3]
            px-6
            py-5
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F0E7D5]
                  text-[#4B3932]
                "
              >
                {selectedType && <selectedType.icon size={19} />}
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#4B3932]">Add Integration</h2>

                <p className="mt-1 text-xs text-stone-400">
                  Connect an external monitoring service.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="
              rounded-xl
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:bg-[#FAF6F0]
              hover:text-[#4B3932]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[75vh] overflow-y-auto">
          <div className="space-y-6 p-6">
            <div>
              <label
                htmlFor="integration-name"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
              >
                Integration Name
              </label>

              <input
                id="integration-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Production Prometheus"
                disabled={isSubmitting}
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  px-4
                  py-3
                  text-sm
                  text-[#4B3932]
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-stone-400
                  hover:border-[#D8C9BD]
                  focus:border-[#4B3932]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#4B3932]/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#4B3932]">Integration Type</p>

              <div className="grid gap-3 md:grid-cols-3">
                {integrationTypes.map((integrationType) => {
                  const Icon = integrationType.icon;

                  const isSelected = type === integrationType.value;

                  return (
                    <button
                      key={integrationType.value}
                      type="button"
                      onClick={() => setType(integrationType.value)}
                      disabled={isSubmitting}
                      className={`
                          rounded-2xl
                          border
                          p-4
                          text-left
                          transition-all
                          duration-300
                          ${
                            isSelected
                              ? "border-[#4B3932] bg-[#FAF6F0] shadow-md"
                              : "border-[#E7DDD3] bg-white hover:-translate-y-0.5 hover:border-[#D8C9BD] hover:shadow-sm"
                          }
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                        `}
                    >
                      <div
                        className={`
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            ${
                              isSelected ? "bg-[#4B3932] text-white" : "bg-[#F0E7D5] text-[#4B3932]"
                            }
                          `}
                      >
                        <Icon size={18} />
                      </div>

                      <p className="mt-3 text-sm font-bold text-[#4B3932]">
                        {integrationType.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-stone-400">
                        {integrationType.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="
                rounded-2xl
                bg-[#FAF6F0]
                p-5
              "
            >
              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#4B3932]">Configuration</h3>

                <p className="mt-1 text-xs text-stone-400">Configure the selected integration.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="integration-url"
                    className="
                      mb-2
                      block
                      text-xs
                      font-semibold
                      text-[#4B3932]
                    "
                  >
                    {type === "WEBHOOK" ? "Webhook URL" : `${selectedType?.label ?? "Service"} URL`}
                  </label>

                  <input
                    id="integration-url"
                    type="url"
                    value={config.url}
                    onChange={(event) =>
                      setConfig((current) => ({
                        ...current,
                        url: event.target.value,
                      }))
                    }
                    placeholder={
                      type === "PROMETHEUS"
                        ? "http://localhost:9090"
                        : type === "GRAFANA"
                          ? "http://localhost:3000"
                          : "https://example.com/webhook"
                    }
                    disabled={isSubmitting}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[#E7DDD3]
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-[#4B3932]
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-stone-400
                      focus:border-[#4B3932]
                      focus:ring-2
                      focus:ring-[#4B3932]/10
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />
                </div>

                {type === "GRAFANA" && (
                  <div>
                    <label
                      htmlFor="grafana-api-key"
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-[#4B3932]
                      "
                    >
                      API Key
                    </label>

                    <input
                      id="grafana-api-key"
                      type="password"
                      value={config.apiKey}
                      onChange={(event) =>
                        setConfig((current) => ({
                          ...current,
                          apiKey: event.target.value,
                        }))
                      }
                      placeholder="Enter Grafana API key"
                      disabled={isSubmitting}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#E7DDD3]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-[#4B3932]
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-stone-400
                        focus:border-[#4B3932]
                        focus:ring-2
                        focus:ring-[#4B3932]/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />
                  </div>
                )}

                {type === "WEBHOOK" && (
                  <div>
                    <label
                      htmlFor="webhook-secret"
                      className="
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-[#4B3932]
                      "
                    >
                      Webhook Secret
                    </label>

                    <input
                      id="webhook-secret"
                      type="password"
                      value={config.secret}
                      onChange={(event) =>
                        setConfig((current) => ({
                          ...current,
                          secret: event.target.value,
                        }))
                      }
                      placeholder="Enter webhook secret"
                      disabled={isSubmitting}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#E7DDD3]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-[#4B3932]
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-stone-400
                        focus:border-[#4B3932]
                        focus:ring-2
                        focus:ring-[#4B3932]/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="
              flex
              items-center
              justify-end
              gap-3
              border-t
              border-[#E7DDD3]
              bg-[#FAF6F0]/60
              px-6
              py-4
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                text-[#4B3932]
                transition-all
                duration-200
                hover:bg-[#FAF6F0]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !config.url.trim()}
              className="
                rounded-xl
                bg-[#4B3932]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#3B2E29]
                hover:shadow-md
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting ? "Creating..." : "Create Integration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
