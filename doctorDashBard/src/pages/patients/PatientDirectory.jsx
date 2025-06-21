import React, { useState } from 'react';
// import PatientCard from './PatientCard';
// import { mockPatients } from '../../data/data';
// import { FaUserFriends } from 'react-icons/fa';
// import PatientModal from './PatientModal';
import PatientModal from '../Appointment/PatientModal';
import { mockPatients } from '../../data/data';
import { FaUserFriends } from 'react-icons/fa';
import PatientCard from './PatientCard';

const PatientDirectory = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleViewProfile = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="bg-gray-50 p-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-md bg-green-600 p-4 mb-4">
          <div className="flex items-center space-x-2 text-white font-semibold text-sm">
            <FaUserFriends className="text-lg" />
            <span>Patient Directory</span>
          </div>
          <div className="text-green-100 text-xs mt-1">
            Manage patient information and medical history
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onViewProfile={() => handleViewProfile(patient)}
            />
          ))}
        </div>
      </div>

      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientDirectory;