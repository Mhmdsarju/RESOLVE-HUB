import { useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation, useBlocker } from "react-router-dom";

import WarRoomIncidentCard from "../components/WarRoomIncidentCard";
import WarRoomActions from "../components/WarRoomActions";
import WarRoomParticipantList from "../components/WarRoomParticipantList";
import WarRoomChat from "../components/WarRoomChat";
import WarRoomCollaboration from "../components/WarRoomCollaboration";
import WarRoomSkeleton from "../components/WarRoomSkeleton";
import WarRoomErrorState from "../components/WarRoomErrorState";
import { useWarRoom } from "../hooks/useWarRoom";
import { useLeaveWarRoom } from "../hooks/useLeaveWarRoom";
import { useWarRoomSocket } from "../hooks/useWarRoomSocket";
import { useWarRoomMessages } from "../hooks/useWarRoomMessages";
import { useWarRoomWebRTC } from "../hooks/useWarRoomWebRTC";

import { useIncident } from "@/modules/incident/hooks/useIncident";

import { socket } from "@/core/config/socket";

export default function EngineerWarRoomDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id = "" } = useParams<{ id: string }>();

  const {
    data: warRoom,
    isLoading: isWarRoomLoading,
    isError: isWarRoomError,
    refetch,
  } = useWarRoom(id);

  const {
    data: incident,
    isLoading: isIncidentLoading,
    isError: isIncidentError,
  } = useIncident(warRoom?.incidentId ?? "");

  const {
    data: messageData,
    isLoading: isMessagesLoading,
    isError: isMessagesError,
  } = useWarRoomMessages(warRoom?.id ?? "");

  const leaveWarRoomMutation = useLeaveWarRoom();

  const isSocketJoinedRef = useRef(false);

  const isLeavingRef = useRef(false);

  const { participants, messages, sendMessage } = useWarRoomSocket(
    warRoom?.id ?? "",
  );

  const {
    localStream,
    remoteStreams,
    isMediaReady,
    mediaError,
    leaveCall,
  } = useWarRoomWebRTC({
    warRoomId: warRoom?.id ?? "",
    participants,
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !isLeavingRef.current &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!warRoom?.id) {
      return;
    }

    const joinRoom = () => {
      if (isSocketJoinedRef.current) {
        return;
      }

      socket.emit("join_room", {
        warRoomId: warRoom.id,
      });

      isSocketJoinedRef.current = true;

      console.log("join_room emitted:", warRoom.id);
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [warRoom?.id]);

  if (isWarRoomLoading || isIncidentLoading || isMessagesLoading) {
    return (
      <div className="space-y-6">
        <WarRoomSkeleton />
      </div>
    );
  }

  if (
    isWarRoomError ||
    !warRoom ||
    isIncidentError ||
    !incident ||
    isMessagesError
  ) {
    return (
      <div className="space-y-6">
        <WarRoomErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  const warRoomWithIncident = {
    ...warRoom,
    incident,
  };

  const handleLeave = () => {
    leaveWarRoomMutation.mutate(warRoom.id, {
      onSuccess: () => {
        isLeavingRef.current = true;

        leaveCall();

        if (isSocketJoinedRef.current && socket.connected) {
          socket.emit("leave_room", {
            warRoomId: warRoom.id,
          });

          isSocketJoinedRef.current = false;
        }

        navigate(
          location.state?.from === "/war-rooms"
            ? "/war-rooms"
            : "/engineer/war-rooms",
          {
            replace: true,
          },
        );
      },
    });
  };

  const handleBlockedLeave = () => {
    leaveWarRoomMutation.mutate(warRoom.id, {
      onSuccess: () => {
        isLeavingRef.current = true;

        leaveCall();

        if (isSocketJoinedRef.current && socket.connected) {
          socket.emit("leave_room", {
            warRoomId: warRoom.id,
          });

          isSocketJoinedRef.current = false;
        }

        navigate(
          location.state?.from === "/war-rooms"
            ? "/war-rooms"
            : "/engineer/war-rooms",
          {
            replace: true,
          },
        );
      },
    });
  };

  return (
    <div
      className="
        flex
        h-[calc(100vh-80px)]
        min-h-0
        flex-col
        gap-4
        overflow-hidden
      "
    >
      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-4
        "
      >
        <h1 className="text-3xl font-bold leading-none text-[#4B3932]">
          War Room for Discussion
        </h1>

        <div className="shrink-0">
          <WarRoomActions
            warRoom={warRoom}
            canClose={false}
            isJoined={true}
            isLeaving={leaveWarRoomMutation.isPending}
            onLeave={handleLeave}
          />
        </div>
      </div>

      <div
        className="
          grid
          min-h-0
          flex-1
          gap-5
          overflow-hidden
          lg:grid-cols-[220px_minmax(0,1fr)_280px]
          lg:items-stretch
        "
      >
        <div
          className="
            min-h-0
            overflow-hidden
          "
        >
          <WarRoomParticipantList participants={participants} />
        </div>

        <div
          className="
            grid
            min-h-0
            min-w-0
            grid-rows-[minmax(0,1.65fr)_minmax(220px,0.75fr)]
            gap-4
            overflow-hidden
          "
        >
          <WarRoomCollaboration
            participantCount={Math.max(participants.length - 1, 0)}
            localStream={localStream}
            remoteStreams={remoteStreams}
            isMediaReady={isMediaReady}
            mediaError={mediaError}
          />

          <WarRoomChat
            historyMessages={messageData?.items ?? []}
            realtimeMessages={messages}
            onSendMessage={sendMessage}
          />
        </div>

        <div
          className="
            min-h-0
            overflow-hidden
          "
        >
          <WarRoomIncidentCard warRoom={warRoomWithIncident} />
        </div>
      </div>

      {blocker.state === "blocked" && (
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
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-xl
            "
          >
            <h2 className="text-lg font-semibold text-[#4B3932]">
              Leave War Room?
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              You are currently in a war room. Are you sure you want to leave?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => blocker.reset?.()}
                disabled={leaveWarRoomMutation.isPending}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-white
                  px-4
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
                Stay
              </button>

              <button
                type="button"
                onClick={handleBlockedLeave}
                disabled={leaveWarRoomMutation.isPending}
                className="
                  rounded-xl
                  bg-red-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {leaveWarRoomMutation.isPending ? "Leaving..." : "Leave"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}