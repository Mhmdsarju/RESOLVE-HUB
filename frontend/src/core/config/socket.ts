import { io } from "socket.io-client";

import { useAuthStore } from "@/modules/auth/store/authStore"; 

export const socket = io(
    import.meta.env.VITE_SOCKET_URL,
    {
        autoConnect: false,
    },
);

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message);
});

socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
});

export const connectSocket = () => {

    const accessToken = useAuthStore.getState().accessToken;

    console.log("Socket token exists:", !!accessToken);
    console.log("Socket URL:", import.meta.env.VITE_SOCKET_URL);

    if (!accessToken) {
        console.log("Socket connection skipped: access token missing");
        return;
    }

    socket.auth = {
        token: accessToken,
    };

    socket.connect();
};

export const disconnectSocket = () => {

    if (socket.connected) {
        socket.disconnect();
    }

};