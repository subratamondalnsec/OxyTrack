import React from 'react';
import { FaTimes, FaUserFriends, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function PatientModal({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative font-sans">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <FaTimes size={18} />
        </button>

        <h2 className="flex items-center text-gray-900 font-semibold text-base mb-4">
          <FaUserFriends className="mr-2" /> {patient.name} - Complete Profile
        </h2>

        <div className="bg-blue-50 rounded-lg p-4 flex items-center space-x-4 mb-6">
          <div className="flex items-center justify-center rounded-full border border-blue-200 bg-blue-100 text-blue-600 font-semibold w-14 h-14 text-lg">
            {patient.name.split(" ").map(word => word[0]).join("")}
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-sm">{patient.name}</p>
            <p className="text-gray-600 text-xs">Age: {patient.age} years old</p>
            <p className="text-gray-600 text-xs">DOB: {patient.dateOfBirth}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-6 mb-6">
          <div className="flex-1">
            <p className="text-gray-900 font-semibold text-sm mb-2">Contact Information</p>
            <hr className="border-gray-200 mb-3" />
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-3 text-gray-700 text-xs">
              <FaEnvelope className="mr-2 text-gray-400" />
              {patient.email}
            </div>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-3 text-gray-700 text-xs">
              <FaPhoneAlt className="mr-2 text-gray-400" />
              {patient.phone}
            </div>
            <div className="flex items-start bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700 text-xs">
              <FaMapMarkerAlt className="mr-2 mt-[2px] text-gray-400" />
              {patient.address}
            </div>
          </div>

          <div className="flex-1 mt-6 sm:mt-0">
            <p className="text-gray-900 font-semibold text-sm mb-2">Medical Information</p>
            <hr className="border-gray-200 mb-3" />
            <div className="bg-blue-50 rounded-md p-3 text-gray-700 text-xs leading-tight">
              {patient.medicalHistory}
            </div>
          </div>
        </div>

        <div>
          <p className="text-gray-900 font-semibold text-sm mb-2">Appointment History</p>
          <hr className="border-gray-200 mb-3" />
          <p className="text-gray-500 text-xs text-center">No appointments found</p>
        </div>
      </div>
    </div>
  );
}

export default PatientModal;
