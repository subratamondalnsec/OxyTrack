import React, { useState } from 'react';
import { assets } from '../../assets/assets_admin/assets';
import { UseAdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaSpinner, FaSyncAlt } from 'react-icons/fa';

function AddMedicine() {
  const [medicineImg, setMedicineImg] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Tablet');
  const [expiry, setExpiry] = useState('');
  const [loading, setLoading] = useState(false);
  const { backendUrl, aToken } = UseAdminContext();

  const resetForm = () => {
    setMedicineImg(null);
    setName('');
    setDescription('');
    setManufacturer('');
    setPrice('');
    setStock('');
    setCategory('Tablet');
    setExpiry('');
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!medicineImg) return toast.error('Please upload a medicine image.');
    setLoading(true);
    const formData = new FormData();
    formData.append('image', medicineImg);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('manufacturer', manufacturer);
    formData.append('price', Number(price));
    formData.append('stock', Number(stock));
    formData.append('category', category);
    formData.append('expiry', expiry);
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/add-medicine`, formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className='m-5 w-full'>
      <div className='flex items-center justify-between mb-3'>
        <p className='text-lg font-medium'>Add Medicine</p>
        <button type='button' className='text-sm text-blue-600 hover:underline flex items-center gap-1' onClick={resetForm}><FaSyncAlt /> Reset</button>
      </div>
      <div className='bg-white px-8 py-8 border w-full max-w-3xl rounded-lg shadow-lg'>
        <div className='flex items-center gap-6 mb-8 text-gray-500'>
          <label htmlFor='medicine-img'>
            <img className='w-20 h-20 bg-gray-100 rounded-full cursor-pointer object-cover border-2 border-blue-200' src={medicineImg ? URL.createObjectURL(medicineImg) : assets.upload_area} alt='' />
          </label>
          <input onChange={(e) => setMedicineImg(e.target.files[0])} type='file' id='medicine-img' hidden accept='image/*' />
          <p>Upload Medicine<br /> Image <span className='text-red-500'>*</span></p>
        </div>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-1 flex flex-col gap-4 text-gray-600'>
            <div>
              <label className='block text-xs mb-1'>Medicine Name <span className='text-red-500'>*</span></label>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2 w-full' type='text' placeholder='Medicine Name' required />
            </div>
            <div>
              <label className='block text-xs mb-1'>Description <span className='text-red-500'>*</span></label>
              <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='border rounded px-3 py-2 w-full' placeholder='Description' required></textarea>
            </div>
            <div>
              <label className='block text-xs mb-1'>Manufacturer <span className='text-red-500'>*</span></label>
              <input onChange={(e) => setManufacturer(e.target.value)} value={manufacturer} className='border rounded px-3 py-2 w-full' type='text' placeholder='Manufacturer' required />
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-4 text-gray-600'>
            <div>
              <label className='block text-xs mb-1'>Price (₹) <span className='text-red-500'>*</span></label>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='border rounded px-3 py-2 w-full' type='number' placeholder='Price' required min={0} />
            </div>
            <div>
              <label className='block text-xs mb-1'>Stock <span className='text-red-500'>*</span></label>
              <input onChange={(e) => setStock(e.target.value)} value={stock} className='border rounded px-3 py-2 w-full' type='number' placeholder='Stock' required min={0} />
            </div>
            <div>
              <label className='block text-xs mb-1'>Expiry Date <span className='text-red-500'>*</span></label>
              <input onChange={(e) => setExpiry(e.target.value)} value={expiry} className='border rounded px-3 py-2 w-full' type='date' required />
            </div>
            <div>
              <label className='block text-xs mb-1'>Category <span className='text-red-500'>*</span></label>
              <select onChange={(e) => setCategory(e.target.value)} value={category} className='border rounded px-3 py-2 w-full'>
                <option value='Tablet'>Tablet</option>
                <option value='Syrup'>Syrup</option>
                <option value='Injection'>Injection</option>
                <option value='Ointment'>Ointment</option>
                <option value='Other'>Other</option>
              </select>
            </div>
          </div>
        </div>
        <button type='submit' className='bg-[#5f6FFF] px-10 py-3 mt-8 text-white rounded-full flex items-center gap-2' disabled={loading}>
          {loading && <FaSpinner className='animate-spin' />} Add Medicine
        </button>
      </div>
    </form>
  );
}

export default AddMedicine;
