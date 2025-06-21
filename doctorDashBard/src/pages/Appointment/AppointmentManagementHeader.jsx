import React, { useState } from 'react';
import { FaCalendarAlt, FaSearch, FaChevronDown } from 'react-icons/fa';
import { mockAppointments, mockPatients } from '../../data/data';
import AppointmentCard from './AppointmentCard';
import PatientModal from './PatientModal';

function AppointmentManagementHeader() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewPatient = (patientId) => {
    const patient = mockPatients.find((p) => p.id === patientId);
    setSelectedPatient(patient);
  };

  const handleAccept = (id) => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'confirmed' } : app)
    );
  };

  const handleDecline = (id) => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'cancelled' } : app)
    );
  };

  // Apply filter logic
  const filteredAppointments = appointments.filter(app => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesSearch = searchTerm === "" || app.patientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto my-6">
      <div className="bg-blue-600 rounded-md p-4">
        <div className="flex items-center space-x-2 text-white">
          <FaCalendarAlt className="text-lg" />
          <h1 className="font-semibold text-lg">Appointment Management</h1>
        </div>
        <p className="text-gray-100 text-sm mt-3">
          View and manage all appointments efficiently
        </p>
      </div>

      <div className="bg-gray-50">
        <form className="flex items-center space-x-3 max-w-full p-5">
          <div className="flex-1 relative">
            <input
              type="search"
              placeholder="Search appointments, patients, or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-8 text-xs placeholder-gray-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          </div>

          <div className="relative w-36">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-xs"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
          </div>
        </form>

        <div className="max-w-full mx-auto space-y-4 p-5">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onAccept={() => handleAccept(appointment.id)}
              onDecline={() => handleDecline(appointment.id)}
              onViewPatient={() => handleViewPatient(appointment.patientId)}
            />
          ))}

          {filteredAppointments.length === 0 && (
            <p className="text-center text-gray-400">No appointments found</p>
          )}
        </div>
      </div>

      {selectedPatient && (
        <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );
}

export default AppointmentManagementHeader;
