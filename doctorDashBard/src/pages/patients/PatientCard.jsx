import React from 'react';

const PatientCard = ({ patient }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 p-4">
      <div className="flex items-center space-x-3 mb-2">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-200 text-blue-600 text-xs font-semibold"
          aria-label={`Patient initials ${getInitials(patient.name)}`}
        >
          {getInitials(patient.name)}
        </div>
        <div>
          <div className="font-bold text-sm leading-tight">{patient.name}</div>
          <div className="text-xs text-gray-600 leading-tight">Age: {patient.age} years</div>
        </div>
      </div>

      <div className="space-y-2 mb-2">
        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded px-3 py-1 text-gray-500 text-xs">
          <i className="fas fa-phone-alt text-xs"></i>
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded px-3 py-1 text-gray-500 text-xs">
          <i className="fas fa-envelope text-xs"></i>
          <span>{patient.email}</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-1">Medical History:</div>
      <div className="bg-blue-50 text-blue-900 text-xs rounded px-2 py-1 mb-3">
        {patient.medicalHistory}
      </div>

      <button
        className="w-full text-blue-600 text-xs border border-blue-300 rounded py-1 hover:bg-blue-50"
        type="button"
      >
        View Full Profile
      </button>
    </div>
  );
};

export default PatientCard;
