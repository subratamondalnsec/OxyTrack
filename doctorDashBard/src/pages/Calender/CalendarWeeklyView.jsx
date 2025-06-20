import React, { useState } from 'react';
import { mockAppointments } from '../../data/data';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import dayjs from 'dayjs';

function CalendarWeeklyView() {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.month());
  const [currentYear, setCurrentYear] = useState(today.year());

  const daysInMonth = dayjs(`${currentYear}-${currentMonth + 1}-01`).daysInMonth();
  const firstDayOfWeek = dayjs(`${currentYear}-${currentMonth + 1}-01`).day();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getAppointmentsForDate = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    return mockAppointments.filter(appointment => appointment.date === formattedDate);
  };

  const generateCalendarGrid = () => {
    const rows = [];
    let cells = [];
    let day = 1;

    // First row - empty cells for days before start
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(<td key={`empty-${i}`} className="py-1"></td>);
    }

    // Fill days
    while (day <= daysInMonth) {
      if (cells.length === 7) {
        rows.push(<tr key={`week-${rows.length}`}>{cells}</tr>);
        cells = [];
      }
      cells.push(
        <td key={day} className={`py-1 ${day === today.date() && currentMonth === today.month() && currentYear === today.year() ? 'bg-blue-500 text-white rounded-sm' : ''}`}>
          {day}
        </td>
      );
      day++;
    }

    // Fill remaining empty cells at end
    while (cells.length < 7) {
      cells.push(<td key={`empty-end-${cells.length}`} className="py-1"></td>);
    }
    rows.push(<tr key={`last-row`}>{cells}</tr>);

    return rows;
  };

  const getWeekRange = () => {
    const weekStart = today.startOf('week');
    const weekEnd = today.endOf('week');
    return { weekStart, weekEnd };
  };

  const { weekStart, weekEnd } = getWeekRange();

  const generateWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = weekStart.add(i, 'day');
      const appointments = getAppointmentsForDate(day);
      weekDays.push(
        <div key={i} className={`border rounded-md flex flex-col min-h-[160px] ${day.isSame(today, 'day') ? 'border-blue-400' : 'border-gray-200'}`}>
          <div className={`border-b px-2 py-1 font-semibold text-[11px] ${day.isSame(today, 'day') ? 'text-blue-600 border-blue-400' : 'text-gray-700 border-gray-200'}`}>
            {day.format('DD ddd')}
          </div>
          <div className="flex flex-col gap-1 p-2">
            {appointments.length === 0 && (
              <div className="italic text-gray-400 text-[10px]">No<br />appointments</div>
            )}
            {appointments.map((appt, idx) => (
              <div key={idx} className={`${appt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} rounded px-1 py-0.5 text-[10px] leading-tight`}>
                <div className="font-semibold">{dayjs(`${appt.date}T${appt.time}`).format('h:mm A')}</div>
                <div>{appt.patientName.length > 8 ? appt.patientName.slice(0, 8) + "..." : appt.patientName}</div>
                <div>{appt.type}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return weekDays;
  };

  return (
    <div className=" flex flex-col md:flex-row gap-6 p-4 bg-gray-50">
      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow-md w-full md:w-[360px]">
        <div className="bg-[#8c3df5] rounded-t-lg px-5 py-3 flex items-center gap-2 text-white font-semibold text-sm">
          <FaCalendarAlt />
          <span>Calendar</span>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-center mb-4 text-sm font-semibold text-black">
            <button onClick={handlePrevMonth} className="hover:text-[#8c3df5]"><FaChevronLeft /></button>
            <div>{dayjs(`${currentYear}-${currentMonth + 1}-01`).format('MMMM YYYY')}</div>
            <button onClick={handleNextMonth} className="hover:text-[#8c3df5]"><FaChevronRight /></button>
          </div>
          <table className="w-full text-center text-xs text-gray-600 select-none">
            <thead>
              <tr>
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => (
                  <th key={i} className="font-normal py-1">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>{generateCalendarGrid()}</tbody>
          </table>
        </div>
      </div>

      {/* Weekly View Section */}
      <div className="bg-white rounded-lg shadow-md flex-1 min-w-0">
        <div className="bg-[#5c6ef8] rounded-t-lg px-5 py-4 text-white font-semibold text-sm">
          <div>Weekly View</div>
          <div className="text-xs font-normal mt-1">
            Week of {weekStart.format('D/M/YYYY')} - {weekEnd.format('D/M/YYYY')}
          </div>
        </div>
        <div className="p-5 grid grid-cols-7 gap-2 text-xs text-gray-700 min-w-0">
          {generateWeekDays()}
        </div>
      </div>
    </div>
  );
}

export default CalendarWeeklyView;
