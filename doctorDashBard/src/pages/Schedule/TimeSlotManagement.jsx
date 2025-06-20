import { mockTimeSlots } from "../../data/data";
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FaClock, FaPlus } from 'react-icons/fa';
import TimeSlotCard from "./TimeSlotCard";

const TimeSlotManagement = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const totalSlots = mockTimeSlots.length;
  const bookedSlots = mockTimeSlots.filter(slot => slot.status === 'booked').length;
  const availableSlots = totalSlots - bookedSlots;
  const utilization = ((bookedSlots / totalSlots) * 100).toFixed(0);

  return (
    <div className="max-w-5xl mx-auto rounded-md overflow-hidden shadow-sm bg-white">
      <div className="bg-gradient-to-r from-[#f44336] to-[#fb6e3b] p-4 rounded-t-md">
        <div className="flex items-center gap-2 text-white font-semibold text-lg">
          <FaClock />
          <span>Time Slot Management</span>
        </div>
        <div className="text-xs text-white/90 mt-1">
          Manage your available appointment time slots
        </div>
      </div>

      <div className="bg-[#f9fbfd] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-[#4a5568]">
        <label htmlFor="date" className="font-semibold mr-2 whitespace-nowrap">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm text-[#1a202c] cursor-pointer"
        />
        <div className="mt-2 sm:mt-0 text-xs sm:text-sm text-[#4a5568]">
          {dayjs(selectedDate).format('dddd, MMMM D, YYYY')}
        </div>
      </div>

      <div className="px-6 py-6 grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-4">
        {mockTimeSlots.map((slot, idx) => (
          <TimeSlotCard key={idx} slot={slot} />
        ))}
      </div>

      <div className="px-6 pb-6 flex flex-wrap items-center gap-4 text-xs text-[#4a5568]">
        <button
          type="button"
          className="flex items-center gap-1 text-[#2a5db0] font-semibold hover:underline"
        >
          <FaPlus />
          Add New Time Slot
        </button>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-200 border border-green-300 rounded-sm"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-200 border border-red-300 rounded-sm"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="bg-[#e8f0fe] px-6 py-4 m-3 text-sm text-[#2a5db0] flex flex-wrap gap-6 rounded-b-md">
        <div className="font-semibold">Schedule Summary</div>
        <div className="flex gap-1">
          <span>Total Slots:</span>
          <span className="font-semibold text-[#1a202c]">{totalSlots}</span>
        </div>
        <div className="flex gap-1 text-green-700">
          <span>Available:</span>
          <span className="font-semibold text-[#1a202c]">{availableSlots}</span>
        </div>
        <div className="flex gap-1 text-red-700">
          <span>Booked:</span>
          <span className="font-semibold text-[#1a202c]">{bookedSlots}</span>
        </div>
        <div className="flex gap-1 text-purple-600">
          <span>Utilization:</span>
          <span className="font-semibold text-[#1a202c]">{utilization}%</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotManagement;
