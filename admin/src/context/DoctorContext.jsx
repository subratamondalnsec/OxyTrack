import { createContext, useContext, useState } from "react";

const DoctorContext = createContext();

const initialDoctors = [
  { id: 1, name: 'Dr. John Smith', contact: '555-1234', email: 'john@example.com', department: 'General Physician', joining: '2023-01-10' },
  { id: 2, name: 'Dr. Jane Doe', contact: '555-5678', email: 'jane@example.com', department: 'Dermatology', joining: '2024-03-15' },
];

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");
  const [doctors, setDoctors] = useState(initialDoctors);

  const addDoctor = (doctor) => {
    setDoctors(prev => [doctor, ...prev]);
  };

  const value = {
    dToken, setDToken,
    doctors, addDoctor,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

const UseDoctorContext = () => {
  return useContext(DoctorContext);
};

export default DoctorContextProvider;
export { DoctorContext, UseDoctorContext };