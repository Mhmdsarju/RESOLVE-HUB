import { Server, Socket } from "socket.io";

import { ITokenService } from "@/modules/auth/domain/interfaces/ITokenService";
import { IGetUserByIdUseCase } from "@/modules/auth/domain/interfaces/use-cases/IGetUserByIdUseCase";
import { IJoinWarRoomUseCase } from "@/modules/war-room/domain/interface/usecase/IJoinWarRoomUseCase";
import { ILeaveWarRoomUseCase } from "@/modules/war-room/domain/interface/usecase/ILeaveWarRoomUseCase";
import { IGetWarRoomParticipantsUseCase } from "@/modules/war-room/domain/interface/usecase/IGetWarRoomParticipantsUseCase";

import { createSocketAuthMiddleware } from "./middleware/socketAuthMiddleware";
import { CollaborationRoomManager } from "./CollaborationRoomManager";
import { ISendWarRoomMessageUseCase } from "@/modules/war-room/domain/interface/usecase/ISendWarRoomMessageUseCase";

export class CollaborationSocketHandler {

    constructor(
        private readonly io: Server,
        private readonly tokenService: ITokenService,
        private readonly roomManager: CollaborationRoomManager,
        private readonly joinWarRoomUseCase: IJoinWarRoomUseCase,
        private readonly leaveWarRoomUseCase: ILeaveWarRoomUseCase,
        private readonly getWarRoomParticipantsUseCase: IGetWarRoomParticipantsUseCase,
        private readonly sendWarRoomMessageUseCase: ISendWarRoomMessageUseCase,
        private readonly getUserByIdUseCase: IGetUserByIdUseCase,
    ) { }

    initialize() {

        this.io.use(createSocketAuthMiddleware(this.tokenService));

        this.io.on("connection", async (socket: Socket) => {

            console.log(`Socket connected: ${socket.id}`,);

            const userId = socket.data.user.userId;

            await socket.join(`user:${userId}`);

            console.log(`Socket ${socket.id} joined user room user:${userId}`,);

            socket.on("join_room", async (data) => {

                console.log("join_room received:", data,);

                try {

                    const { warRoomId } = data;

                    if (!warRoomId) {
                        return;
                    }

                    const userId = socket.data.user.userId;

                    const user = await this.getUserByIdUseCase.execute(
                        userId,
                        socket.data.user.organizationId,
                    );

                    const isReconnecting = this.roomManager.cancelPendingLeave(
                        userId,
                        warRoomId,
                    );

                    await this.joinWarRoomUseCase.execute(
                        warRoomId,
                        userId,
                        socket.data.user.role
                    );

                    await this.roomManager.joinRoom(
                        socket,
                        warRoomId,
                    );

                    if (!isReconnecting) {

                        socket.to(warRoomId).emit(
                            "room:participant_joined",
                            {
                                warRoomId,
                                userId,
                                userName: user?.name ?? "Unknown user",
                            },
                        );

                    }

                    const participants = await this.getWarRoomParticipantsUseCase.execute(
                        warRoomId,
                    );

                    this.io.to(warRoomId).emit(
                        "room:participants",
                        {
                            warRoomId,
                            participants,
                        },
                    );

                    console.log(`Socket ${socket.id} joined room ${warRoomId}`,);

                } catch (error) {

                    console.error("Failed to join war room:", error,);

                }

            });

            socket.on("leave_room", async (data) => {

                console.log("leave_room received:", data,);

                try {

                    const { warRoomId } = data;

                    if (!warRoomId) {
                        return;
                    }

                    const userId = socket.data.user.userId;

                    const user = await this.getUserByIdUseCase.execute(
                        userId,
                        socket.data.user.organizationId,
                    );

                    this.roomManager.cancelPendingLeave(
                        userId,
                        warRoomId,
                    );

                    await this.leaveWarRoomUseCase.execute(
                        warRoomId,
                        userId,
                        socket.data.user.role

                    );

                    socket.to(warRoomId).emit(
                        "room:participant_left",
                        {
                            warRoomId,
                            userId,
                            userName: user?.name ?? "Unknown user",
                        },
                    );

                    await this.roomManager.leaveRoom(
                        socket,
                        warRoomId,
                    );

                    const participants = await this.getWarRoomParticipantsUseCase.execute(
                        warRoomId,
                    );

                    this.io.to(warRoomId).emit(
                        "room:participants",
                        {
                            warRoomId,
                            participants,
                        },
                    );

                    console.log(`Socket ${socket.id} left room ${warRoomId}`,);

                } catch (error) {

                    console.error("Failed to leave war room:", error,);

                }

            });

            socket.on("get_participants", async (data) => {

                console.log("get_participants received:", data,);

                try {

                    const { warRoomId } = data;

                    if (!warRoomId) {
                        return;
                    }

                    const participants = await this.getWarRoomParticipantsUseCase.execute(
                        warRoomId,
                    );

                    socket.emit(
                        "room:participants",
                        {
                            warRoomId,
                            participants,
                        },
                    );

                } catch (error) {

                    console.error("Failed to get war room participants:", error);

                }

            });

            socket.on("send_message", async (data) => {

                try {

                    const { warRoomId, content } = data;

                    if (!warRoomId || !content) {
                        return;
                    }

                    const userId = socket.data.user.userId;

                    const message = await this.sendWarRoomMessageUseCase.execute(
                        warRoomId,
                        userId,
                        content,
                    );

                    this.io.to(warRoomId).emit(
                        "room:message",
                        message,
                    );

                    console.log(`Message sent in war room ${warRoomId} by user ${userId}`,);

                } catch (error) {
                    console.error("Failed to send war room message:", error,);

                }

            });

            socket.on("disconnecting", async (reason) => {

                try {

                    const warRoomIds = this.roomManager.getSocketRooms(
                        socket,
                    );

                    const userId = socket.data.user.userId;

                    const user = await this.getUserByIdUseCase.execute(
                        userId,
                        socket.data.user.organizationId,
                    );

                    for (const warRoomId of warRoomIds) {

                        this.roomManager.schedulePendingLeave(
                            userId,
                            warRoomId,
                            async () => {

                                await this.leaveWarRoomUseCase.execute(
                                    warRoomId,
                                    userId,
                                    socket.data.user.role
                                );

                                this.io.to(warRoomId).emit(
                                    "room:participant_left",
                                    {
                                        warRoomId,
                                        userId,
                                        userName: user?.name ?? "Unknown user",
                                    },
                                );

                                const participants = await this.getWarRoomParticipantsUseCase.execute(
                                    warRoomId,
                                );

                                this.io.to(warRoomId).emit(
                                    "room:participants",
                                    {
                                        warRoomId,
                                        participants,
                                    },
                                );

                            },
                        );

                    }

                    console.log(`Socket disconnecting: ${socket.id}`, reason,);

                } catch (error) {

                    console.error("Failed to handle socket disconnect:", error,);

                }

            });

        });

    }

}