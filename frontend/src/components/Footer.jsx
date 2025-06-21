import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaHome, FaInfoCircle, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { assets } from '../assets/assets_frontend/assets';

function Footer() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 pt-10 pb-0 px-0 mt-20">
      <div className="max-w-6xl mx-auto md:mx-10">
        <div className="flex flex-col gap-14 my-10 text-sm sm:grid sm:grid-cols-[3fr_1fr_1fr]">
          {/* Left Side */}
          <div>
            {/* <img className="mb-5 w-40" src={assets.logo} alt="" /> */}
            <p className="w-full text-gray-600 leading-6">
              OxyTrack is your trusted platform for respiratory health monitoring and care. Stay ahead with real-time insights, expert guidance, and seamless online consultations for better well-being.
            </p>
          </div>

          {/* Mid Side */}
          <div>
            <p className="text-xl font-semibold mb-5 text-blue-700 flex items-center gap-2"><FaHome className="text-blue-400" /> COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li><NavLink to="/" className="flex items-center gap-2 hover:text-blue-700 transition"><FaHome /> Home</NavLink></li>
              <li><NavLink to="/about" className="flex items-center gap-2 hover:text-blue-700 transition"><FaInfoCircle /> About us</NavLink></li>
              <li><NavLink to="/delivery" className="flex items-center gap-2 hover:text-blue-700 transition"><FaTruck /> Delivery</NavLink></li>
              <li><NavLink to="/privacy-policy" className="flex items-center gap-2 hover:text-blue-700 transition"><FaShieldAlt /> Privacy policy</NavLink></li>
            </ul>
          </div>

          {/* Right Side */}
          <div>
            <p className="text-xl font-semibold mb-5 text-blue-700 flex items-center gap-2"><FaPhoneAlt className="text-green-500" /> GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-600">
              <li className="flex items-center gap-2"><FaPhoneAlt className="text-green-500" /> +91 8910760697</li>
              <li className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> oxytrack.111@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div>
          <hr className="border-blue-200" />
          <p className='py-5 text-sm text-center text-gray-600'>
            &copy; 2025 <span className="font-semibold text-blue-600">OxyTrack</span> – All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer