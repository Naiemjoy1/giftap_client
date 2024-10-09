import React from "react";
import { AiFillDelete } from "react-icons/ai"; // Import the delete icon
import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import usePayment from "../../../../Components/Hooks/usePayment";

const Orders = () => {
  const [payments] = usePayment();
  const [products] = useProducts(); 
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const myOrders = payments.filter(item => item?.cus_email === user?.email);
  const productIds = myOrders.flatMap(item => item?.productId);
  const OrderProducts = products?.filter(product => productIds.includes(product._id));
  const info = myOrders.map((item) => ({
    amount: item.amount,
    date: new Date(item.date).toLocaleDateString(), 
    shippingEmail: item.shippingEmail,
  
    delivery: item.delivery?.[0], 
  }));


  console.log(info); 
  
  return (
    <div className="overflow-x-auto lg:flex justify-between space-y-4 gap-4">
      {OrderProducts?.length === 0 ? (
        <div className="text-center my-4 lg:w-[60%]">
          <h3 className="text-lg font-semibold">No products found for your orders.</h3>
        </div>
      ) : (
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-primary text-white">
            <tr>
            
            <th></th>
           
            <th>Product Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Shipping Email</th>
            
              
              <th>DeliveryStatus</th>
             
              
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {OrderProducts?.map((product, index) => (
              <tr key={product._id}>
               
               <td>{index+1}</td>
               <td>{product?.name}</td>
                <td>${info[index]?.amount}</td>
                <td>{info[index]?.date}</td>
                <td>{info[index]?.shippingEmail || "N/A"}</td>
               
                <td>{info[index]?.delivery || "No delivery info"}</td>
                
                
              
               
              </tr>
            ))}
          </tbody>
        </table>
      )}
       {/* Dummy Text Section */}
       <div className=" items-center p-4 border  rounded-md border-primary lg:w-[40%] ">
        <h2 className="flex justify-center items-center text-xl font-semibold mr-4">About Our Website</h2>
        <p className="items-center my-4">
    Welcome to <span className="text-primary">GiftTap</span>! Here you can explore a wide range of products tailored to meet your needs. Our wishlist feature allows you to save your favorite items for future reference. 
    Add $50.00 to your cart and enjoy free shipping on your order! Plus, you can expect delivery within 3-4 days. 
    We strive to provide an exceptional shopping experience and look forward to serving you. Happy shopping!
  </p>
      </div>
    </div>
  );
};

export default Orders;
