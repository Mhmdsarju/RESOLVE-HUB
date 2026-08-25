import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import WarRoomIncidentCard from "../components/WarRoomIncidentCard";
import WarRoomActions from "../components/WarRoomActions";
import WarRoomSkeleton from "../components/WarRoomSkeleton";
import WarRoomErrorState from "../components/WarRoomErrorState";
import { useWarRoom } from "../hooks/useWarRoom";
import { useJoinWarRoom } from "../hooks/useJoinWarRoom";
import { useLeaveWarRoom } from "../hooks/useLeaveWarRoom";

export default function EngineerWarRoomDetailsPage() {
  const navigate = useNavigate();

  const { id = "" } = useParams<{
    id: string;
  }>();

  const { data: warRoom, isLoading, isError, refetch } = useWarRoom(id);

  const joinWarRoomMutation = useJoinWarRoom();
  const leaveWarRoomMutation = useLeaveWarRoom();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <WarRoomSkeleton />
      </div>
    );
  }

  if (isError || !warRoom) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-[#4B3932]
                        transition
                        hover:text-[#6B554A]
                    "
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <WarRoomErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  const handleJoin = () => {
    joinWarRoomMutation.mutate(warRoom.id);
  };

  const handleLeave = () => {
    leaveWarRoomMutation.mutate(warRoom.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-[#4B3932]
                        transition
                        hover:text-[#6B554A]
                    "
        >
          <ArrowLeft size={17} />
          Back to War Rooms
        </button>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-3">
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
              {warRoom.status}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold text-[#4B3932]">War Room</h1>

          <p className="mt-1 text-sm text-stone-500">Incident response workspace</p>
        </div>
      </div>

      <WarRoomIncidentCard warRoom={warRoom} />

      <WarRoomActions
        warRoom={warRoom}
        canClose={false}
        isJoined={false}
        isJoining={joinWarRoomMutation.isPending}
        isLeaving={leaveWarRoomMutation.isPending}
        onJoin={handleJoin}
        onLeave={handleLeave}
      />

      <div
        className="
                    rounded-2xl
                    border
                    border-dashed
                    border-[#D8CBBF]
                    bg-[#FAF6F0]
                    p-10
                    text-center
                "
      >
        <p className="font-semibold text-[#4B3932]">Collaboration Area</p>

        <p className="mt-1 text-sm text-stone-500">
          Audio, video and real-time collaboration will be available here.
        </p>
      </div>
    </div>
  );
}
