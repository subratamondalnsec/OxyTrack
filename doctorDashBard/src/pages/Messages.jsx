import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import ChatWindow from '../components/ChatWindow';

// Mock patients list for demo
const patients = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
];

export default function Messages() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  return (
    <div className="flex h-[80vh] max-w-4xl mx-auto bg-white rounded shadow mt-8">
      <div className="w-1/3 border-r p-4">
        <h3 className="font-bold mb-2">Patients</h3>
        <ul>
          {patients.map(p => (
            <li key={p.id}>
              <button className={`w-full text-left px-2 py-1 rounded ${selectedPatient.id === p.id ? 'bg-blue-100' : ''}`} onClick={() => setSelectedPatient(p)}>{p.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="border-b p-4 font-bold">Chat with {selectedPatient.name}</div>
        <div className="flex-1">
          <ChatWindow patientId={selectedPatient.id} patientName={selectedPatient.name} />
        </div>
      </div>
    </div>
  );
}
