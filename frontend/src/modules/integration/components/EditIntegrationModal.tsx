import { useState } from "react";
import { X } from "lucide-react";

import { useUpdateIntegration } from "../hooks/useUpdateIntegration";

import type {  IntegrationType,  UpdateIntegrationDto,EditIntegrationModalProps,EditIntegrationFormProps} from "../types/integration.types";
import { INTEGRATION_TYPES } from "../constants/integration.constant";

const integrationTypes=INTEGRATION_TYPES;

export default function EditIntegrationModal({  integration,  isOpen,  onClose,}: EditIntegrationModalProps) {
  const updateMutation = useUpdateIntegration();

  if (!isOpen || !integration) {
    return null;
  }

  return (
    <EditIntegrationForm
      key={integration.id}
      integration={integration}
      onClose={onClose}
      isSubmitting={updateMutation.isPending}
      onUpdate={(data) => {
        updateMutation.mutate(
          {
            id: integration.id,
            data,
          },
          {
            onSuccess: onClose,
          },
        );
      }}
    />
  );
}


function EditIntegrationForm({
  integration,
  onClose,
  isSubmitting,
  onUpdate,
}: EditIntegrationFormProps) {
  const [name, setName] = useState(integration.name);

  const [type, setType] = useState<IntegrationType>(integration.type);

  const [url, setUrl] = useState(
    typeof integration.config?.url === "string" ? integration.config.url : "",
  );

  const [apiKey, setApiKey] = useState(
    typeof integration.config?.apiKey === "string" ? integration.config.apiKey : "",
  );

  const [secret, setSecret] = useState(
    typeof integration.config?.secret === "string" ? integration.config.secret : "",
  );

  const [isActive, setIsActive] = useState(integration.isActive);

  const selectedType = integrationTypes.find((item) => item.value === type);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedUrl = url.trim();

    if (!trimmedName || !trimmedUrl) {
      return;
    }

    let config: Record<string, unknown> = {
      url: trimmedUrl,
    };

    if (type === "GRAFANA") {
      config = {
        url: trimmedUrl,
        apiKey: apiKey.trim(),
      };
    }

    if (type === "WEBHOOK") {
      config = {
        url: trimmedUrl,
        secret: secret.trim(),
      };
    }

    const data: UpdateIntegrationDto = {
      name: trimmedName,
      type,
      config,
      isActive,
    };

    onUpdate(data);
  };

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
          onClose();
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
            items-center
            justify-between
            border-b
            border-[#E7DDD3]
            px-6
            py-5
          "
        >
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
              <h2 className="text-xl font-bold text-[#4B3932]">Edit Integration</h2>

              <p className="mt-1 text-xs text-stone-400">Update your integration configuration.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
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
                htmlFor="edit-integration-name"
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
                id="edit-integration-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
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

            <div className="rounded-2xl bg-[#FAF6F0] p-5">
              <h3 className="text-sm font-bold text-[#4B3932]">Configuration</h3>

              <p className="mt-1 text-xs text-stone-400">Update the selected integration.</p>

              <div className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="edit-integration-url"
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
                    id="edit-integration-url"
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
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
                      htmlFor="edit-grafana-api-key"
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
                      id="edit-grafana-api-key"
                      type="password"
                      value={apiKey}
                      onChange={(event) => setApiKey(event.target.value)}
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
                      htmlFor="edit-webhook-secret"
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
                      id="edit-webhook-secret"
                      type="password"
                      value={secret}
                      onChange={(event) => setSecret(event.target.value)}
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
                        focus:border-[#4B3932]
                        focus:ring-2
                        focus:ring-[#4B3932]/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />
                  </div>
                )}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    px-4
                    py-3
                  "
                >
                  <div>
                    <p className="text-sm font-semibold text-[#4B3932]">Integration Status</p>

                    <p className="mt-1 text-xs text-stone-400">
                      Enable or disable this integration.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsActive((current) => !current)}
                    disabled={isSubmitting}
                    className={`
                      relative
                      h-6
                      w-11
                      rounded-full
                      transition-all
                      duration-300
                      ${isActive ? "bg-[#4B3932]" : "bg-stone-300"}
                    `}
                  >
                    <span
                      className={`
                        absolute
                        top-1
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        shadow-sm
                        transition-transform
                        duration-300
                        ${isActive ? "translate-x-6" : "translate-x-1"}
                      `}
                    />
                  </button>
                </div>
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
              onClick={onClose}
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
              disabled={isSubmitting || !name.trim() || !url.trim()}
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
              {isSubmitting ? "Updating..." : "Update Integration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
