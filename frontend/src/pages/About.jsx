import React from 'react'
import { FaHeartbeat, FaUserMd, FaStethoscope, FaPhoneAlt, FaPills, FaCheckCircle, FaLock, FaClock, FaLeaf } from 'react-icons/fa';

function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 py-10 px-2">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-blue-700 mb-2"><FaHeartbeat className="text-pink-500" /> Breathe Easy, Live Better</h2>
          <p className="mt-2 text-gray-700">Welcome to <strong className="text-blue-600">OxyTrack</strong>, your smart respiratory health companion. We provide real-time health insights, expert consultations, and proactive care for better breathing.</p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow p-6 border border-cyan-100">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-cyan-700"><FaStethoscope className="text-cyan-500" /> Our Mission</h2>
          <p className="mt-2 text-gray-700">We empower individuals with advanced technology for early detection, real-time tracking, and seamless access to medical support.</p>
        </div>

        {/* What We Offer Section */}
        <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-700"><FaUserMd className="text-blue-500" /> What We Offer</h2>
          <ul className="list-none mt-2 space-y-3">
            <li className="flex items-center gap-2"><FaStethoscope className="text-blue-400" /><span className="font-semibold text-blue-600">Smart Monitoring</span> <span className="text-gray-700">– Track your respiratory health effortlessly.</span></li>
            <li className="flex items-center gap-2"><FaUserMd className="text-blue-400" /><span className="font-semibold text-blue-600">Virtual Consultations</span> <span className="text-gray-700">– Connect with specialists via secure video calls.</span></li>
            <li className="flex items-center gap-2"><FaHeartbeat className="text-pink-400" /><span className="font-semibold text-blue-600">Personalized Care</span> <span className="text-gray-700">– Get tailored health recommendations.</span></li>
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-green-500" /><span className="font-semibold text-blue-600">Emergency Assistance</span> <span className="text-gray-700">– Quick support when needed.</span></li>
            <li className="flex items-center gap-2"><FaPills className="text-yellow-500" /><span className="font-semibold text-blue-600">Medicine Story</span> <span className="text-gray-700">– Get the required medicines at your doorstep.</span></li>
          </ul>
        </div>

        {/* Why Choose Section */}
        <div className="bg-white rounded-2xl shadow p-6 border border-green-100">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-blue-700"><FaCheckCircle className="text-green-500" /> Why Choose OxyTrack?</h2>
          <ul className="list-none mt-2 space-y-3">
            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /><span className="font-semibold text-blue-600">Easy-to-Use</span> <span className="text-gray-700">– Simple interface for all users.</span></li>
            <li className="flex items-center gap-2"><FaLock className="text-blue-500" /><span className="font-semibold text-blue-600">Secure & Reliable</span> <span className="text-gray-700">– Your data stays protected.</span></li>
            <li className="flex items-center gap-2"><FaClock className="text-cyan-500" /><span className="font-semibold text-blue-600">Accessible Anytime</span> <span className="text-gray-700">– Monitor your health anywhere.</span></li>
          </ul>
        </div>

        {/* Join Us Section */}
        <div className="bg-gradient-to-r from-green-100 via-blue-50 to-cyan-100 rounded-2xl shadow p-6 border border-green-200 flex flex-col items-center text-center">
          <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-700"><FaLeaf className="text-green-500" /> Join Us for a Healthier Future</h2>
          <p className="mt-2 text-gray-700">At <strong className="text-blue-600">OxyTrack</strong>, we believe in better breathing for everyone. Let’s take charge of respiratory health together! <FaLeaf className="inline text-green-500" /></p>
          <button className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-8 py-3 rounded-full shadow hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 text-lg flex items-center gap-2">
            <FaHeartbeat className="text-pink-200" /> Join OxyTrack Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default About