import React from 'react';
import { useNotifications } from '../context/NotificationsContext';

export default function NotificationsCenter() {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Notifications Center</h2>
        <button className="text-blue-600 border px-3 py-1 rounded" onClick={markAllAsRead}>Mark all as read</button>
      </div>
      <ul className="bg-white rounded shadow divide-y">
        {notifications.length === 0 && <li className="p-4 text-gray-400">No notifications</li>}
        {notifications.map(n => (
          <li key={n.id} className={`flex items-center gap-3 p-4 ${!n.read ? 'bg-blue-50' : ''}`}>
            <span className={`w-2 h-2 rounded-full ${n.read ? 'bg-gray-300' : 'bg-blue-500'}`}></span>
            <div className="flex-1">
              <div className="font-medium">{n.message}</div>
              <div className="text-xs text-gray-400">{new Date(n.timestamp).toLocaleString()}</div>
            </div>
            {!n.read && (
              <button className="text-xs text-blue-600" onClick={() => markAsRead(n.id)}>Mark as read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
