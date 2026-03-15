import { Server, Socket } from "socket.io";

export default function registerNotificationSocket(io: Server, socket: Socket) {
  socket.on("notification:join", (userId: string) => {
    socket.join(`user:${userId}`);
  });

}