import React, { createContext, useContext, useState } from 'react';

const DoctorNotesContext = createContext();

export function DoctorNotesProvider({ children }) {
  // { [patientId]: [{ id, text, timestamp }] }
  const [notes, setNotes] = useState({});

  const addNote = (patientId, text) => {
    setNotes(prev => ({
      ...prev,
      [patientId]: [
        { id: Date.now(), text, timestamp: new Date().toISOString() },
        ...(prev[patientId] || [])
      ]
    }));
  };
  const editNote = (patientId, noteId, newText) => {
    setNotes(prev => ({
      ...prev,
      [patientId]: prev[patientId].map(n => n.id === noteId ? { ...n, text: newText } : n)
    }));
  };
  const deleteNote = (patientId, noteId) => {
    setNotes(prev => ({
      ...prev,
      [patientId]: prev[patientId].filter(n => n.id !== noteId)
    }));
  };
  return (
    <DoctorNotesContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {children}
    </DoctorNotesContext.Provider>
  );
}
export function useDoctorNotes() {
  return useContext(DoctorNotesContext);
}
