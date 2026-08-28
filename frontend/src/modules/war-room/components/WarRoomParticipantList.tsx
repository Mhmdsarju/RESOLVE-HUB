import { Users } from "lucide-react";

import WarRoomParticipantItem from "./WarRoomParticipantItem";
import type { WarRoomParticipantListProps } from "../types/warRoom.types";



export default function WarRoomParticipantList({ participants }: WarRoomParticipantListProps) {
  return (
    <div
      className="
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                p-5
            "
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#4B3932]" />

          <h2 className="font-semibold text-[#4B3932]">Participants</h2>
        </div>

        <span
          className="
                        rounded-full
                        bg-white
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-stone-500
                    "
        >
          {participants.length}
        </span>
      </div>

      {participants.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-stone-500">No participants yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {participants.map((participant) => (
            <WarRoomParticipantItem key={participant.userId} participant={participant} />
          ))}
        </div>
      )}
    </div>
  );
}
