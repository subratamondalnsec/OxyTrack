import React, { useState, useEffect } from 'react';
import { UseAdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaCalendarDay, FaCalendarWeek, FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function SummaryCard({ title, value, icon, bg, text }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg shadow bg-white ${bg} min-w-[160px]`}>
      <div>
        <div className={`text-xs font-semibold mb-1 ${text}`}>{title}</div>
        <div className={`text-2xl font-bold ${text}`}>{value}</div>
      </div>
      <div className={`ml-2 text-3xl ${text}`}>{icon}</div>
    </div>
  );
}

function AllApointment() {
  const [appointments, setAppointments] = useState([]);
  const { backendUrl, aToken } = UseAdminContext();

  // Metrics calculation
  const todayStr = new Date().toISOString().slice(0, 10);
  const weekStart = (() => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay());
    return d.toISOString().slice(0, 10);
  })();
  const weekEnd = (() => {
    const d = new Date();
    d.setDate(d.getDate() + (6 - d.getDay()));
    return d.toISOString().slice(0, 10);
  })();
  const totalToday = appointments.filter(a => a.slotTime && new Date(a.slotTime).toISOString().slice(0, 10) === todayStr).length;
  const totalWeek = appointments.filter(a => {
    if (!a.slotTime) return false;
    const date = new Date(a.slotTime).toISOString().slice(0, 10);
    return date >= weekStart && date <= weekEnd;
  }).length;
  const totalPending = appointments.filter(a => a.status === 'Pending').length;
  const totalCompleted = appointments.filter(a => a.status === 'Completed').length;
  const totalCancelled = appointments.filter(a => a.status === 'Cancelled').length;

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/all-appointments`, { headers: { aToken } });
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching all appointments:', error);
        toast.error('Failed to fetch appointments.');
      }
    };
    fetchAllAppointments();
  }, [backendUrl, aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="pb-4 mb-6 text-2xl font-semibold text-gray-800 border-b">All Appointments (Admin)</h2>
      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <SummaryCard title="Today's Appointments" value={totalToday} icon={<FaCalendarDay />} bg="bg-blue-100" text="text-blue-700" />
        <SummaryCard title="This Week" value={totalWeek} icon={<FaCalendarWeek />} bg="bg-purple-100" text="text-purple-700" />
        <SummaryCard title="Pending" value={totalPending} icon={<FaHourglassHalf />} bg="bg-yellow-100" text="text-yellow-700" />
        <SummaryCard title="Completed" value={totalCompleted} icon={<FaCheckCircle />} bg="bg-green-100" text="text-green-700" />
        <SummaryCard title="Cancelled" value={totalCancelled} icon={<FaTimesCircle />} bg="bg-red-100" text="text-red-700" />
      </div>
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <div className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 border" key={appointment._id}>
            <img
              className="w-32 h-32 object-cover rounded-lg bg-indigo-50"
              src={appointment.doctorId?.image || 'https://via.placeholder.com/150'}
              alt={appointment.doctorId?.name || 'Unknown Doctor'}
            />
            <div className="flex-1 ml-4 text-sm text-gray-700">
              <p className="text-lg font-semibold text-gray-900">{appointment.doctorId?.name || 'Unknown Doctor'}</p>
              <p className="text-gray-600 mb-2">Specialization: {appointment.doctorId?.speciality || 'N/A'}</p>
              <p className="text-gray-800 font-medium mt-2">Patient: {appointment.patientId?.name || 'Unknown Patient'}</p>
              <p className="text-gray-600">Contact: {appointment.patientId?.email || 'N/A'} | {appointment.patientId?.phone || 'N/A'}</p>
              <p className="text-gray-600 font-medium mt-2">Date & Time: {appointment.slotTime ? new Date(appointment.slotTime).toLocaleString() : 'N/A'}</p>
              <p className="text-gray-600 font-medium mt-2">Prescription: {appointment.prescription || 'No prescription available'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllApointment;
