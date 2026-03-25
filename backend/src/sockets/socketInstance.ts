import { Server } from "socket.io";

let io: Server | null = null;

export const setSocketIO = (serverIO: Server) => {
  io = serverIO;
};

export const getSocketIO = (): Server => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};