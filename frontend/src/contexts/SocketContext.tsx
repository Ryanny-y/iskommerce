import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAuth from "./AuthContext";
import { BASE_API_URL } from "@/config/secrets";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authResponse } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!authResponse?.accessToken) return;

    // create socket
    const newSocket = io(BASE_API_URL, {
      auth: {
        token: authResponse.accessToken,
      },
      transports: ["websocket"],
    });

    // connection listeners
    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    setSocket(newSocket);

    // cleanup
    return () => {
      newSocket.disconnect();
    };
  }, [authResponse?.accessToken]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// custom hook
export const useSocket = () => {
  return useContext(SocketContext);
};