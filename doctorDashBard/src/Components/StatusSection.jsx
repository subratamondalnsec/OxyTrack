import React from 'react';
import StatusCard from './StatusCard';

// Import icons from react-icons
import { FaUserFriends, FaUserPlus, FaCheckCircle, FaChartLine } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';  // newer clock icon

function StatusSection() {
  const cardData = [
    {
      title: 'Patients Today',
      count: 3,
      subtitle: (
        <>
          <FaChartLine className="text-xs" /> +2 from yesterday
        </>
      ),
      Icon: FaUserFriends,
      bgColor: 'bg-[#2a6df4]',
    },
    {
      title: 'Total Patients',
      count: 5,
      subtitle: 'Active patient records',
      Icon: FaUserPlus,
      bgColor: 'bg-[#27ae4a]',
    },
    {
      title: 'Pending',
      count: 3,
      subtitle: 'Awaiting confirmation',
      Icon: FaClock,
      bgColor: 'bg-gradient-to-r from-[#f0ad14] to-[#f97316]',
    },
    {
      title: 'Confirmed',
      count: 3,
      subtitle: 'Ready for appointments',
      Icon: FaCheckCircle,
      bgColor: 'bg-[#8a3ffc]',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {cardData.map((card, index) => (
        <StatusCard
        key={index}
        title={card.title}
        count={card.count}
        subtitle={card.subtitle}
        Icon={card.Icon}
        bgColor={card.bgColor}
        />
    ))}
    </div>
  );
}

export default StatusSection;
