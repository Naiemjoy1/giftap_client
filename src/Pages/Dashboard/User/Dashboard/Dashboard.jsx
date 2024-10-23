import React, { useState } from "react";
import { AiOutlineShoppingCart, AiOutlineDollar } from "react-icons/ai";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dialog } from '@headlessui/react'; // Importing Dialog for modal
import Subscriptions from "../../../Subscriptions/Subscriptions";
import usePayment from "../../../../Components/Hooks/usePayment";
import useAuth from "../../../../Components/Hooks/useAuth"; 
import EventCalendar from "./EventCalendar/Eventcalendar";
import { AiOutlineClose } from "react-icons/ai";
const Dashboard = () => {
  const [payments] = usePayment();
  const { user } = useAuth(); 
  const myOrders = payments.filter(item => item?.cus_email === user?.email);

  const deliveryStatus = myOrders.flatMap(order => order.delivery);
  const homeDeliveries = deliveryStatus.filter(status => status === "home").length;
  const deliveredDeliveries = deliveryStatus.filter(status => status === "delivered").length;

  const data = [
    { name: "Home", value: homeDeliveries },
    { name: "Delivered", value: deliveredDeliveries },
  ];

  const COLORS = ['#FFBB28', '#FF8042'];

  const totalOrderAmount = myOrders.reduce((acc, order) => acc + parseFloat(order.amount || 0), 0);
  const formattedTotalOrderAmount = Number(totalOrderAmount) || 0;

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    occasionName: '',
    receiverName: '',
    email: '',
    message: ''
  });

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission wish
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Wish Submitted:', formData);
    setIsOpen(false); 
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Total Orders Card */}
        <div className="bg-primary text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <AiOutlineShoppingCart className="text-5xl" />
          <div>
            <h3 className="text-xl font-semibold">Total Orders</h3>
            <p className="text-4xl font-bold mt-2">{myOrders?.length}</p>
            <p className="mt-2">You have placed {myOrders?.length} orders.</p>
          </div>
        </div>

        {/* Total Order Amount Card */}
        <div className="bg-secondary text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <AiOutlineDollar className="text-5xl" />
          <div>
            <h3 className="text-xl font-semibold">Total Amount Spent</h3>
            <p className="text-4xl font-bold mt-2">${formattedTotalOrderAmount.toFixed(2)}</p>
            <p className="mt-2">You have spent a total of ${formattedTotalOrderAmount.toFixed(2)}.</p>
          </div>
        </div>
      </div>

      
      <EventCalendar />

    
      

      {/* Modal for Sent Wish Form */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black bg-opacity-30" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    {/* Updated: Dialog with custom div for content and h2 for title */}
    <div className="w-full max-w-md bg-white p-6 rounded-lg relative">
      {/* Close Button */}
      <button 
        onClick={() => setIsOpen(false)} 
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        <AiOutlineClose size={24} />
      </button>
      
      <h2 className="text-lg font-bold">Send a Wish</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {/* Special Occasion Name */}
        <div>
          <label className="block text-sm font-medium">Special Occasion Name</label>
          <input 
            type="text" 
            name="occasionName"
            value={formData.occasionName}
            onChange={handleInputChange}
            placeholder="Enter Occasion Name" 
            className="w-full border border-gray-300 p-2 rounded-md"
            required 
          />
        </div>
        {/* Receiver Name */}
        <div>
          <label className="block text-sm font-medium">Receiver Name</label>
          <input 
            type="text" 
            name="receiverName"
            value={formData.receiverName}
            onChange={handleInputChange}
            placeholder="Enter Receiver's Name" 
            className="w-full border border-gray-300 p-2 rounded-md"
            required 
          />
        </div>
        {/* Receiver Email */}
        <div>
          <label className="block text-sm font-medium">Receiver Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Receiver's Email" 
            className="w-full border border-gray-300 p-2 rounded-md"
            required 
          />
        </div>
        {/* Wish Message */}
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Write your wish message here..." 
            className="w-full border border-gray-300 p-2 rounded-md"
            rows="4"
            required
          />
        </div>
        {/* Submit Button */}
        <div className="text-right">
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">
            Send Wish
          </button>
        </div>
      </form>
    </div>
  </div>
</Dialog>

      {/* Pie Chart for Delivery Status */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Order Delivery Status</h3>
        {myOrders.length === 0 ? ( 
          <p className="text-center text-gray-600">No orders available to display delivery status.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Subscriptions Section */}
      <div>
        <Subscriptions />
      </div>
    </div>
  );
};

export default Dashboard;
