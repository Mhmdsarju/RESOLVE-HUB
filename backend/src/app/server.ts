import http from "http";
import app from "./app";
import { initializeSocket } from "@/config/socket";
import { bindCollaboration } from "@/config/bindings/collaboration.bindings";
import container, { authModule, warRoomModule } from "@/config/inversify.config";

const PORT = Number(process.env.PORT) || 5555;

const server = http.createServer(app);

const io = initializeSocket(server);

bindCollaboration(
    container, 
    io,
    warRoomModule.joinWarRoomUseCase,
    warRoomModule.leaveWarRoomUseCase,
    warRoomModule.getWarRoomParticipantsUseCase,
    warRoomModule.sendWarRoomMessageUseCase,
    authModule.getUserByIdUseCase
)

export const startServer = () => {
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
    return server;
};

