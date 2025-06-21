import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationsContext = createContext();

const mockNotifications = [
  { id: 1, message: 'New appointment booked', timestamp: '2025-06-21T09:00:00', read: false },
  { id: 2, message: 'Patient John Doe sent a message', timestamp: '2025-06-20T15:30:00', read: false },
  { id: 3, message: 'Appointment cancelled', timestamp: '2025-06-19T11:00:00', read: true },
];

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, markAsRead, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
