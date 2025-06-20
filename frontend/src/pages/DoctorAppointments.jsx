"use client"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatisticsCards from "@/components/dashboard/StatisticsCards"
import AppointmentManagement from "@/components/appointments/AppointmentManagement"
import CalendarView from "@/components/calendar/CalendarView"
import PatientDirectory from "@/components/patients/PatientDirectory"
import TimeSlotManagement from "@/components/schedule/TimeSlotManagement"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockPatients, mockAppointments, mockNotifications, mockTimeSlots } from "@/data/mockData"

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [patients, setPatients] = useState(mockPatients)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [timeSlots, setTimeSlots] = useState(mockTimeSlots)
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Handle appointment actions
  const handleAppointmentAction = (appointmentId, action) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: action === "accept" ? "confirmed" : "cancelled" } : apt,
      ),
    )

    // Add notification
    const appointment = appointments.find((apt) => apt.id === appointmentId)
    if (appointment) {
      const newNotification = {
        id: Date.now().toString(),
        message: `Appointment with ${appointment.patientName} ${action === "accept" ? "confirmed" : "cancelled"}`,
        type: action === "accept" ? "success" : "warning",
        timestamp: new Date().toISOString(),
        read: false,
      }
      setNotifications((prev) => [newNotification, ...prev])
    }
  }

  // Mark appointment as completed
  const markAsCompleted = (appointmentId) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: "completed" } : apt)))

    const appointment = appointments.find((apt) => apt.id === appointmentId)
    if (appointment) {
      const newNotification = {
        id: Date.now().toString(),
        message: `Appointment with ${appointment.patientName} marked as completed`,
        type: "success",
        timestamp: new Date().toISOString(),
        read: false,
      }
      setNotifications((prev) => [newNotification, ...prev])
    }
  }

  // Mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  // Toggle time slot availability
  const toggleTimeSlot = (slotId) => {
    setTimeSlots((prev) => prev.map((slot) => (slot.id === slotId ? { ...slot, available: !slot.available } : slot)))
  }

  // Add new time slot
  const addTimeSlot = () => {
    const newTime = "17:00"
    const selectedDateString = selectedDate.toISOString().split("T")[0]
    const newSlot = {
      id: Date.now().toString(),
      time: newTime,
      available: true,
      date: selectedDateString,
    }
    setTimeSlots((prev) => [...prev, newSlot])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <DashboardHeader notifications={notifications} markNotificationAsRead={markNotificationAsRead} />

        {/* Statistics Cards */}
        <StatisticsCards appointments={appointments} patients={patients} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger
              value="appointments"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="patients" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Patients
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Schedule
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <AppointmentManagement
              appointments={appointments}
              patients={patients}
              handleAppointmentAction={handleAppointmentAction}
              markAsCompleted={markAsCompleted}
            />
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <CalendarView appointments={appointments} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients">
            <PatientDirectory patients={patients} appointments={appointments} />
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <TimeSlotManagement
              timeSlots={timeSlots}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              toggleTimeSlot={toggleTimeSlot}
              addTimeSlot={addTimeSlot}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
