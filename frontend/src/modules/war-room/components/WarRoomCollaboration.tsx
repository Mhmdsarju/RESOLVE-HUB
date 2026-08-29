import { Camera, CameraOff, Mic, MicOff, Users } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { useMe } from "@/modules/user/hooks/useMe";
import { useUser } from "@/modules/user/hooks/useUser";
import type { WarRoomCollaborationProps } from "../types/warRoom.types";



export default function WarRoomCollaboration({
  participantCount = 0,
  localStream,
  remoteStreams,
  isMediaReady,
  mediaError,
}: WarRoomCollaborationProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const { data: currentUser } = useMe();

  const [isCameraOn, setIsCameraOn] = useState(false);

  const [isMicOn, setIsMicOn] = useState(false);

  useEffect(() => {
    if (!localStream) {
      return;
    }

    const video = localVideoRef.current;

    if (!video) {
      return;
    }

    video.srcObject = localStream;

    video.muted = true;

    video.play().catch((error) => {
      console.error("Failed to play local video:", error);
    });

    const videoTrack = localStream.getVideoTracks()[0];

    const audioTrack = localStream.getAudioTracks()[0];

    setIsCameraOn(videoTrack?.enabled ?? false);

    setIsMicOn(audioTrack?.enabled ?? false);
  }, [localStream]);

  const toggleCamera = () => {
    if (!localStream) {
      return;
    }

    const videoTrack = localStream.getVideoTracks()[0];

    if (!videoTrack) {
      return;
    }

    const nextState = !videoTrack.enabled;

    videoTrack.enabled = nextState;

    setIsCameraOn(nextState);
  };

  const toggleMicrophone = () => {
    if (!localStream) {
      return;
    }

    const audioTrack = localStream.getAudioTracks()[0];

    if (!audioTrack) {
      return;
    }

    const nextState = !audioTrack.enabled;

    audioTrack.enabled = nextState;

    setIsMicOn(nextState);
  };

  return (
    <div
      className="
                overflow-hidden
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
            "
    >
      <div className="p-5">
        <div
          className="
                        grid
                        min-h-360
                        grid-cols-1
                        gap-3
                        md:grid-cols-2
                    "
        >
          <div
            className="
                            relative
                            flex
                            min-h-240
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#D8CBBF]
                            bg-[#2F2926]
                        "
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className={`
                                absolute
                                inset-0
                                h-full
                                w-full
                                object-cover
                                [transform-scaleX(-1)]
                                ${isCameraOn ? "opacity-100" : "opacity-0"}
                            `}
            />

            {!isCameraOn && (
              <div className="relative z-10 text-center">
                <div
                  className="
                                        mx-auto
                                        flex
                                        h-16
                                        w-16
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#5A4A43]
                                        text-xl
                                        font-semibold
                                        text-white
                                    "
                >
                  {currentUser?.name?.charAt(0).toUpperCase() ?? "?"}
                </div>

                <p className="mt-3 text-sm font-medium text-white">
                  {isMediaReady ? "Camera is off" : "Camera is unavailable"}
                </p>

                <p className="mt-1 text-xs text-stone-400">
                  {isMediaReady
                    ? "Turn on your camera to start video"
                    : "Allow camera and microphone access"}
                </p>
              </div>
            )}

            {mediaError && (
              <div
                className="
                                    absolute
                                    inset-x-3
                                    top-3
                                    z-20
                                    rounded-lg
                                    bg-black/70
                                    px-3
                                    py-2
                                    text-center
                                    text-xs
                                    text-white
                                "
              >
                {mediaError}
              </div>
            )}

            <div
              className="
                                absolute
                                bottom-3
                                left-3
                                z-10
                                rounded-lg
                                bg-black/50
                                px-2.5
                                py-1
                                text-xs
                                text-white
                            "
            >
              You
            </div>

            <div
              className="
                                absolute
                                bottom-3
                                right-3
                                z-10
                                flex
                                items-center
                                gap-1.5
                                rounded-lg
                                bg-black/50
                                px-2.5
                                py-1
                                text-xs
                                text-white
                            "
            >
              {isMicOn ? <Mic size={13} /> : <MicOff size={13} />}

              {isMicOn ? "Mic on" : "Muted"}
            </div>
          </div>

          {remoteStreams.length === 0 ? (
            <div
              className="
                                relative
                                flex
                                min-h-240px
                                items-center
                                justify-center
                                overflow-hidden
                                rounded-2xl
                                border
                                border-[#D8CBBF]
                                bg-white
                            "
            >
              <div className="text-center">
                <div
                  className="
                                        mx-auto
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#F0E7D5]
                                        text-[#4B3932]
                                    "
                >
                  <Users size={22} />
                </div>

                <p className="mt-3 text-sm font-semibold text-[#4B3932]">
                  Waiting for participants
                </p>

                <p className="mt-1 text-xs text-stone-400">
                  {participantCount === 0
                    ? "No other participants are connected"
                    : `${participantCount} participant${participantCount > 1 ? "s" : ""} in the war room`}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="
                                grid
                                min-h-240px
                                gap-3
                                sm:grid-cols-2
                            "
            >
              {remoteStreams.map((remoteStream) => (
                <RemoteVideo
                  key={remoteStream.userId}
                  userId={remoteStream.userId}
                  stream={remoteStream.stream}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className="
                        mt-5
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-3
                    "
        >
          <button
            type="button"
            onClick={toggleMicrophone}
            disabled={!isMediaReady}
            className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#D8CBBF]
                            transition
                            ${
                              isMicOn
                                ? "bg-white text-[#4B3932] hover:bg-[#F0E7D5]"
                                : "bg-[#4B3932] text-white hover:bg-[#3B2E29]"
                            }
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        `}
          >
            {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
          </button>

          <button
            type="button"
            onClick={toggleCamera}
            disabled={!isMediaReady}
            className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#D8CBBF]
                            transition
                            ${
                              isCameraOn
                                ? "bg-white text-[#4B3932] hover:bg-[#F0E7D5]"
                                : "bg-[#4B3932] text-white hover:bg-[#3B2E29]"
                            }
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        `}
          >
            {isCameraOn ? <Camera size={18} /> : <CameraOff size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

function RemoteVideo({
  userId,
  stream,
}: {
  userId: string;
  stream: MediaStream;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { data: user, isLoading } = useUser(userId);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.srcObject = stream;

    video.play().catch((error) => {
      console.error(`Failed to play remote video for ${userId}:`, error);
    });

    return () => {
      video.srcObject = null;
    };
  }, [stream, userId]);

  return (
    <div
      className="
        relative
        min-h-240px
        overflow-hidden
        rounded-2xl
        border
        border-[#D8CBBF]
        bg-[#2F2926]
      "
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="
          h-full
          w-full
          object-cover
        "
      />

      <div
        className="
          absolute
          bottom-3
          left-3
          rounded-lg
          bg-black/50
          px-2.5
          py-1
          text-xs
          text-white
        "
      >
        {isLoading ? "Loading..." : (user?.name ?? "Unknown user")}
      </div>
    </div>
  );
}