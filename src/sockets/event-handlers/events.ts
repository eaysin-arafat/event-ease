import { Server, Socket } from "socket.io";

export const handleEventUpdates = (io: Server, socket: Socket) => {
  socket.on("event:register", (data) => {
    io.emit("event:update", {
      eventId: data.eventId,
      message: "New attendee registered!",
    });
  });

  socket.on("event:update", (data) => {
    io.emit("event:update", { eventId: data.eventId, ...data });
  });
};
