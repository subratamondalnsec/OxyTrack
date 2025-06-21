import React, { useReducer } from 'react'
import { assets } from '../assets/assets_frontend/assets.js';
import { useState,useEffect } from 'react';
import { UseUserContext } from '../context/UserContext';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTransgender, FaBirthdayCake, FaUserEdit, FaSave, FaUserShield } from 'react-icons/fa';

function MyProfile() {
  const [isEdit,setIsEdit]=useState(false);
  const [loading, setLoading] = useState(true);
  const [userImg,setUserImg]=useState(null);
  const [emergencyContact, setEmergencyContact] = useState({ name: "", phone: "", email: "" });

  const [userData,setUserdata]=useState(null);

  const navigate=useNavigate();

  const {uToken,setUToken,backendUrl,}=UseUserContext();

  const handleSaveBtn=async()=>{
    toast.info("Updating profile...", { autoClose: 1200 });
    try {

      let formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.dob);
      formData.append("gender", userData.gender);
      formData.append("address[line]", userData.address.line);
      formData.append("emergencyContact[name]", emergencyContact.name);
      formData.append("emergencyContact[phone]", emergencyContact.phone);
      formData.append("emergencyContact[email]", emergencyContact.email);
      
      if (userImg) {
        formData.append("image", userImg);
      }

      const {data}=await axios.put(backendUrl+`/api/user/profile`,formData,{headers:{uToken:uToken}});
      if (data.success) {
        toast.dismiss();
        toast.success("Profile updated successfully!", { autoClose: 2000 });
        setUserdata(data.user);
        setIsEdit(false);
      } else {
        toast.dismiss();
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error updating profile:", error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    const getUserData=async()=>{
      try{
        if(!uToken){
          toast.error("Not Token found! Please Log in again.");
          navigate('/login');
        }
        else{
          const {data}=await axios.get(backendUrl+`/api/user/profile`,{headers:{uToken:uToken}});
          if(!data.success){
            toast.error("User Not Found. Please Log In Again...");
            navigate('/login');
          }
          else{
            console.log(data.user);
            setUserdata(data.user);
            setLoading(false);
          }
        }
      }catch(err){
        toast.error(err.message);
      }
    }
    getUserData();
  },[uToken, backendUrl,navigate]);

  return loading ? (
    <>Loding....</>
  ) : (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 mb-8 border border-blue-100 flex flex-col gap-6 text-base">
      <div className="flex flex-col items-center gap-2">
        {!isEdit ? (
          <img src={userData.image} className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow" alt="Profile" />
        ) : (
          <div className="flex items-center gap-4 mb-4 text-gray-500">
            <label htmlFor="doc-img">
              <img className="w-20 h-20 bg-gray-100 rounded-full cursor-pointer object-cover border-2 border-blue-200" src={userImg ? URL.createObjectURL(userImg) : assets.upload_icon} alt="Upload" />
            </label>
            <input onChange={(e) => setUserImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p>Upload<br />picture</p>
          </div>
        )}
        {isEdit ? (
          <input className="bg-gray-100 text-2xl font-semibold max-w-60 mt-2 text-center rounded px-2" type="text" onChange={(e) => setUserdata(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
        ) : (
          <p className="font-bold text-2xl text-neutral-800 mt-2 flex items-center gap-2"><FaUserCircle className="text-blue-400" /> {userData.name}</p>
        )}
      </div>
      <hr className="bg-zinc-300 h-[1px] border-none my-2" />
      <div>
        <p className="text-blue-600 font-semibold flex items-center gap-2 mb-2"><FaEnvelope /> Contact Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-2 text-neutral-700">
          <p className="font-medium flex items-center gap-2"><FaEnvelope className="text-blue-400" /> Email:</p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium flex items-center gap-2"><FaPhoneAlt className="text-green-500" /> Phone:</p>
          {isEdit ? (
            <input className="bg-gray-100 max-w-52 rounded px-2" type="text" onChange={(e) => setUserdata(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium flex items-center gap-2"><FaMapMarkerAlt className="text-pink-400" /> Address:</p>
          {!isEdit ? (
            <p className="text-gray-500">{userData.address.line}</p>
          ) : (
            <input
              className="bg-gray-100 rounded px-2"
              type="text"
              value={userData.address.line}
              onChange={(e) => setUserdata((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  line: e.target.value,
                },
              }))}
              placeholder="Full Address"
            />
          )}
        </div>
      </div>
      <div>
        <p className="text-blue-600 font-semibold flex items-center gap-2 mb-2"><FaUserShield /> Basic Information</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3 mt-2 text-neutral-700">
          <p className="font-medium flex items-center gap-2"><FaTransgender className="text-purple-400" /> Gender:</p>
          {isEdit ? (
            <select className="max-w-28 bg-gray-100 rounded px-2" value={userData.gender} onChange={(e) => setUserdata((prev) => ({ ...prev, gender: e.target.value }))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Not Selected">Not Selected</option>
            </select>
          ) : (
            <p className="text-gray-500">{userData.gender}</p>
          )}
          <p className="font-medium flex items-center gap-2"><FaBirthdayCake className="text-yellow-500" /> Birthday:</p>
          {isEdit ? (
            <input className="max-w-32 bg-gray-100 rounded px-2" type="date" value={userData.dob} onChange={(e) => setUserdata((prev) => ({ ...prev, dob: e.target.value }))} />
          ) : (
            <p className="text-gray-500">{userData.dob}</p>
          )}
        </div>
      </div>
      {isEdit && (
        <div>
          <p className="text-blue-600 font-semibold flex items-center gap-2 mb-2"><FaPhoneAlt /> Emergency Contact</p>
          <div className="flex flex-col gap-2">
            <input className="bg-gray-100 max-w-52 rounded px-2" type="text" placeholder="Name" value={emergencyContact.name} onChange={(e) => setEmergencyContact(prev => ({ ...prev, name: e.target.value }))} />
            <input className="bg-gray-100 max-w-52 rounded px-2" type="text" placeholder="Phone" value={emergencyContact.phone} onChange={(e) => setEmergencyContact(prev => ({ ...prev, phone: e.target.value }))} />
            <input className="bg-gray-100 max-w-52 rounded px-2" type="text" placeholder="Email" value={emergencyContact.email} onChange={(e) => setEmergencyContact(prev => ({ ...prev, email: e.target.value }))} />
          </div>
        </div>
      )}
      <div className="mt-8 flex justify-center">
        {isEdit ? (
          <button className="flex items-center gap-2 border border-blue-500 px-8 py-2 rounded-full bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition" onClick={() => { setIsEdit(!isEdit); handleSaveBtn(); }}>
            <FaSave /> Save Information
          </button>
        ) : (
          <button className="flex items-center gap-2 border border-blue-500 px-8 py-2 rounded-full text-blue-600 font-semibold shadow hover:bg-blue-500 hover:text-white transition" onClick={() => setIsEdit(!isEdit)}>
            <FaUserEdit /> Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
