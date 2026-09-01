import { Server as HttpServer } from "http";
import { Server } from "socket.io";


let io: Server;

export function initializeSocket(server: HttpServer) {

    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            credentials: true
        }
    });

    return io;

}

export function getSocketServer():Server{
    if(!io){
        throw new Error("Socket server has not been initialized");
    }
    return io;
}
