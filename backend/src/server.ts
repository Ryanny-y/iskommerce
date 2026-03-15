import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app";
import { PORT } from "./config/env";
import registerSocketHandlers from "./sockets";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Initialize WebSocket handlers
registerSocketHandlers(io);

httpServer.listen(PORT as number, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});