import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app";
import { PORT } from "./config/env";
import registerSocketHandlers from "./sockets";
import { setSocketIO } from "./sockets/socketInstance";

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Initialize WebSocket handlers
registerSocketHandlers(io);

setSocketIO(io);

httpServer.listen(PORT as number, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
