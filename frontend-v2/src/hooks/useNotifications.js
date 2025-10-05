import { useState, useEffect, useCallback } from 'react';
import { useGetNotificationsQuery } from '../redux/hooks/notificationsHook';
import { useSocket } from '../context/SocketContext';

export const useNotifications = (userId) => {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { data: notificationsData = [], refetch } = useGetNotificationsQuery(userId, { skip: !userId });
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  useEffect(() => {
    if (!socket || !isConnected || !userId) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setHasNewNotifications(true);
    };

    socket.on('notification', handleNewNotification);

    return () => {
      socket.off('notification', handleNewNotification);
    };
  }, [socket, isConnected, userId]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasNewNotifications(false);
    }
  }, [isOpen]);

  return {
    notificationsData: notifications,
    hasNewNotifications,
    isOpen,
    setIsOpen,
    toggleDropdown,
    refetch,
  };
};