import { Server, Socket } from "socket.io";

export class CollaborationRoomManager {

    private readonly pendingLeaves = new Map<
        string,
        NodeJS.Timeout
    >();

    constructor(
        private readonly io: Server,
    ) { }

    async joinRoom(socket: Socket, roomId: string,) {
        await socket.join(roomId);
    }

    async leaveRoom(socket: Socket, roomId: string,) {
        await socket.leave(roomId);
    }

    cancelPendingLeave(
        userId: string,
        roomId: string,
    ): boolean {

        const key = `${userId}:${roomId}`;

        const timeout = this.pendingLeaves.get(
            key,
        );

        if (!timeout) {
            return false;
        }

        clearTimeout(timeout);

        this.pendingLeaves.delete(
            key,
        );

        console.log(
            `Cancelled pending leave for user ${userId} in room ${roomId}`,
        );

        return true;
    }

    schedulePendingLeave(
        userId: string,
        roomId: string,
        onLeave: () => Promise<void>,
    ) {

        const key = `${userId}:${roomId}`;

        this.cancelPendingLeave(
            userId,
            roomId,
        );

        const timeout = setTimeout(
            async () => {

                this.pendingLeaves.delete(
                    key,
                );

                const sockets =
                    await this.io.in(roomId).fetchSockets();

                const userStillInRoom = sockets.some(
                    (roomSocket) =>
                        roomSocket.data.user?.userId === userId,
                );

                if (userStillInRoom) {
                    return;
                }

                await onLeave();

            },
            5000,
        );

        this.pendingLeaves.set(
            key,
            timeout,
        );

        console.log(
            `Pending leave scheduled for user ${userId} in room ${roomId}`,
        );
    }

    getRoomSockets(roomId: string,): Set<string> {

        const room = this.io.sockets.adapter.rooms.get(roomId);

        return room ?? new Set<string>();
    }


    getSocketByUserId(roomId: string, userId: string,): Socket | undefined {

        const sockets = this.io.sockets.adapter.rooms.get(roomId);

        if (!sockets) {
            return;
        }

        for (const socketId of sockets) {

            const socket = this.io.sockets.sockets.get(socketId);

            if (
                socket?.data.user?.userId === userId
            ) {
                return socket;
            }

        }

        return;
    }

    getSocketRooms(socket: Socket,): string[] {
        return Array.from(socket.rooms).filter(
            (roomId) => roomId !== socket.id && !roomId.startsWith("user:"),
        );
    }

}