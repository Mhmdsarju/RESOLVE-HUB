import "dotenv/config";
import { startServer } from "./app/server";


const server = startServer();

const gracefulShutdown = (signal: string) => {
    console.log(`\n${signal} received.`)
    console.log("Gracefully shutting down server...")

    server.close(() => {
        console.log("HTTP Server closed");
        console.log("Application stopped successfully.");
        process.exit(0);
    })

    setTimeout(() => {
        console.error("Force shutting down...");
        process.exit(1);
    }, 10000);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
});