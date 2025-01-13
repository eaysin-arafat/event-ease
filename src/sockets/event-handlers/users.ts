import { Server, Socket } from "socket.io";

export const handleUserEvents = (io: Server, socket: Socket) => {
  socket.on("user:login", (data) => {
    console.log(`User logged in: ${data.userId}`);
    socket.emit("user:login:success", { message: "Login successful!" });
  });
};
