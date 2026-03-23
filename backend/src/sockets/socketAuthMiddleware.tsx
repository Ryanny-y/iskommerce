import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (socket: Socket, next: any) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    socket.data.userId = decoded.sub;

    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
};