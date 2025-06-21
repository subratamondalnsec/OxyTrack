import React from 'react';

function NotificationModal({ notifications, onClose, markAllAsRead }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative font-sans">
        <button onClick={() => { markAllAsRead(); onClose(); }} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>

        <h2 className="text-xl font-semibold text-[#0f172a] mb-4">Notifications</h2>

        <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div key={notification.id} className="py-3 flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full mt-1 ${notification.read ? 'bg-gray-300' : 'bg-red-500'}`}></div>
                <div>
                  <p className="text-sm text-[#0f172a]">{notification.message}</p>
                  <p className="text-xs text-gray-400">{new Date(notification.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
