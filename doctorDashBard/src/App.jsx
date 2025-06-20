import React from 'react';
import Header from './Components/Header';
import './App.css'
import StatusSection from './Components/StatusSection';
import Navbar from './Components/Navbar';
import Appointments from './pages/Appointment/Appointments';
import Calender from './pages/Calender/Calender';
import Patients from './pages/patients/patients';
import Schedule from './pages/Schedule/Schedule';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div  >
      <Header/>
      <StatusSection/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Appointments />} />
            <Route path="/calendar" element={<Calender />} />
            <Route path="/patients" element={<Patients/>} />
            <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </div>
  )
}

export default App
