import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import OrgAdminIncidentSection from "../components/OrgAdminIncidentSection";
import WarRoomActions from "../components/WarRoomActions";
import WarRoomSkeleton from "../components/WarRoomSkeleton";
import WarRoomErrorState from "../components/WarRoomErrorState";

import { useWarRoom } from "../hooks/useWarRoom";
import { useJoinWarRoom } from "../hooks/useJoinWarRoom";
import { useLeaveWarRoom } from "../hooks/useLeaveWarRoom";
import { useCloseWarRoom } from "../hooks/useCloseWarRoom";
import type { WarRoomDetailsPageProps } from "../types/warRoom.types";

export default function WarRoomDetailsPage({ canClose = false }: WarRoomDetailsPageProps) {
  const navigate = useNavigate();

  const { id = "" } = useParams<{
    id: string;
  }>();

  const { data: warRoom, isLoading, isError, refetch } = useWarRoom(id);

  const joinWarRoomMutation = useJoinWarRoom();
  const leaveWarRoomMutation = useLeaveWarRoom();
  const closeWarRoomMutation = useCloseWarRoom();

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
  joinWarRoomMutation.mutate(warRoom.id, {
    onSuccess: () => {
      navigate(`/engineer/war-rooms/${warRoom.id}`, {
        state: {
          from: "/war-rooms",
        },
      },);
    },
  });
};

  const handleLeave = () => {
    leaveWarRoomMutation.mutate(warRoom.id);
  };

  const handleClose = () => {
    closeWarRoomMutation.mutate(warRoom.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate("/war-rooms",{ replace: true })}
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

            <span className="text-xs text-stone-400">War Room ID: {warRoom.id}</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold text-[#4B3932]">War Room</h1>

          <p className="mt-1 text-sm text-stone-500">Incident response workspace</p>
        </div>
      </div>

      <WarRoomActions
        warRoom={warRoom}
        canClose={canClose}
        isJoined={false}
        isJoining={joinWarRoomMutation.isPending}
        isLeaving={leaveWarRoomMutation.isPending}
        isClosing={closeWarRoomMutation.isPending}
        onJoin={handleJoin}
        onLeave={handleLeave}
        onClose={handleClose}
      />

      <OrgAdminIncidentSection incidentId={warRoom.incidentId} />
    </div>
  );
}
