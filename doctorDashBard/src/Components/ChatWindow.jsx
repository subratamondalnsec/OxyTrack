import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';

export default function ChatWindow({ patientId, patientName }) {
  const { chats, sendMessage } = useChat();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const messages = chats[patientId] || [];
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(patientId, user.role, input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-t">
        {messages.map(msg => (
          <div key={msg.id} className={`mb-2 flex ${msg.sender === user.role ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-3 py-2 rounded shadow text-sm ${msg.sender === user.role ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <div>{msg.text}</div>
              <div className="text-xs text-gray-300 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="p-2 bg-white rounded-b flex gap-2">
        <input className="flex-1 border rounded px-2 py-1" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." onKeyDown={e => e.key === 'Enter' && handleSend()} />
        <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
