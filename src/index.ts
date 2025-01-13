import app from "@/app";
import { env } from "@/env";
import { DB_CONNECTION_URL } from "./database/database-url";
import SafeMongooseConnection from "./database/safe-mongoose-connection";
import { setupSocketServer } from "./sockets";

const PORT = env.PORT || 4000;

const safeMongooseConnection = new SafeMongooseConnection({
  mongoUrl: env.DB_CONNECTION_URL ?? "",
  onStartConnection: (mongoUrl) =>
    console.log(`Connecting to MongoDB at ${mongoUrl}`),
  onConnectionError: (error, mongoUrl) =>
    console.error(`Could not connect to MongoDB at ${mongoUrl}`, error),
  onConnectionRetry: (mongoUrl) =>
    console.log(`Retrying to connect to MongoDB at ${mongoUrl}`),
});

// Start the Express server
const httpServer = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  if (env.NODE_ENV === "development") {
    console.log(`Swagger UI: http://localhost:${PORT}/dev/api-docs`);
  }
});

// Initialize Socket.IO
const io = setupSocketServer(httpServer);
app.set("io", io); // Attach io instance to app for global access

// Ensure MongoDB connection is established
if (!DB_CONNECTION_URL) {
  console.error("DB_CONNECTION_URL not specified in environment");
  process.exit(1);
} else {
  safeMongooseConnection.connect((mongoUrl) =>
    console.log(`Connected to MongoDB at ${mongoUrl}`)
  );
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nGracefully shutting down...");
  console.log("Closing MongoDB connection...");
  try {
    await safeMongooseConnection.close(true);
    console.log("MongoDB connection closed successfully");
  } catch (error) {
    console.error("Error closing MongoDB connection", error);
  }
  process.exit(0);
});

export { io };
