import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Users, 
  Pill, 
  Package, 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  ChevronDown,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const notifications = [
    { id: 1, message: "New appointment scheduled", time: "2 min ago", type: "info" },
    { id: 2, message: "Medicine stock running low", time: "15 min ago", type: "warning" },
    { id: 3, message: "New doctor registration", time: "1 hour ago", type: "success" },
    { id: 4, message: "Payment received", time: "2 hours ago", type: "success" },
  ];

  const recentAppointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "10:00 AM", status: "confirmed" },
    { id: 2, patient: "Jane Wilson", doctor: "Dr. Johnson", time: "11:30 AM", status: "pending" },
    { id: 3, patient: "Mike Brown", doctor: "Dr. Davis", time: "2:00 PM", status: "completed" },
    { id: 4, patient: "Sarah Connor", doctor: "Dr. Wilson", time: "3:30 PM", status: "cancelled" },
  ];

  const recentOrders = [
    { id: 1, medicine: "Paracetamol", quantity: 100, supplier: "MedCorp", status: "delivered" },
    { id: 2, medicine: "Ibuprofen", quantity: 50, supplier: "PharmaCo", status: "pending" },
    { id: 3, medicine: "Amoxicillin", quantity: 75, supplier: "HealthPlus", status: "shipped" },
  ];

  const summaryCards = [
    {
      icon: Calendar,
      title: "Today's Appointments",
      value: 15,
      change: "+12%",
      trend: "up",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      accentColor: "border-blue-200"
    },
    {
      icon: User,
      title: "Total Doctors",
      value: 20,
      change: "+2",
      trend: "up",
      bgColor: "bg-green-100",
      iconColor: "text-green-500",
      accentColor: "border-green-200"
    },
    {
      icon: Users,
      title: "Total Patients",
      value: 120,
      change: "+8%",
      trend: "up",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
      accentColor: "border-purple-200"
    },
    {
      icon: Pill,
      title: "Total Medicines",
      value: 50,
      change: "-2",
      trend: "down",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
      accentColor: "border-orange-200"
    },
    {
      icon: Package,
      title: "All Orders",
      value: 35,
      change: "+5%",
      trend: "up",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-500",
      accentColor: "border-indigo-200"
    },
    {
      icon: Bell,
      title: "Pending Approvals",
      value: 8,
      change: "New",
      trend: "neutral",
      bgColor: "bg-red-100",
      iconColor: "text-red-500",
      accentColor: "border-red-200"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': case 'delivered': case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': case 'shipped': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, trend, bgColor, iconColor, accentColor }) => (
    <div className={`bg-white rounded-xl shadow-sm border ${accentColor} p-6 hover:scale-105 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 
          trend === 'down' ? 'text-red-600' : 'text-gray-600'
        }`}>
          {change}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and App Name */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">HealthAdmin</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search patients, doctors, medicines..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side - Notifications and Profile */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-gray-600 relative"
                >
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <p className="text-sm text-gray-800">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">AD</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {showProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <hr className="my-2" />
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        {/* Charts and Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Stats Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Overview</h3>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Appointments</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Patient Satisfaction</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Revenue Target</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <span className="text-sm font-medium">68%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                <Plus className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <span className="text-sm font-medium">Add Patient</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <span className="text-sm font-medium">Schedule</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                <Package className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                <span className="text-sm font-medium">Order Medicine</span>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                <BarChart3 className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <span className="text-sm font-medium">View Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Data Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {appointment.patient}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.medicine}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;