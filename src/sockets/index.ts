import { Server } from "socket.io";
import { registerSocketEvents } from "./handlers";

export const setupSocketServer = (server: any): Server => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"],
    },
  });

  registerSocketEvents(io);

  console.log("Socket.IO server initialized");
  return io;
};
