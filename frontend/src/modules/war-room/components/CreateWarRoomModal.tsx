import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

import { useCreateWarRoom } from "../hooks/useCreateWarRoom";
import { useIncidents } from "@/modules/incident/hooks/useIncidents";

import type { CreateWarRoomModalProps } from "../types/warRoom.types";

export default function CreateWarRoomModal({ isOpen, onClose }: CreateWarRoomModalProps) {
  const [incidentId, setIncidentId] = useState("");

  const createWarRoomMutation = useCreateWarRoom();

  const { data, isLoading: isIncidentsLoading } = useIncidents({
    page: 1,
    limit: 100,
  });

  if (!isOpen) {
    return null;
  }

  const incidents = data?.data ?? [];

  const selectedIncident = incidents.find((incident) => incident.id === incidentId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!incidentId) {
      return;
    }

    await createWarRoomMutation.mutateAsync({
      incidentId,
    });

    setIncidentId("");

    onClose();
  };

  const handleClose = () => {
    if (createWarRoomMutation.isPending) {
      return;
    }

    setIncidentId("");

    onClose();
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
            "
      onMouseDown={handleClose}
    >
      <div
        className="
                    w-full
                    max-w-lg
                    rounded-3xl
                    bg-white
                    shadow-2xl
                "
        onMouseDown={(event) => event.stopPropagation()}
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
          <div>
            <h2 className="text-xl font-bold text-[#4B3932]">Create War Room</h2>

            <p className="mt-1 text-sm text-stone-500">
              Create a dedicated war room for an incident.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={createWarRoomMutation.isPending}
            className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            text-stone-400
                            transition
                            hover:bg-[#FAF6F0]
                            hover:text-[#4B3932]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <label
              htmlFor="war-room-incident"
              className="
                                mb-2
                                block
                                text-sm
                                font-semibold
                                text-[#4B3932]
                            "
            >
              Incident
            </label>

            <select
              id="war-room-incident"
              value={incidentId}
              onChange={(event) => setIncidentId(event.target.value)}
              disabled={isIncidentsLoading || createWarRoomMutation.isPending}
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
                                transition
                                focus:border-[#4B3932]
                                focus:ring-1
                                focus:ring-[#4B3932]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
            >
              <option value="">
                {isIncidentsLoading ? "Loading incidents..." : "Select an incident"}
              </option>

              {incidents.map((incident) => (
                <option key={incident.id} value={incident.id}>
                  {incident.title}
                </option>
              ))}
            </select>
          </div>

          {selectedIncident && (
            <div
              className="
                                rounded-2xl
                                border
                                border-[#E7DDD3]
                                bg-[#FAF6F0]
                                p-5
                            "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-[#F0E7D5]
                                        text-[#4B3932]
                                    "
                >
                  <AlertTriangle size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                    Selected Incident
                  </p>

                  <h3 className="mt-1 truncate text-base font-bold text-[#4B3932]">
                    {selectedIncident.title}
                  </h3>

                  {selectedIncident.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-stone-500">
                      {selectedIncident.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className="
                                        rounded-full
                                        bg-red-100
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-red-700
                                    "
                >
                  {selectedIncident.severity}
                </span>

                {selectedIncident.priority && (
                  <span
                    className="
                                            rounded-full
                                            bg-[#F0E7D5]
                                            px-3
                                            py-1
                                            text-xs
                                            font-semibold
                                            text-[#4B3932]
                                        "
                  >
                    {selectedIncident.priority}
                  </span>
                )}

                <span
                  className="
                                        rounded-full
                                        bg-blue-100
                                        px-3
                                        py-1
                                        text-xs
                                        font-semibold
                                        text-blue-700
                                    "
                >
                  {selectedIncident.status.replace("_", " ")}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-[#E7DDD3] pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={createWarRoomMutation.isPending}
              className="
                                rounded-xl
                                border
                                border-[#E7DDD3]
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-[#4B3932]
                                transition
                                hover:bg-[#FAF6F0]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!incidentId || createWarRoomMutation.isPending}
              className="
                                rounded-xl
                                bg-[#4B3932]
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#3B2E29]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
            >
              {createWarRoomMutation.isPending ? "Creating..." : "Create War Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
