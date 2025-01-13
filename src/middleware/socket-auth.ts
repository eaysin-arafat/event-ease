import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const socketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (socket as any).user = decoded;
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
};
