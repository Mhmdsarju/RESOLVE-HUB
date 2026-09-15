import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { socket } from "@/core/config/socket";
import type { WarRoomMessage, WarRoomParticipant } from "../types/warRoom.types";

export function useWarRoomSocket(warRoomId: string) {

    const [participants, setParticipants] = useState<WarRoomParticipant[]>([]);

    const [messages, setMessages] = useState<WarRoomMessage[]>([]);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {

        if (!warRoomId) {
            return;
        }

        const requestParticipants = () => {

            if (!socket.connected) {
                return;
            }

            socket.emit(
                "get_participants",
                {
                    warRoomId,
                },
            );

        };

        const handleConnect = () => {

            setIsConnected(true);

            requestParticipants();

        };

        const handleDisconnect = () => {

            setIsConnected(false);

            setParticipants([]);

        };

        const handleParticipants = (data: {
            warRoomId: string;
            participants: WarRoomParticipant[];
        }) => {

            if (data.warRoomId !== warRoomId) {
                return;
            }

            setParticipants(
                data.participants,
            );

        };

        const handleParticipantJoined = (data: {
            warRoomId: string;
            userId: string;
            userName: string;
        }) => {

            console.log("PARTICIPANT JOINED:", data,);

            if (data.warRoomId !== warRoomId) {
                return;
            }

            toast.success(`${data.userName} joined the war room`,);

            setParticipants((current) => {

                const alreadyExists = current.some(
                    (participant) => participant.userId === data.userId,
                );

                if (alreadyExists) {
                    return current;
                }

                return [
                    ...current,
                    {
                        warRoomId: data.warRoomId,
                        userId: data.userId,
                    },
                ];
            });

        };

        const handleParticipantLeft = (data: {
            warRoomId: string;
            userId: string;
            userName: string;
        }) => {

            console.log(
                "PARTICIPANT LEFT:",
                data,
            );

            if (data.warRoomId !== warRoomId) {
                return;
            }

            toast.error(
                `${data.userName} left the war room`,
            );

            setParticipants((current) =>
                current.filter(
                    (participant) =>
                        participant.userId !== data.userId,
                ),
            );

        };

        const handleMessage = (message: WarRoomMessage) => {

            console.log(
                "WAR ROOM MESSAGE RECEIVED:",
                message,
            );

            if (message.warRoomId !== warRoomId) {
                return;
            }

            setMessages((current) => {

                const alreadyExists = current.some(
                    (currentMessage) =>
                        currentMessage.id === message.id,
                );

                if (alreadyExists) {
                    return current;
                }

                return [
                    ...current,
                    message,
                ];
            });

        };

        socket.on(
            "connect",
            handleConnect,
        );

        socket.on(
            "disconnect",
            handleDisconnect,
        );

        socket.on(
            "room:participants",
            handleParticipants,
        );

        socket.on(
            "room:participant_joined",
            handleParticipantJoined,
        );

        socket.on(
            "room:participant_left",
            handleParticipantLeft,
        );

        socket.on(
            "room:message",
            handleMessage,
        );

        if (socket.connected) {

            requestParticipants();

        }

        return () => {

            socket.off(
                "connect",
                handleConnect,
            );

            socket.off(
                "disconnect",
                handleDisconnect,
            );

            socket.off(
                "room:participants",
                handleParticipants,
            );

            socket.off(
                "room:participant_joined",
                handleParticipantJoined,
            );

            socket.off(
                "room:participant_left",
                handleParticipantLeft,
            );

            socket.off(
                "room:message",
                handleMessage,
            );

        };

    }, [warRoomId]);

    const getParticipants = () => {

        if (!socket.connected || !warRoomId) {
            return;
        }

        socket.emit(
            "get_participants",
            {
                warRoomId,
            },
        );

    };

    const sendMessage = (content: string) => {

        if (!socket.connected || !warRoomId) {
            return;
        }

        if (!content.trim()) {
            return;
        }

        socket.emit(
            "send_message",
            {
                warRoomId,
                content: content.trim(),
            },
        );

    };

    return {
        participants,
        messages,
        isConnected,
        getParticipants,
        sendMessage,
    };
}