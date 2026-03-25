import React, { createContext, useContext, useEffect } from "react";
import { useSocket } from "./SocketContext";
// import useAuth from "./AuthContext";
// import { API_URL } from "@/config/secrets";

interface ChatContextType {
  unreadMap: Record<string, number>;
  incrementUnread: (conversationId: string) => void;
  resetUnread: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  unreadMap: {},
  incrementUnread: () => {},
  resetUnread: () => {},
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket } = useSocket();
  const [unreadMap, setUnreadMap] = React.useState<Record<string, number>>({});

  useEffect(() => {
    if (!socket) return;

    const handleUnreadUpdate = ({ conversationId, unreadCount }: any) => {
      const currentPath = window.location.pathname;
      const isInConversation = currentPath.includes(
        `/messages/${conversationId}`,
      );

      if (!isInConversation) {
        setUnreadMap((prev) => ({ ...prev, [conversationId]: unreadCount }));
      }
    };

    socket.on("chat:unread_update", handleUnreadUpdate);

    return () => {
      socket.off("chat:unread_update");
    };
  }, [socket]);

  const resetUnread = (conversationId: string) => {
    setUnreadMap((prev) => ({ ...prev, [conversationId]: 0 }));
  };

  const incrementUnread = (conversationId: string) => {
    setUnreadMap((prev) => ({
      ...prev,
      [conversationId]: (prev[conversationId] || 0) + 1,
    }));
  };

  return (
    <ChatContext.Provider value={{ unreadMap, resetUnread, incrementUnread }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
