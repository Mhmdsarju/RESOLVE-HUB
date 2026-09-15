import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

import { useCreateAlert } from "../hooks/useCreateAlert";
import type { CreateAlertModalProps } from "../types/alert.types";


export default function CreateAlertModal({ projectId, isOpen, onClose }: CreateAlertModalProps) {
  const createMutation = useCreateAlert();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"FIRING" | "RESOLVED">("FIRING");
  const [payload, setPayload] = useState("{}");

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (createMutation.isPending) {
      return;
    }

    setTitle("");
    setMessage("");
    setStatus("FIRING");
    setPayload("{}");

    onClose();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let parsedPayload: Record<string, unknown>;

    try {
      parsedPayload = JSON.parse(payload);
    } catch {
      return;
    }

    createMutation.mutate(
      {
        projectId,
        data: {
          title: title.trim(),
          message: message.trim() || undefined,
          status,
          payload: parsedPayload,
        },
      },
      {
        onSuccess: () => {
          setTitle("");
          setMessage("");
          setStatus("FIRING");
          setPayload("{}");

          onClose();
        },
      },
    );
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
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-lg
          overflow-y-auto
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F0E7D5]
                  text-[#4B3932]
                "
              >
                <AlertTriangle size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#4B3932]">Create Alert</h2>

                <p className="mt-1 text-sm text-stone-500">
                  Create a manual alert for this monitoring project.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={createMutation.isPending}
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
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="alert-title" className="text-sm font-semibold text-[#4B3932]">
                Title
              </label>

              <input
                id="alert-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="High CPU Usage"
                required
                className="
                  mt-2
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
                "
              />
            </div>

            <div>
              <label htmlFor="alert-message" className="text-sm font-semibold text-[#4B3932]">
                Message
              </label>

              <textarea
                id="alert-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="CPU usage exceeded 90%."
                rows={4}
                className="
                  mt-2
                  w-full
                  resize-none
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
                "
              />
            </div>

            <div>
              <label htmlFor="alert-status" className="text-sm font-semibold text-[#4B3932]">
                Status
              </label>

              <select
                id="alert-status"
                value={status}
                onChange={(event) => setStatus(event.target.value as "FIRING" | "RESOLVED")}
                className="
                  mt-2
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
                  hover:border-[#D8C9BD]
                  focus:border-[#4B3932]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#4B3932]/10
                "
              >
                <option value="FIRING">Firing</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div>
              <label htmlFor="alert-payload" className="text-sm font-semibold text-[#4B3932]">
                Payload
              </label>

              <textarea
                id="alert-payload"
                value={payload}
                onChange={(event) => setPayload(event.target.value)}
                rows={7}
                spellCheck={false}
                className="
                  mt-2
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-[#FAF6F0]
                  px-4
                  py-3
                  font-mono
                  text-sm
                  text-[#4B3932]
                  outline-none
                  transition-all
                  duration-200
                  hover:border-[#D8C9BD]
                  focus:border-[#4B3932]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#4B3932]/10
                "
              />

              <p className="mt-2 text-xs text-stone-400">Enter a valid JSON object.</p>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#F0E7D5] pt-5">
              <button
                type="button"
                onClick={handleClose}
                disabled={createMutation.isPending}
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
                disabled={createMutation.isPending || !title.trim()}
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
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {createMutation.isPending ? "Creating..." : "Create Alert"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
