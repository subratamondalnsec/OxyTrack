import React from 'react';
import { FaClock } from 'react-icons/fa';

const TimeSlotCard = ({ slot }) => {
  const isBooked = slot.status === 'booked';

  return (
    <div className={`border ${isBooked ? 'border-red-300' : 'border-green-300'} rounded-md p-3 text-center`}>
      <div className="font-bold text-sm mb-1">{slot.time}</div>
      <div className={`${isBooked ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'} text-xs font-semibold rounded-sm py-1 mb-1 select-none`}>
        {isBooked ? 'Booked' : 'Available'}
      </div>
      <div className="text-[10px] text-gray-500 select-none">Click to toggle</div>
    </div>
  );
};

export default TimeSlotCard;
