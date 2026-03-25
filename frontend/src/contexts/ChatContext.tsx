import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import type { ChatConversation } from "@/types/chat";
// import useAuth from "./AuthContext";
// import { API_URL } from "@/config/secrets";

interface ChatContextType {
  unreadMap: Record<string, number>;
  incrementUnread: (conversationId: string) => void;
  conversations: ChatConversation[];
  setConversations: React.Dispatch<React.SetStateAction<ChatConversation[]>>;
  resetUnread: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType>({
  unreadMap: {},
  conversations: [],
  setConversations: () => {},
  incrementUnread: () => {},
  resetUnread: () => {},
});

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket } = useSocket();
  const [unreadMap, setUnreadMap] = React.useState<Record<string, number>>({});
  const [conversations, setConversations] = useState<ChatConversation[]>([]);

  useEffect(() => {
    if (!socket) return;
    const handleConversationUpdate = (data: {
      conversationId: string;
      lastMessage: string;
      lastMessageAt: string;
    }) => {
      setConversations((prev) => {
        const exists = prev.some((c) => c.id === data.conversationId);

        if (exists) {
          return prev.map((c) =>
            c.id === data.conversationId
              ? {
                  ...c,
                  lastMessage: data.lastMessage,
                  lastMessageAt: data.lastMessageAt,
                }
              : c,
          );
        }
        return prev;
      });
    };

    socket.on("chat:conversation_updated", handleConversationUpdate);

    const handleUnreadUpdate = ({ conversationId, unreadCount }: any) => {
      const currentPath = window.location.pathname;
      const isInConversation = currentPath.includes(
        `/messages/${conversationId}`,
      );

      if (!isInConversation) {
        setUnreadMap((prev) => ({ ...prev, [conversationId]: unreadCount }));
      } else {
        socket?.emit("chat:mark_read", conversationId);
      }

      if (!isInConversation) {
        setUnreadMap((prev) => ({ ...prev, [conversationId]: unreadCount }));
      }
    };

    socket.on("chat:unread_update", handleUnreadUpdate);

    return () => {
      socket.off("chat:conversation_updated", handleConversationUpdate);
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
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        unreadMap,
        resetUnread,
        incrementUnread,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
