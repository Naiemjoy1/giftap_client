import React from "react";
import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
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

 
  const info = myOrders.flatMap(order =>
    order.productId.map((id, index) => ({
      productId: id,
      amount: order.amount,
      paymentId: order.paymentId,
      date: new Date(order.date).toLocaleDateString(),
      shippingEmail: order.shippingEmail,
      delivery: order.delivery?.[index],
    }))
  );

  return (
    <div className="overflow-x-auto lg:flex justify-between space-y-4 gap-4">
      {OrderProducts?.length === 0 ? (
        <div className="text-center my-4 lg:w-[60%]">
          <h3 className="text-lg font-semibold">
            No products found for your orders.
          </h3>
        </div>
      ) : (
        <table className="table w-full border border-gray-300">
          {/* Table Head */}
          <thead className="bg-primary text-white">
            <tr>
              <th className="border border-gray-300">Payment ID</th>
              <th className="border border-gray-300">Product</th>
              <th className="border border-gray-300">Status</th>
              <th className="border border-gray-300">Amount</th>
              <th className="border border-gray-300">Date</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {myOrders.map((order, orderIndex) => {
              const relatedProducts = order.productId.map(productId =>
                OrderProducts.find(product => product._id === productId)
              );
              const numberOfProducts = relatedProducts.length;  

              return (
                <React.Fragment key={`order-${orderIndex}`}>
                  {relatedProducts.map((product, productIndex) => {
                    const productInfo = info.find(item => item.productId === product?._id);
                    return (
                      <tr key={`product-${productIndex}`}>
                      
                        {productIndex === 0 && (
                          <>
                            <td rowSpan={numberOfProducts} className="border border-gray-300">
                              {order.paymentId}
                            </td>
                          </>
                        )}
                        <td className="border border-gray-300">{product?.name || "No product name"}</td>
                        <td className="border border-gray-300">{productInfo?.delivery || "No delivery info"}</td>
                        {productIndex === 0 && (
                          <>
                            <td rowSpan={numberOfProducts} className="border border-gray-300">
                              ${order.amount}
                            </td>
                            <td rowSpan={numberOfProducts} className="border border-gray-300">
                              {new Date(order.date).toLocaleDateString()}
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
      {/* Dummy Text Section */}
      <div className="items-center p-4 border rounded-md border-primary lg:w-[40%]">
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
