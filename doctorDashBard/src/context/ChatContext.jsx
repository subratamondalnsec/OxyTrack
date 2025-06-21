import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

// { [patientId]: [{ id, sender, text, timestamp }] }
const mockChats = {
  '1': [
    { id: 1, sender: 'doctor', text: 'Hello, how are you feeling?', timestamp: '2025-06-20T10:00:00' },
    { id: 2, sender: 'patient', text: 'I am feeling better, thank you!', timestamp: '2025-06-20T10:05:00' },
  ],
};

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(mockChats);
  const sendMessage = (patientId, sender, text) => {
    setChats(prev => ({
      ...prev,
      [patientId]: [
        ...(prev[patientId] || []),
        { id: Date.now(), sender, text, timestamp: new Date().toISOString() }
      ]
    }));
  };
  return (
    <ChatContext.Provider value={{ chats, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
export function useChat() {
  return useContext(ChatContext);
}
