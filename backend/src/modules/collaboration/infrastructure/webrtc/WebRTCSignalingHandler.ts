import { Socket, Server } from "socket.io";
import { CollaborationRoomManager } from "../websocket/CollaborationRoomManager";

export class WebRTCSignalingHandler {
    constructor(
        private readonly io: Server,
        private readonly roomManager: CollaborationRoomManager,
    ) { }

    initialize() {
        this.io.on("connection", (socket: Socket) => {

            console.log(`WebRTC signaling socket connected: ${socket.id}`,);

            socket.on("webrtc:offer", (data) => {

                const { warRoomId, targetUserId, offer, } = data;

                if (!warRoomId || !targetUserId || !offer) {
                    return;
                }

                const targetSocket = this.roomManager.getSocketByUserId(warRoomId, targetUserId);

                if (!targetSocket) {
                    console.log(
                        `Target user ${targetUserId} not found in room ${warRoomId}`,
                    );

                    return;
                }


                targetSocket.emit("webrtc:offer", {
                    warRoomId, fromUserId: socket.data.user.userId, offer
                })

                console.log(
                    `WebRTC offer sent from ${socket.data.user.userId} to ${targetUserId}`,
                );

            });

            socket.on("webrtc:answer", (data) => {

                const { warRoomId, targetUserId, answer, } = data;

                if (!warRoomId || !targetUserId || !answer) {
                    return;
                }

                const targetSocket = this.roomManager.getSocketByUserId(warRoomId, targetUserId,);

                if (!targetSocket) {
                    console.log(
                        `Target user ${targetUserId} not found in room ${warRoomId}`,
                    );

                    return;
                }

                targetSocket.emit(
                    "webrtc:answer",
                    {
                        warRoomId,
                        fromUserId:
                            socket.data.user.userId,
                        answer,
                    },
                );

                console.log(
                    `WebRTC answer sent from ${socket.data.user.userId} to ${targetUserId}`,
                );

            },
            );

            socket.on("webrtc:ice-candidate", (data) => {

                const { warRoomId, targetUserId, candidate, } = data;

                if (!warRoomId || !targetUserId || !candidate) {
                    return;
                }

                const targetSocket = this.roomManager.getSocketByUserId(
                    warRoomId,
                    targetUserId,
                );

                if (!targetSocket) {
                    console.log(
                        `Target user ${targetUserId} not found in room ${warRoomId}`,
                    );

                    return;
                }

                targetSocket.emit(
                    "webrtc:ice-candidate",
                    {
                        warRoomId,
                        fromUserId:
                            socket.data.user.userId,
                        candidate,
                    },
                );

                console.log(
                    `WebRTC ICE candidate sent from ${socket.data.user.userId} to ${targetUserId}`,
                );

            },
            );


        })
    }


}