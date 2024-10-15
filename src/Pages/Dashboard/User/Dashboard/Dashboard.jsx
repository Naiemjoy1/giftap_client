import React from "react";
import { AiOutlineShoppingCart, AiOutlineDollar } from "react-icons/ai";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Subscriptions from "../../../Subscriptions/Subscriptions";
import usePayment from "../../../../Components/Hooks/usePayment";
import useAuth from "../../../../Components/Hooks/useAuth"; 

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
        <Subscriptions></Subscriptions>
      </div>
    </div>
  );
};

export default Dashboard;
