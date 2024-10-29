import useAuth from "../../../../Components/Hooks/useAuth";
import useProducts from "../../../../Components/Hooks/useProducts";
import useSellerOrder from "../../../../Components/Hooks/useSellerOrder";
import useSellers from "../../../../Components/Hooks/useSellers";

const Orders = () => {
  const [sellers] = useSellers();
  const { user } = useAuth();
  const storeDetails = sellers.find((store) => store.email === user.email);
  const [sellerStat] = useSellerOrder();
  const [products] = useProducts();

  const filteredOrders = Array.isArray(sellerStat)
    ? sellerStat.filter((order) => {
        const storeName = storeDetails?.shopName;
        return (
          order.userPriceTotals[storeName] &&
          order.products[storeName] &&
          order.products[storeName].some((prod) =>
            products.some((p) => p._id === prod._id)
          )
        );
      })
    : [];

  return (
    <div>
      <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Price</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              <>
                {filteredOrders.map((order, index) => {
                  const storeName = storeDetails?.shopName;
                  const userTotals = order.userPriceTotals[storeName];
                  const productDetails = order.products[storeName];

                  return (
                    <tr key={index}>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>{userTotals.totalPrice.toFixed(2)}</td>
                      <td>
                        <table className="table-auto">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Price</th>
                              <th>SKU</th>
                              <th>Delivery Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productDetails
                              .filter((prod) =>
                                products.some((p) => p._id === prod._id)
                              )
                              .map((prod) => (
                                <tr key={prod._id}>
                                  <td>{prod.name}</td>
                                  <td>${prod.price.toFixed(2)}</td>
                                  <td>{prod.sku}</td>
                                  <td>{prod.deliveryStatus}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr>
                <td colSpan={3} className="text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
