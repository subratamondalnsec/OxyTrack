import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const mockUsers = [
  { username: 'doctor1', password: 'pass', role: 'doctor', name: 'Dr. Smith' },
  { username: 'admin1', password: 'pass', role: 'admin', name: 'Admin User' },
  { username: 'nurse1', password: 'pass', role: 'nurse', name: 'Nurse Joy' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    const found = mockUsers.find(u => u.username === username && u.password === password);
    if (found) setUser(found);
    return found;
  };
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
