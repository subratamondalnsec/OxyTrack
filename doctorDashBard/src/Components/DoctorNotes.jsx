import React, { useState } from 'react';
import { useDoctorNotes } from '../context/DoctorNotesContext';

export default function DoctorNotes({ patientId }) {
  const { notes, addNote, editNote, deleteNote } = useDoctorNotes();
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const patientNotes = notes[patientId] || [];

  const handleAdd = () => {
    if (newNote.trim()) {
      addNote(patientId, newNote);
      setNewNote('');
    }
  };
  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };
  const handleSave = (id) => {
    editNote(patientId, id, editText);
    setEditingId(null);
  };
  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h3 className="font-bold mb-2">Doctor Notes</h3>
      <div className="flex gap-2 mb-2">
        <textarea className="flex-1 border rounded p-2" rows={2} value={newNote} onChange={e => setNewNote(e.target.value)} placeholder="Add a new note..." />
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleAdd}>Add</button>
      </div>
      <ul className="space-y-2">
        {patientNotes.length === 0 && <li className="text-gray-400">No notes yet.</li>}
        {patientNotes.map(note => (
          <li key={note.id} className="border rounded p-2 flex flex-col">
            <div className="flex justify-between items-center">
              {editingId === note.id ? (
                <>
                  <textarea className="flex-1 border rounded p-1" value={editText} onChange={e => setEditText(e.target.value)} />
                  <button className="text-green-600 ml-2" onClick={() => handleSave(note.id)}>Save</button>
                  <button className="text-gray-500 ml-1" onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{note.text}</span>
                  <div>
                    <button className="text-blue-600 text-xs ml-2" onClick={() => handleEdit(note.id, note.text)}>Edit</button>
                    <button className="text-red-500 text-xs ml-2" onClick={() => deleteNote(patientId, note.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1">{new Date(note.timestamp).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
