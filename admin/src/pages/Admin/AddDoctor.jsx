import React, { useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { UseAdminContext } from "../../context/AdminContext";
import { UseDoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

function AddDoctor() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [degree, setDegree] = useState("");
  const [fees, setFees] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [address1, setAddress1] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = UseAdminContext();
  const { addDoctor } = UseDoctorContext();

  const resetForm = () => {
    setDocImg(false);
    setName("");
    setEmail("");
    setPassword("");
    setDegree("");
    setFees("");
    setExperience("1 Year");
    setAbout("");
    setSpeciality("General Physician");
    setAddress1("");
  };

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!docImg) return toast.error("Image Not Selected !!!");
    if (!name || !email || !password || !degree || !fees || !about || !address1) {
      return toast.error("Please fill all required fields!");
    }
    if (!validateEmail(email)) {
      return toast.error("Invalid email format!");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("degree", degree);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("address", JSON.stringify({ line1: address1 }));
      // formData.forEach((value, key) => console.log(key, " ", value));
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        // Add to context doctor list
        addDoctor({
          id: Date.now(),
          name,
          contact: '', // You can add a contact field to the form if needed
          email,
          department: speciality,
          joining: new Date().toISOString().slice(0, 10),
        });
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className='m-5 w-full'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-lg font-medium'>Add Doctor</p>
        <button type='button' className='text-sm text-blue-600 hover:underline' onClick={resetForm}>Reset Form</button>
      </div>
      <div className='bg-white px-8 py-8 border w-full max-w-4xl max-h-[80vh] overflow-y-scroll rounded-lg shadow'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-20 h-20 bg-gray-100 rounded-full cursor-pointer object-cover border-2 border-blue-200' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Doctor" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
          <p>Upload Doctor<br /> picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name <span className='text-red-500'>*</span></p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor email <span className='text-red-500'>*</span></p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>
            <div className='flex-1 flex flex-col gap-1 relative'>
              <p>Doctor password <span className='text-red-500'>*</span></p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2 pr-10' type={showPassword ? "text" : "password"} placeholder='Password' required />
              <span className='absolute right-3 top-9 cursor-pointer text-gray-400' onClick={() => setShowPassword(s => !s)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="experience" id="experience">
                {[...Array(10)].map((_, i) => <option key={i + 1} value={`${i + 1} Year`}>{i + 1} Year</option>)}
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Fees <span className='text-red-500'>*</span></p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required min={0} />
            </div>
          </div>
          <div className='w-full lg:w-1/2 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Specialty</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' id="specialty" name="specialty">
                <option value="General Physician">General Physician</option>
                <option value="Dermatology">Dermatologist</option>
                <option value="Neurology">Neurologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Immunologist">Immunologist</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education <span className='text-red-500'>*</span></p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address <span className='text-red-500'>*</span></p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address' required />
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2'>About Doctor <span className='text-red-500'>*</span></p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' type="text" placeholder='Write About Doctor ' required></textarea>
        </div>
        <button type='submit' className='bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full flex items-center gap-2' disabled={loading}>
          {loading && <FaSpinner className='animate-spin' />} Add Doctor
        </button>
      </div>
    </form>
  );
}

export default AddDoctor;