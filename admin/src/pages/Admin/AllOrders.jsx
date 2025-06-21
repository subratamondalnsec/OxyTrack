import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UseAdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { FaBoxOpen, FaMoneyBillWave, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const statusColors = {
  'Pending': 'bg-yellow-100 text-yellow-700',
  'Accepted': 'bg-green-100 text-green-700',
  'Not Accepted': 'bg-red-100 text-red-700',
  'Delivered': 'bg-blue-100 text-blue-700',
};

const mockOrders = [
  {
    _id: '1',
    medicines: [
      { medicineId: { name: 'Paracetamol' }, quantity: 2 },
      { medicineId: { name: 'Ibuprofen' }, quantity: 1 }
    ],
    totalPrice: 120,
    address: '123 Main St, City',
    paymentMethod: 'Cash on Delivery',
    phone: '9876543210',
    status: 'Pending',
  },
  {
    _id: '2',
    medicines: [
      { medicineId: { name: 'Amoxicillin' }, quantity: 1 }
    ],
    totalPrice: 80,
    address: '456 Park Ave, City',
    paymentMethod: 'UPI',
    phone: '9123456780',
    status: 'Accepted',
  },
  {
    _id: '3',
    medicines: [
      { medicineId: { name: 'Cetirizine' }, quantity: 3 }
    ],
    totalPrice: 60,
    address: '789 Lake Rd, City',
    paymentMethod: 'Card',
    phone: '9988776655',
    status: 'Delivered',
  },
  {
    _id: '4',
    medicines: [
      { medicineId: { name: 'Azithromycin' }, quantity: 2 },
      { medicineId: { name: 'Vitamin C' }, quantity: 1 }
    ],
    totalPrice: 150,
    address: '22 Rose St, City',
    paymentMethod: 'Cash on Delivery',
    phone: '9001122334',
    status: 'Pending',
  },
  {
    _id: '5',
    medicines: [
      { medicineId: { name: 'Dolo 650' }, quantity: 1 }
    ],
    totalPrice: 30,
    address: '88 Green Ave, City',
    paymentMethod: 'UPI',
    phone: '9112233445',
    status: 'Not Accepted',
  },
  {
    _id: '6',
    medicines: [
      { medicineId: { name: 'Cough Syrup' }, quantity: 2 },
      { medicineId: { name: 'Zincovit' }, quantity: 1 }
    ],
    totalPrice: 110,
    address: '55 Bluebell Rd, City',
    paymentMethod: 'Card',
    phone: '9223344556',
    status: 'Accepted',
  },
  {
    _id: '7',
    medicines: [
      { medicineId: { name: 'Metformin' }, quantity: 2 },
      { medicineId: { name: 'Aspirin' }, quantity: 1 }
    ],
    totalPrice: 200,
    address: '101 River St, City',
    paymentMethod: 'Card',
    phone: '9009988776',
    status: 'Pending',
  },
  {
    _id: '8',
    medicines: [
      { medicineId: { name: 'Loratadine' }, quantity: 1 }
    ],
    totalPrice: 50,
    address: '202 Hilltop Ave, City',
    paymentMethod: 'UPI',
    phone: '9332211445',
    status: 'Delivered',
  },
  {
    _id: '9',
    medicines: [
      { medicineId: { name: 'Atorvastatin' }, quantity: 2 },
      { medicineId: { name: 'Calcium' }, quantity: 1 }
    ],
    totalPrice: 180,
    address: '303 Oak Lane, City',
    paymentMethod: 'Cash on Delivery',
    phone: '9445566778',
    status: 'Accepted',
  },
];

function StatusBadge({ status }) {
  return <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
}

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const { aToken, backendUrl } = UseAdminContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/orders`, {
          headers: { aToken }
        });
        if (data.success && data.orders && data.orders.length > 0) {
          // Combine backend orders and mock orders for demo
          setOrders([...data.orders, ...mockOrders]);
        } else {
          setOrders(mockOrders); // fallback to mock data for demo
        }
      } catch (error) {
        setOrders(mockOrders); // fallback to mock data for demo
      }
    };
    fetchOrders();
  }, [backendUrl, aToken]);

  const handleStatusChange = async (orderId, status) => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/admin/orders/${orderId}`, { status: status }, { headers: { aToken } });
      if (data.success) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: status } : order));
        toast.success('Order is Accepted for delivery.');
        toast.success(data.message);
      }
    } catch (error) {
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: status } : order)); // update UI for demo
      toast.success('Order status updated (demo mode).');
    }
  };

  return (
    <div className='p-5'>
      <h1 className='text-xl font-semibold mb-4 flex items-center gap-2'><FaBoxOpen className='text-blue-500' /> All Orders</h1>
      {orders.length > 0 ? (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
          {orders.map((order) => (
            <div key={order._id} className='bg-white border border-blue-100 rounded-xl overflow-hidden shadow hover:scale-105 transition-all duration-300'>
              <div className='p-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-semibold text-lg text-gray-800'>
                    {order.medicines.map(item => `${item.medicineId.name} (x${item.quantity})`).join(', ')}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <div className='flex flex-col gap-1 text-sm'>
                  <span className='flex items-center gap-2 text-green-600'><FaMoneyBillWave /> <b>₹{order.totalPrice}</b></span>
                  <span className='flex items-center gap-2 text-gray-700'><FaMapMarkerAlt /> {order.address}</span>
                  <span className='flex items-center gap-2 text-gray-700'><FaPhoneAlt /> {order.phone}</span>
                  <span className='flex items-center gap-2 text-gray-700'><FaClock /> Payment: {order.paymentMethod}</span>
                </div>
              </div>
              {order.status === "Pending" ? (
                <div className='flex justify-between items-center p-4 border-t bg-gray-50'>
                  <button onClick={() => handleStatusChange(order._id, "Accepted")} className='text-sm font-semibold text-white bg-green-500 rounded px-3 py-1 flex items-center gap-1 hover:bg-green-600 transition'><FaCheckCircle /> Accept</button>
                  <button onClick={() => handleStatusChange(order._id, "Not Accepted")} className='py-1 px-3 bg-red-500 text-white rounded text-sm flex items-center gap-1 hover:bg-red-700 transition'><FaTimesCircle /> Cancel</button>
                </div>
              ) : (
                <div className='flex justify-center items-center p-4 border-t bg-gray-50'>
                  <StatusBadge status={order.status} />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500'>No orders found.</p>
      )}
    </div>
  );
}

export default AllOrders;
