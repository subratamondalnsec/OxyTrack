import React from 'react';
import { FaCalendarAlt, FaSearch, FaChevronDown } from 'react-icons/fa';
import { mockAppointments } from '../../data/data';
import AppointmentCard from './AppointmentCard';

function AppointmentManagementHeader() {
  return (
    <div className="max-w-5xl mx-auto my-6">
      {/* Title Header */}
      <div className="bg-blue-600 rounded-md p-4">
        <div className="flex items-center space-x-2 text-white">
          <FaCalendarAlt className="text-lg" />
          <h1 className="font-semibold text-lg leading-5">Appointment Management</h1>
        </div>
        <p className="text-gray-900 text-sm mt-3">
          View and manage all appointments efficiently
        </p>
      </div>

    <div className='bg-gray-50'>
        {/* Search & Filter Form */}
        <form className="flex items-center space-x-3 max-w-full p-5">
            {/* Search Input */}
            <div className="flex-1 relative">
            <input
                type="search"
                placeholder="Search appointments, patients, or notes..."
                className="w-full border border-gray-300 rounded-md py-2 px-8 text-xs placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                aria-label="Search appointments, patients, or notes"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-36">
            <select
                aria-label="Filter by status"
                className="w-full border border-gray-300 rounded-md py-2 px-3 text-xs text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                defaultValue="all"
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs" />
            </div>
        </form>
            {/* All Cards */}

        <div className="max-w-full mx-auto space-y-4 p-5">
        {mockAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
        </div>
    </div>

    </div>
  );
}

export default AppointmentManagementHeader;
