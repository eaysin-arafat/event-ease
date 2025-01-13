import { Server } from "socket.io";

export const broadcastToRoom = (
  io: Server,
  room: string,
  event: string,
  data: any
) => {
  io.to(room).emit(event, data);
};

export const joinRoom = (socket: any, room: string) => {
  socket.join(room);
};

export const leaveRoom = (socket: any, room: string) => {
  socket.leave(room);
};
