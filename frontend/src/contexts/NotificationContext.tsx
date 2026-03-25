import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./SocketContext";
import useFetchData from "@/hooks/useFetchData";
import type { ApiResponse } from "@/types/common";

export interface Notification {
  id: string;
  type: "ORDER_UPDATE" | "NEW_ORDER" | "NEW_MESSAGE" | "REVIEW";
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;

  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
  fetchUnreadCount: () => void;

  addNotification: (notif: Notification) => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllAsRead: () => {},
  markAsRead: (id: string) => {},
  fetchUnreadCount: () => {},
  addNotification: () => {},
  setNotifications: () => {},
});

export const NotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { socket } = useSocket();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { data, loading, error } = useFetchData<ApiResponse<Notification[]>>('notifications'); 

  useEffect(() => {
    if(data && !loading && !error) {
      setNotifications(data.data || []);
    }
  }, [data, loading, error])

  useEffect(() => {
    if (!socket) return;

    /**
     * NEW NOTIFICATION
     */
    const handleNewNotification = (notif: Notification) => {
      setNotifications((prev) => [notif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    /**
     * UNREAD COUNT SYNC
     */
    const handleUnreadCount = (count: number) => {
      setUnreadCount(count);
    };

    /**
     * ALL READ
     */
    const handleAllRead = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:unread_count", handleUnreadCount);
    socket.on("notification:all_read", handleAllRead);

    // fetch unread count on mount
    socket.emit("notification:get_unread_count");

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:unread_count", handleUnreadCount);
      socket.off("notification:all_read", handleAllRead);
    };
  }, [socket]);

  /**
   * MARK ALL AS READ
   */
  const markAllAsRead = () => {
    socket?.emit("notification:mark_read");
  };

  /**
   * FETCH UNREAD COUNT
   */
  const fetchUnreadCount = () => {
    socket?.emit("notification:get_unread_count");
  };

  /**
   * MANUAL ADD (optional use)
   */
  const addNotification = (notif: Notification) => {
    setNotifications((prev) => [notif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );

    // Optionally notify backend
    socket?.emit("notification:mark_single_read", { id });

    // Decrease unread count
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAllAsRead,
        markAsRead,
        fetchUnreadCount,
        addNotification,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
