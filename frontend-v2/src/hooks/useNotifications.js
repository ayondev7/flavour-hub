import { useState, useEffect, useCallback } from 'react';
import { useGetNotificationsQuery } from '../redux/hooks/notificationsHook';
import { io } from 'socket.io-client';

export const useNotifications = (userId) => {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: notificationsData = [], refetch } = useGetNotificationsQuery(userId, { skip: !userId });
  const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

  useEffect(() => {
    if (userId) {
      socket.on('new_notification', () => {
        refetch();
        setHasNewNotifications(true);
      });
    }

    return () => {
      socket.off('new_notification');
    };
  }, [userId, refetch]);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasNewNotifications(false);
    }
  }, [isOpen]);

  return {
    notificationsData,
    hasNewNotifications,
    isOpen,
    setIsOpen,
    toggleDropdown,
  };
};