import React from "react";
import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
import usePayment from "../../../../Components/Hooks/usePayment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "./InvoiceDocument";  

const generateInvoiceId = (paymentId) => {
  const timestamp = Date.now();  
  return `INV-${paymentId}-${timestamp}`;
};

const Downloads = () => {
  const [payments] = usePayment();
  const [products] = useProducts();
  const { user } = useAuth();
  console.log(payments)
  console.log(user)
 
  const myOrders = payments?.filter(item => item?.cus_email === user?.email);
  console.log(myOrders)
 
  const productIds = myOrders?.flatMap(item => item?.productId);


  const OrderProducts = products?.filter(product => productIds?.includes(product._id));

  return (
    <div className="overflow-x-auto lg:flex justify-between space-y-4 gap-4">
      {OrderProducts.length === 0 ? (
        <div className="text-center my-4 lg:w-[60%]">
          <h3 className="text-lg font-semibold">
            No products found for your orders.
          </h3>
        </div>
      ) : (
        <table className="table w-full border border-gray-300">
          <thead className="bg-primary text-white">
            <tr>
              <th className="border border-gray-300">#</th> 
              <th className="border border-gray-300">Product</th>
              <th className="border border-gray-300">Quantity</th>
            
              <th className="border border-gray-300">Order Date</th> 
              <th className="border border-gray-300">Download Invoice</th>
            </tr>
          </thead>
          
          <tbody>
            {myOrders.map((order, orderIndex) => {
             
              const relatedProducts = order.productId.map(productId =>
                OrderProducts.find(product => product._id === productId)
              ).filter(Boolean); 

              const numberOfProducts = relatedProducts.length;
              const invoiceId = generateInvoiceId(order.paymentId);

              return (
                <React.Fragment key={`order-${orderIndex}`}>
                  {relatedProducts.map((product, productIndex) => (
                    <tr key={`product-${productIndex}`}>
                      {productIndex === 0 && (
                        <>
                          <td rowSpan={numberOfProducts} className="border border-gray-300">
                            {orderIndex + 1}
                          </td>
                        </>
                      )}
                      <td className="border border-gray-300">{product?.name || "No product name"}</td>
                      <td className="border border-gray-300">{order.quantities[productIndex]?.$numberInt || 1}</td>
                     

                      {productIndex === 0 && (
                        <td rowSpan={numberOfProducts} className="border border-gray-300">
                          {new Date(order.date).toLocaleDateString()} 
                        </td>
                      )}

                      {productIndex === 0 && (
                        <td rowSpan={numberOfProducts} className="border border-gray-300 text-primary underline">
                          <PDFDownloadLink
                            document={<InvoiceDocument order={order} products={relatedProducts} invoiceId={invoiceId} />}
                            fileName={`invoice_${invoiceId}.pdf`}  
                          >
                            {({ loading }) => (loading ? "Loading document..." : "Download Invoice")}
                          </PDFDownloadLink>
                        </td>
                      )}
                    </tr>
                  ))}
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

export default Downloads;
