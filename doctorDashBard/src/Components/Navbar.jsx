import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const navItems = [
    { label: 'Appointments', path: '/' },
    { label: 'Calendar', path: '/calendar' },
    { label: 'Patients', path: '/patients' },
    { label: 'Schedule', path: '/schedule' },
  ];

  return (
    <div className="max-w-5xl mx-auto my-6">
      <nav className="flex bg-white rounded-lg border border-transparent">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex-1 py-2 text-center font-semibold rounded-lg ${
                isActive ? 'text-black opacity-100 font-bold ' : 'text-gray-500 opacity-60'
              }`
            }
            end
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
