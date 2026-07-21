import http from "http";
import app from "./app";

const PORT = Number(process.env.PORT) || 5555;

const server = http.createServer(app);

export const startServer = () => {
    server.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    })
    return server;
};

