import React, { useState } from 'react';
import { FaUserMd, FaPhone, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { UseDoctorContext } from '../../context/DoctorContext';

const DEPARTMENTS = [
	'General Physician',
	'Dermatology',
	'Neurology',
	'Pediatricians',
	'Immunologist',
	'Pulmonologist',
	'Gynecologist',
	'Gastroenterologist',
];

const badgeColors = [
	'bg-blue-100 text-blue-700',
	'bg-green-100 text-green-700',
	'bg-purple-100 text-purple-700',
	'bg-yellow-100 text-yellow-700',
	'bg-pink-100 text-pink-700',
	'bg-indigo-100 text-indigo-700',
	'bg-red-100 text-red-700',
	'bg-teal-100 text-teal-700',
];

function getBadgeColor(dept) {
	const idx = DEPARTMENTS.indexOf(dept);
	return badgeColors[idx % badgeColors.length];
}

export default function DoctorList() {
	const { doctors } = UseDoctorContext();

	return (
		<div className="p-4 md:p-8">
			<div className="mb-6">
				<h2 className="text-2xl font-semibold">Doctor List</h2>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<AnimatePresence>
					{doctors.map((doc, idx) => (
						<motion.div
							key={doc.id}
							className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 hover:scale-105 transition-transform border-t-4"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 30 }}
							transition={{ delay: idx * 0.05 }}
							style={{ borderTopColor: getBadgeColor(doc.department).split(' ')[0].replace('bg-', '#') }}
						>
							<div className="flex items-center gap-2 text-xl font-bold text-gray-800"><FaUserMd className="text-blue-400" /> {doc.name}</div>
							<div className="flex items-center gap-2 text-sm"><span className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeColor(doc.department)}`}>{doc.department}</span></div>
							<div className="flex items-center gap-2 text-sm"><FaPhone className="text-gray-400" />{doc.contact}</div>
							<div className="flex items-center gap-2 text-sm"><FaEnvelope className="text-gray-400" />{doc.email}</div>
							<div className="flex items-center gap-2 text-sm"><FaCalendarAlt className="text-gray-400" />{doc.joining}</div>
							<div className="flex gap-2 mt-2">
								<button className="text-green-600 hover:underline">Edit</button>
								<button className="text-red-600 hover:underline">Delete</button>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
}