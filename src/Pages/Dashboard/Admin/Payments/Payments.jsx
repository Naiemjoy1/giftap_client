import usePayment from "../../../../Components/Hooks/usePayment";
import useProducts from "../../../../Components/Hooks/useProducts";

const Payments = () => {
  const [payments] = usePayment();
  const [products] = useProducts();

  const successPayments = payments.filter(
    (payment) => payment.status === "success"
  );

  return (
    <div>
      <div className="overflow-x-auto h-[650px] overflow-y-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Order Details</th>
              <th>Products</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {successPayments.map((payment, index) => (
              <tr className="hover" key={index}>
                <th>{index + 1}</th>
                <td>
                  <p className="font-bold">{payment.cus_name}</p>
                  <p className="text-sm opacity-50">{payment.cus_email}</p>
                  <p className="text-sm opacity-50">{payment.paymentId}</p>
                </td>
                <td>
                  {payment.productId.map((productId) => {
                    const matchedProduct = products.find(
                      (product) => product._id === productId
                    );
                    return matchedProduct ? (
                      <p key={productId}>{matchedProduct.name}</p>
                    ) : (
                      <p key={productId}>Product not found</p>
                    );
                  })}
                </td>
                <td>{payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
