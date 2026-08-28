import { useCallback, useEffect, useRef, useState } from "react";

import { useMe } from "@/modules/user/hooks/useMe";

import { socket } from "@/core/config/socket";

import type { WarRoomParticipant } from "../types/warRoom.types";

interface UseWarRoomWebRTCProps {
    warRoomId: string;
    participants: WarRoomParticipant[];
}

interface RemoteStream {
    userId: string;
    stream: MediaStream;
}

export function useWarRoomWebRTC({ warRoomId, participants, }: UseWarRoomWebRTCProps) {

    const { data: currentUser } = useMe();

    const localStreamRef = useRef<MediaStream | null>(null);

    const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(
        new Map(),
    );

    const pendingIceCandidatesRef = useRef<Map<string, RTCIceCandidateInit[]>>(
        new Map(),
    );

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);

    const [isMediaReady, setIsMediaReady] = useState(false);

    const [mediaError, setMediaError] = useState<string | null>(null);

    const createPeerConnection = useCallback(
        (
            userId: string,
        ) => {

            const existingConnection = peerConnectionsRef.current.get(
                userId,
            );

            if (existingConnection) {
                return existingConnection;
            }

            console.log(`[WebRTC] Creating peer connection with ${userId}`,);

            const peerConnection = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "stun:stun.l.google.com:19302",
                    },
                ],
            });

            const stream = localStreamRef.current;

            if (stream) {

                stream.getTracks().forEach(
                    (track) => {

                        console.log(`[WebRTC] Adding local ${track.kind} track to ${userId}`,);

                        peerConnection.addTrack(
                            track,
                            stream,
                        );

                    },
                );

            }

            peerConnection.ontrack = (event,) => {

                console.log(`[WebRTC] Remote track received from ${userId}:`, event.track.kind,);

                const remoteStream = event.streams[0];

                if (!remoteStream) {

                    console.warn(
                        `[WebRTC] No remote MediaStream received from ${userId}`,
                    );

                    return;
                }

                setRemoteStreams((current) => {

                    const existingStream = current.find(
                        (item) => item.userId === userId,
                    );

                    if (existingStream) {

                        if (existingStream.stream.id === remoteStream.id) {
                            return current;
                        }

                        return current.map((item) => item.userId === userId
                            ? {
                                userId,
                                stream: remoteStream,
                            }
                            : item,
                        );

                    }

                    console.log(`[WebRTC] Adding remote stream from ${userId}`,);

                    return [
                        ...current,
                        {
                            userId,
                            stream: remoteStream,
                        },
                    ];

                });

            };

            peerConnection.onicecandidate = (event,) => {

                if (!event.candidate) {

                    console.log(`[WebRTC] ICE gathering completed for ${userId}`,);

                    return;
                }

                console.log(`[WebRTC] Sending ICE candidate to ${userId}`,);

                socket.emit("webrtc:ice-candidate",
                    {
                        warRoomId,
                        targetUserId: userId,
                        candidate:
                            event.candidate.toJSON(),
                    },
                );

            };

            peerConnection.oniceconnectionstatechange = () => {

                console.log(`[WebRTC] ICE state with ${userId}:`, peerConnection.iceConnectionState,);

                if (peerConnection.iceConnectionState === "failed") {

                    console.error(`[WebRTC] ICE connection failed with ${userId}`,);

                }

            };

            peerConnection.onconnectionstatechange = () => {

                console.log(`[WebRTC] Connection state with ${userId}:`, peerConnection.connectionState,);

                if (peerConnection.connectionState === "failed") {

                    console.error(`[WebRTC] Peer connection failed with ${userId}`,);

                }

                if (peerConnection.connectionState === "disconnected") {

                    console.warn(`[WebRTC] Peer connection disconnected with ${userId}`,);

                }

                if (peerConnection.connectionState === "closed") {

                    peerConnectionsRef.current.delete(
                        userId,
                    );

                    setRemoteStreams((current) => current.filter(
                        (item) => item.userId !== userId,
                    ),
                    );

                }

            };

            peerConnection.onsignalingstatechange = () => {

                console.log(`[WebRTC] Signaling state with ${userId}:`, peerConnection.signalingState,);

            };

            peerConnectionsRef.current.set(
                userId,
                peerConnection,
            );

            return peerConnection;

        },
        [
            warRoomId,
        ],
    );

    const flushPendingIceCandidates = useCallback(async (userId: string, peerConnection: RTCPeerConnection,) => {

        const candidates = pendingIceCandidatesRef.current.get(
            userId,
        );

        if (!candidates?.length) {
            return;
        }

        console.log(`[WebRTC] Flushing ${candidates.length} queued ICE candidates from ${userId}`,);

        pendingIceCandidatesRef.current.delete(
            userId,
        );

        for (const candidate of candidates) {

            try {

                await peerConnection.addIceCandidate(
                    new RTCIceCandidate(
                        candidate,
                    ),
                );

            } catch (error) {

                console.error(`[WebRTC] Failed to add queued ICE candidate from ${userId}:`, error,);

            }

        }

    },
        [],
    );

    const createOffer = useCallback(async (userId: string,) => {

        const peerConnection = createPeerConnection(
            userId,
        );

        if (peerConnection.signalingState !== "stable") {

            console.log(
                `[WebRTC] Cannot create offer for ${userId}. Signaling state:`,
                peerConnection.signalingState,
            );

            return;
        }

        try {

            console.log(`[WebRTC] Creating offer for ${userId}`,);

            const offer = await peerConnection.createOffer();

            await peerConnection.setLocalDescription(
                offer,
            );

            socket.emit(
                "webrtc:offer",
                {
                    warRoomId,
                    targetUserId: userId,
                    offer,
                },
            );

            console.log(`[WebRTC] Offer sent to ${userId}`,);

        } catch (error) {

            console.error(`[WebRTC] Failed to create offer for ${userId}:`, error,);

        }

    },
        [
            createPeerConnection,
            warRoomId,
        ],
    );
    useEffect(() => {

        if (!currentUser?.id) {
            return;
        }

        const participantUserIds = new Set(
            participants
                .filter((participant) => participant.userId !== currentUser.id,)
                .map((participant) => participant.userId,),
        );

        peerConnectionsRef.current.forEach(
            (
                peerConnection,
                userId,
            ) => {

                if (participantUserIds.has(userId,)) {
                    return;
                }

                console.log(`[WebRTC] Participant left, closing connection with ${userId}`,);

                peerConnection.close();

                peerConnectionsRef.current.delete(userId,);

                pendingIceCandidatesRef.current.delete(userId,);

                setRemoteStreams((current) =>
                    current.filter((item) => item.userId !== userId,),
                );

            },
        );

    }, [participants, currentUser?.id,]);


    useEffect(() => {

        if (!warRoomId) {
            return;
        }

        let isMounted = true;

        const startLocalMedia = async () => {

            try {

                console.log("[WebRTC] Requesting camera and microphone...",);

                setMediaError(null);

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });

                if (!isMounted) {

                    stream.getTracks().forEach(
                        (track) => track.stop(),
                    );

                    return;

                }

                console.log("[WebRTC] Local media ready",);

                localStreamRef.current = stream;

                setLocalStream(stream,);

                setIsMediaReady(true,);

            } catch (error) {

                console.error("[WebRTC] Failed to access local media:", error,);

                if (!isMounted) {
                    return;
                }

                setMediaError("Camera and microphone permission is required.",);

                setIsMediaReady(false,);

            }

        };

        startLocalMedia();

        return () => {

            isMounted = false;

            const stream = localStreamRef.current;

            if (stream) {

                stream.getTracks().forEach((track) => track.stop(),);

            }

            localStreamRef.current = null;

            setLocalStream(null,);

            peerConnectionsRef.current.forEach(
                (peerConnection) => {

                    peerConnection.close();

                },
            );

            peerConnectionsRef.current.clear();

            pendingIceCandidatesRef.current.clear();

            setRemoteStreams([]);

            setIsMediaReady(
                false,
            );

        };

    }, [
        warRoomId,
    ]);

    useEffect(() => {

        if (
            !warRoomId ||
            !currentUser?.id ||
            !isMediaReady
        ) {
            return;
        }

        const otherParticipants =
            participants.filter(
                (participant) =>
                    participant.userId !== currentUser.id,
            );

        console.log(
            "[WebRTC] Other participants:",
            otherParticipants.map(
                (participant) =>
                    participant.userId,
            ),
        );

        otherParticipants.forEach(
            (participant) => {

                const shouldCreateOffer = currentUser.id < participant.userId;

                console.log(
                    `[WebRTC] Offer decision ${currentUser.id} -> ${participant.userId}:`,
                    shouldCreateOffer,
                );

                if (!shouldCreateOffer) {
                    return;
                }

                const peerConnection = peerConnectionsRef.current.get(
                    participant.userId,
                );

                if (peerConnection) {

                    console.log(`[WebRTC] Peer connection already exists with ${participant.userId}`,);

                    return;

                }

                createOffer(
                    participant.userId,
                );

            },
        );

    }, [
        warRoomId,
        currentUser?.id,
        participants,
        isMediaReady,
        createOffer,
    ]);

    useEffect(() => {

        if (!warRoomId || !currentUser?.id) {
            return;
        }

        const handleOffer = async (
            data: {
                warRoomId: string;
                fromUserId: string;
                offer: RTCSessionDescriptionInit;
            },
        ) => {

            if (data.warRoomId !== warRoomId || data.fromUserId === currentUser.id) {
                return;
            }

            console.log(
                `[WebRTC] Offer received from ${data.fromUserId}`,
            );

            try {

                const peerConnection = createPeerConnection(data.fromUserId,);

                await peerConnection.setRemoteDescription(new RTCSessionDescription(
                    data.offer,
                ),
                );

                console.log(`[WebRTC] Remote offer applied from ${data.fromUserId}`,);

                await flushPendingIceCandidates(
                    data.fromUserId,
                    peerConnection,
                );

                const answer = await peerConnection.createAnswer();

                await peerConnection.setLocalDescription(answer,);

                socket.emit(
                    "webrtc:answer",
                    {
                        warRoomId,
                        targetUserId:
                            data.fromUserId,
                        answer,
                    },
                );

                console.log(`[WebRTC] Answer sent to ${data.fromUserId}`,);

            } catch (error) {

                console.error(`[WebRTC] Failed to handle offer from ${data.fromUserId}:`, error,);

            }

        };

        const handleAnswer = async (
            data: {
                warRoomId: string;
                fromUserId: string;
                answer: RTCSessionDescriptionInit;
            },
        ) => {

            if (data.warRoomId !== warRoomId || data.fromUserId === currentUser.id) {
                return;
            }

            console.log(`[WebRTC] Answer received from ${data.fromUserId}`,);

            const peerConnection = peerConnectionsRef.current.get(
                data.fromUserId,
            );

            if (!peerConnection) {

                console.warn(
                    `[WebRTC] No peer connection for answer from ${data.fromUserId}`,
                );

                return;

            }

            try {

                await peerConnection.setRemoteDescription(
                    new RTCSessionDescription(
                        data.answer,
                    ),
                );

                console.log(
                    `[WebRTC] Remote answer applied from ${data.fromUserId}`,
                );

                await flushPendingIceCandidates(
                    data.fromUserId,
                    peerConnection,
                );

            } catch (error) {

                console.error(
                    `[WebRTC] Failed to handle answer from ${data.fromUserId}:`,
                    error,
                );

            }

        };

        const handleIceCandidate = async (
            data: {
                warRoomId: string;
                fromUserId: string;
                candidate: RTCIceCandidateInit;
            },
        ) => {

            if (
                data.warRoomId !== warRoomId ||
                data.fromUserId === currentUser.id
            ) {
                return;
            }

            console.log(
                `[WebRTC] ICE candidate received from ${data.fromUserId}`,
            );

            const peerConnection =
                peerConnectionsRef.current.get(
                    data.fromUserId,
                );

            if (
                !peerConnection ||
                !peerConnection.remoteDescription
            ) {

                console.log(
                    `[WebRTC] Queueing ICE candidate from ${data.fromUserId}`,
                );

                const currentCandidates =
                    pendingIceCandidatesRef.current.get(
                        data.fromUserId,
                    ) ?? [];

                pendingIceCandidatesRef.current.set(
                    data.fromUserId,
                    [
                        ...currentCandidates,
                        data.candidate,
                    ],
                );

                return;

            }

            try {

                await peerConnection.addIceCandidate(
                    new RTCIceCandidate(
                        data.candidate,
                    ),
                );

                console.log(
                    `[WebRTC] ICE candidate applied from ${data.fromUserId}`,
                );

            } catch (error) {

                console.error(
                    `[WebRTC] Failed to add ICE candidate from ${data.fromUserId}:`,
                    error,
                );

            }

        };

        socket.on(
            "webrtc:offer",
            handleOffer,
        );

        socket.on(
            "webrtc:answer",
            handleAnswer,
        );

        socket.on(
            "webrtc:ice-candidate",
            handleIceCandidate,
        );

        return () => {

            socket.off(
                "webrtc:offer",
                handleOffer,
            );

            socket.off(
                "webrtc:answer",
                handleAnswer,
            );

            socket.off(
                "webrtc:ice-candidate",
                handleIceCandidate,
            );

        };

    }, [
        warRoomId,
        currentUser?.id,
        createPeerConnection,
        flushPendingIceCandidates,
    ]);


    const leaveCall = useCallback(() => {

        console.log(
            "[WebRTC] Leaving call...",
        );

        const stream =
            localStreamRef.current;

        if (stream) {

            stream.getTracks().forEach(
                (track) => {

                    track.stop();

                },
            );

        }

        localStreamRef.current =
            null;

        peerConnectionsRef.current.forEach(
            (peerConnection) => {

                peerConnection.close();

            },
        );

        peerConnectionsRef.current.clear();

        pendingIceCandidatesRef.current.clear();

        setRemoteStreams([]);

        setLocalStream(
            null,
        );

        setIsMediaReady(
            false,
        );

        setMediaError(
            null,
        );

        console.log(
            "[WebRTC] Call cleanup completed",
        );

    }, []);

    return {
        localStream,
        remoteStreams,
        isMediaReady,
        mediaError,
        leaveCall
    };
}