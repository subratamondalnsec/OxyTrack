import React from 'react';

const StatusCard = ({ title, count, subtitle, Icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg p-5 text-white shadow-md`}>
      <div className="flex justify-between items-start">
        <p className="font-semibold text-md">{title}</p>
        <Icon className="text-white opacity-70 text-lg" />
      </div>
      <p className="font-bold text-3xl my-3 leading-none">{count}</p>
      <p className="text-xs flex items-center gap-1 opacity-90">{subtitle}</p>
    </div>
  );
};

export default StatusCard;
