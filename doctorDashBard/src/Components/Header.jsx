import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import NotificationModal from './NotificationModal';
import { mockNotifications } from '../data/data';
import { useState } from 'react';
export default function Header() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showModal, setShowModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  return (
    <div className="max-w-5xl mx-auto m-8">
      <div className="bg-white p-6 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] leading-tight">Doctor Dashboard</h1>
          <p className="text-[#475569] flex items-center space-x-2 mt-1 text-sm font-normal">
            <i className="fas fa-wave-square text-[#475569]"></i>
            <span>Manage your appointments and patients efficiently</span>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowModal(true)}
            aria-label="Notifications"
            className="relative border border-gray-300 rounded-md p-2 text-[#0f172a] hover:bg-gray-100 focus:outline-none"
          >
            <IoMdNotificationsOutline size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#fca5a5] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="text-right">
            <p className="text-xs text-[#475569] text-center">Today</p>
            <p className="font-extrabold text-[#0f172a] text-sm leading-none">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {showModal && (
        <NotificationModal
          notifications={notifications}
          markAllAsRead={markAllAsRead}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}