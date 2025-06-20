import React from 'react';
import { FaCalendarAlt, FaClock, FaCheck, FaTimes, FaUser } from 'react-icons/fa';

const statusColors = {
  pending: 'bg-yellow-200 text-yellow-700',
  confirmed: 'bg-green-200 text-green-700',
  cancelled: 'bg-red-200 text-red-700',
  completed: 'bg-blue-200 text-blue-700',
};

function AppointmentCard({ appointment }) {
  const { patientName, type, date, time, status, notes } = appointment;

  return (
    <div className="bg-white rounded border border-gray-300 p-4 space-y-3">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-blue-300 text-blue-600 text-xs font-semibold">
          {patientName.split(' ').map(word => word[0]).join('')}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-900 leading-tight">{patientName}</p>
          <p className="text-xs text-gray-500 leading-tight">{type}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center space-x-3 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <FaCalendarAlt />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaClock />
          <span>{time}</span>
        </div>
        <div>
          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <div className="ml-auto flex space-x-2">
          <button className="text-xs text-blue-600 border border-blue-600 rounded px-2 py-1 hover:bg-blue-50">
            View Patient
          </button>

          {status === 'pending' && (
            <>
              <button className="text-xs bg-green-600 text-white rounded px-3 py-1 flex items-center space-x-1 hover:bg-green-700">
                <FaCheck /><span>Accept</span>
              </button>
              <button className="text-xs bg-red-600 text-white rounded px-3 py-1 flex items-center space-x-1 hover:bg-red-700">
                <FaTimes /><span>Decline</span>
              </button>
            </>
          )}

          {status === 'confirmed' && (
            <button className="text-xs bg-blue-600 text-white rounded px-3 py-1 flex items-center space-x-1 hover:bg-blue-700">
              <FaCheck /><span>Complete</span>
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 bg-gray-100 rounded px-3 py-1 max-w-full truncate">
        Notes: {notes}
      </p>
    </div>
  );
}

export default AppointmentCard;
