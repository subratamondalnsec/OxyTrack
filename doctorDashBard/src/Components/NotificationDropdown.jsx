import React from 'react';
import { useNotifications } from '../context/NotificationsContext';

export default function NotificationDropdown({ onOpenCenter }) {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button className="relative" onClick={onOpenCenter}>
        <span className="material-icons">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{unreadCount}</span>
        )}
      </button>
      {/* Dropdown preview (optional) */}
      <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded z-20">
        <div className="flex justify-between items-center px-3 py-2 border-b">
          <span className="font-semibold">Notifications</span>
          <button className="text-xs text-blue-600" onClick={markAllAsRead}>Mark all as read</button>
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {notifications.slice(0, 5).map(n => (
            <li key={n.id} className={`px-3 py-2 border-b last:border-b-0 flex items-center gap-2 ${!n.read ? 'bg-blue-50' : ''}`}>
              <span className={`w-2 h-2 rounded-full ${n.read ? 'bg-gray-300' : 'bg-blue-500'}`}></span>
              <div className="flex-1">
                <div className="text-sm">{n.message}</div>
                <div className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleString()}</div>
              </div>
              {!n.read && (
                <button className="text-xs text-blue-600" onClick={() => markAsRead(n.id)}>Mark as read</button>
              )}
            </li>
          ))}
        </ul>
        <button className="w-full text-center py-2 text-blue-600 text-sm hover:bg-gray-100" onClick={onOpenCenter}>View all</button>
      </div>
    </div>
  );
}
