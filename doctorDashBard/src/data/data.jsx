// data/data.js

export const mockPatients = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1985-06-15",
    medicalHistory: "Hypertension, Regular checkups",
    age: 38,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, City, State 12345",
    dateOfBirth: "1990-03-22",
    medicalHistory: "Diabetes Type 2, Monthly monitoring",
    age: 33,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, City, State 12345",
    dateOfBirth: "1978-11-08",
    medicalHistory: "Asthma, Seasonal allergies",
    age: 45,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 321-0987",
    address: "321 Elm St, City, State 12345",
    dateOfBirth: "1995-09-12",
    medicalHistory: "Annual physical, No major issues",
    age: 28,
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "r.wilson@email.com",
    phone: "+1 (555) 654-3210",
    address: "654 Maple Dr, City, State 12345",
    dateOfBirth: "1982-07-25",
    medicalHistory: "High cholesterol, Diet management",
    age: 41,
  },
];

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const getAfterTomorrowDate = () => {
  const afterTomorrow = new Date();
  afterTomorrow.setDate(afterTomorrow.getDate() + 2);
  return afterTomorrow.toISOString().split("T")[0];
};

export const mockAppointments = [
  {
    id: "1",
    patientId: "1",
    patientName: "John Smith",
    date: getCurrentDate(),
    time: "09:00",
    status: "pending",
    type: "Regular Checkup",
    notes: "Follow-up for blood pressure monitoring",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Sarah Johnson",
    date: getCurrentDate(),
    time: "10:30",
    status: "confirmed",
    type: "Diabetes Consultation",
    notes: "Monthly glucose monitoring and medication review",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Michael Brown",
    date: getTomorrowDate(),
    time: "14:00",
    status: "confirmed",
    type: "Asthma Review",
    notes: "Inhaler prescription renewal and breathing test",
  },
  {
    id: "4",
    patientId: "4",
    patientName: "Emily Davis",
    date: getAfterTomorrowDate(),
    time: "11:00",
    status: "pending",
    type: "Annual Physical",
    notes: "Complete health screening and lab work",
  },
  {
    id: "5",
    patientId: "5",
    patientName: "Robert Wilson",
    date: getCurrentDate(),
    time: "15:30",
    status: "confirmed",
    type: "Cholesterol Follow-up",
    notes: "Review lab results and adjust medication",
  },
  {
    id: "6",
    patientId: "1",
    patientName: "John Smith",
    date: getTomorrowDate(),
    time: "16:00",
    status: "pending",
    type: "Blood Pressure Check",
    notes: "Weekly monitoring appointment",
  },
];

export const mockNotifications = [
  {
    id: "1",
    message: "New appointment request from John Smith",
    type: "info",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: "2",
    message: "Sarah Johnson confirmed her appointment",
    type: "success",
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: "3",
    message: "Reminder: Michael Brown's appointment tomorrow at 2:00 PM",
    type: "warning",
    timestamp: new Date().toISOString(),
    read: true,
  },
];

export const mockTimeSlots = [
  { id: "1", time: "09:00", available: false, date: getCurrentDate() },
  { id: "2", time: "09:30", available: true, date: getCurrentDate() },
  { id: "3", time: "10:00", available: true, date: getCurrentDate() },
  { id: "4", time: "10:30", available: false, date: getCurrentDate() },
  { id: "5", time: "11:00", available: true, date: getCurrentDate() },
  { id: "6", time: "11:30", available: true, date: getCurrentDate() },
  { id: "7", time: "14:00", available: true, date: getCurrentDate() },
  { id: "8", time: "14:30", available: true, date: getCurrentDate() },
  { id: "9", time: "15:00", available: true, date: getCurrentDate() },
  { id: "10", time: "15:30", available: false, date: getCurrentDate() },
  { id: "11", time: "16:00", available: true, date: getCurrentDate() },
  { id: "12", time: "16:30", available: true, date: getCurrentDate() },
];
