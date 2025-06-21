import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserProfileDropdown() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <div className="relative">
      <button className="flex items-center gap-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">
        <span className="material-icons">account_circle</span>
        <span>{user.name}</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{user.role}</span>
      </button>
      {/* Dropdown (expand on click if needed) */}
      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-20">
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
