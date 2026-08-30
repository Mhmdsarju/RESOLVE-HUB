import { getSocketServer } from "./socket";

export function emitNotification(userId: string, notification: unknown,) {
    const io = getSocketServer();

    io.to(`user:${userId}`).emit("notification:new", notification,);
}