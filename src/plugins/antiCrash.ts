import type ExtendedClient from "@/classes/ExtendedClient";

export default function antiCrash(client: ExtendedClient) {
    const handleExit = async (): Promise<void> => {
        if (client) {
            client.logger.star("Disconnecting from Discord...");
            await client.destroy();
            client.logger.success("Successfully disconnected from Discord!");
            process.exit();
        }
    };
    process.on("unhandledRejection", (reason, promise) => {
        console.error("[AntiCrash] Unhandled Promise Rejection:", {
            promise: promise,
            reason: reason,
            stack: reason instanceof Error ? reason.stack : undefined,
            timestamp: new Date().toISOString()
        });
        
        if (client?.logger) {
            client.logger.error("Unhandled Rejection at:", promise, "reason:", reason);
        }
    });
    process.on("uncaughtException", (err) => {
        console.error("[AntiCrash] Uncaught Exception:", {
            error: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString()
        });
        
        if (client?.logger) {
            client.logger.error("Uncaught Exception thrown:", err);
        }
    });
    process.on("SIGINT", handleExit);
    process.on("SIGTERM", handleExit);
    process.on("SIGQUIT", handleExit);
}
