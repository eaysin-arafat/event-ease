import { Server } from "socket.io";
import { handleEventUpdates } from "./event-handlers/events";
import { handleUserEvents } from "./event-handlers/users";

export const registerSocketEvents = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    handleUserEvents(io, socket);

    handleEventUpdates(io, socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
